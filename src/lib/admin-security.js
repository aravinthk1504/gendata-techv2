import "server-only";
import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "./firebase-admin";
import { loginLockStatus, nextFailedLogin } from "./admin-login-policy.mjs";
import { loginBuckets } from "./admin-login-buckets.mjs";

// Counted per normalized email (and, when a trusted client address is configured,
// per address), independent of whether a Firebase account exists. Raw emails and
// addresses are never stored: only SHA-256 digests are used as document ids.
export function normalizedLoginEmail(value) {
  return String(value || "").trim().toLowerCase();
}
const bucketRef = key => db.collection("_adminLoginAttempts")
  .doc(createHash("sha256").update(key).digest("hex"));

// `address` is a trusted client address or null (see client-address.mjs).
const refsFor = (email, address) =>
  loginBuckets(normalizedLoginEmail(email), address).map(bucket => ({ ref: bucketRef(bucket.key), limits: bucket.limits }));

export async function checkAdminLoginLimit(email, address = null) {
  const buckets = refsFor(email, address);
  const snapshots = await Promise.all(buckets.map(bucket => bucket.ref.get()));
  const now = Date.now();
  const statuses = snapshots.map(snapshot => loginLockStatus(snapshot.exists ? snapshot.data() : null, now));
  const blocked = statuses.filter(status => status.blocked);
  return { blocked: blocked.length > 0, retryAfter: Math.max(0, ...blocked.map(status => status.retryAfter)) };
}

export async function registerAdminLoginFailure(email, address = null) {
  const buckets = refsFor(email, address);
  return db.runTransaction(async tx => {
    const snapshots = await Promise.all(buckets.map(bucket => tx.get(bucket.ref)));
    const now = Date.now();
    let blocked = false;
    let retryAfter = 0;
    let remaining = Infinity;
    buckets.forEach((bucket, index) => {
      const result = nextFailedLogin(snapshots[index].exists ? snapshots[index].data() : null, now, bucket.limits);
      if (result.state) {
        tx.set(bucket.ref, { ...result.state, updatedAt: FieldValue.serverTimestamp() });
      }
      blocked = blocked || result.blocked;
      retryAfter = Math.max(retryAfter, result.retryAfter);
      remaining = Math.min(remaining, result.remaining ?? 0);
    });
    return { blocked, retryAfter, remaining: Number.isFinite(remaining) ? remaining : 0 };
  });
}

// A successful sign-in clears the counters for that email. The address-wide
// counter is kept, so one address cannot reset its own spraying by logging in.
export async function clearAdminLoginFailures(email, address = null) {
  try {
    await Promise.all(refsFor(email, address)
      .filter((_, index) => index < 2)
      .map(bucket => bucket.ref.delete()));
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
