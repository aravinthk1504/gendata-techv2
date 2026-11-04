import "server-only";
import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "./firebase-admin";
import { loginLockStatus, nextFailedLogin } from "./admin-login-policy.mjs";

// Per normalized email, independent of whether a Firebase account exists.
// Never trust client-supplied forwarding headers or expose the account key.
export function normalizedLoginEmail(value) {
  return String(value || "").trim().toLowerCase();
}
const attemptRef = email => db.collection("_adminLoginAttempts")
  .doc(createHash("sha256").update(normalizedLoginEmail(email)).digest("hex"));

export async function checkAdminLoginLimit(email) {
  const snapshot = await attemptRef(email).get();
  return loginLockStatus(snapshot.exists ? snapshot.data() : null, Date.now());
}

export async function registerAdminLoginFailure(email) {
  const ref = attemptRef(email);
  return db.runTransaction(async tx => {
    const snapshot = await tx.get(ref);
    const result = nextFailedLogin(snapshot.exists ? snapshot.data() : null, Date.now());
    if (result.state) {
      tx.set(ref, { ...result.state, updatedAt: FieldValue.serverTimestamp() });
    }
    return { blocked: result.blocked, retryAfter: result.retryAfter, remaining: result.remaining ?? 0 };
  });
}

export async function clearAdminLoginFailures(email) {
  try {
    await attemptRef(email).delete();
  } catch (error) {
    // Authentication has succeeded; counter cleanup must not fail the login.
    console.error("Admin login counter cleanup failed", error?.code || error?.name);
  }
}

// Do not store passwords, tokens, cookies, message bodies, raw email addresses or IPs.
const EVENTS = new Set([
  "login_success", "login_failed", "login_limited",
  "logout", "revoke_sessions",
  "blog_created", "blog_updated", "blog_deleted",
  "media_uploaded", "enquiry_status_updated", "enquiry_note_added", "enquiries_exported",
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
    console.error("Admin activity recording failed", error?.code || error?.name);
  }
}
