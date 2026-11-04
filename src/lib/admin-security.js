import "server-only";
import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "./firebase-admin";

// Shared Firestore counters work across Next.js instances and do not rely on
// client-controlled X-Forwarded-For headers. Only approved admin UIDs are keyed.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const COOLDOWN_MS = 10 * 60 * 1000;

const attemptRef = uid => db.collection("_adminLoginAttempts")
  .doc(createHash("sha256").update(uid).digest("hex"));

export async function reserveAdminLoginAttempt(uid) {
  const ref = attemptRef(uid);
  return db.runTransaction(async transaction => {
    const snapshot = await transaction.get(ref);
    const now = Date.now();
    const state = snapshot.exists ? snapshot.data() : {};
    const blockedUntil = Number(state.blockedUntil || 0);
    if (blockedUntil > now) {
      return { allowed: false, retryAfter: Math.max(1, Math.ceil((blockedUntil - now) / 1000)) };
    }
    const inWindow = Number(state.windowStartedAt || 0) > now - WINDOW_MS;
    const attempts = inWindow ? Number(state.attempts || 0) : 0;
    const windowStartedAt = inWindow ? state.windowStartedAt : now;
    if (attempts >= MAX_ATTEMPTS) {
      transaction.set(ref, {
        windowStartedAt, attempts,
        blockedUntil: now + COOLDOWN_MS,
        updatedAt: FieldValue.serverTimestamp(),
      });
      return { allowed: false, retryAfter: COOLDOWN_MS / 1000 };
    }
    transaction.set(ref, {
      windowStartedAt, attempts: attempts + 1,
      blockedUntil: 0, updatedAt: FieldValue.serverTimestamp(),
    });
    return { allowed: true };
  });
}

export async function clearAdminLoginAttempts(uid) {
  try {
    await attemptRef(uid).delete();
  } catch (error) {
    // Session login has succeeded; counter cleanup should not lock the admin out.
    console.error("Admin login counter cleanup failed", error?.code || error?.name);
  }
}

// Never store passwords, ID tokens, session cookies, full customer messages,
// raw login email addresses, or user-agent/IP tracking in activity records.
const EVENTS = new Set([
  "login_success", "login_failed", "login_limited",
  "logout", "revoke_sessions",
  "blog_created", "blog_updated", "blog_deleted",
  "media_uploaded", "enquiry_status_updated", "enquiry_note_added",
]);

export async function recordAdminEvent({ event, actorUid, target = null }) {
  if (!EVENTS.has(event) || typeof actorUid !== "string" || !actorUid) return;
  try {
    await db.collection("_adminAudit").add({
      event, actorUid,
      target: typeof target === "string" ? target.slice(0, 150) : null,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    // Audit persistence is best-effort; never change the outcome of a completed
    // customer action or successful login because the audit store is unavailable.
    console.error("Admin activity recording failed", error?.code || error?.name);
  }
}
