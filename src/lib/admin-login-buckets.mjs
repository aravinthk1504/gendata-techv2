import { DEFAULT_LIMITS } from "./admin-login-policy.mjs";

// Which failure counters apply to a sign-in attempt.
//
// Without a trusted client address only the email is counted, as before. With
// one, a single person guessing from their own address is stopped quickly, while
// someone elsewhere typing a known admin email cannot lock the real admin out
// of their own address with a handful of attempts: the shared per-email counter
// needs far more failures than the per-address one.
export const LIMITS = Object.freeze({
  // Failures for one email from one address.
  emailAndAddress: DEFAULT_LIMITS,
  // Failures for one email from anywhere (spread-out guessing).
  emailAnywhere: Object.freeze({ max: 20, windowMs: 60 * 60 * 1000, cooldownMs: 15 * 60 * 1000 }),
  // Failures from one address across all emails (password spraying).
  addressAnyEmail: Object.freeze({ max: 20, windowMs: 15 * 60 * 1000, cooldownMs: 15 * 60 * 1000 }),
});

// Returns [{ key, limits }]. `key` is hashed by the caller before it is stored,
// so raw emails and addresses never reach Firestore.
export function loginBuckets(email, address) {
  if (!address) {
    return [{ key: JSON.stringify(["email", email]), limits: DEFAULT_LIMITS }];
  }
  return [
    { key: JSON.stringify(["email+address", email, address]), limits: LIMITS.emailAndAddress },
    { key: JSON.stringify(["email", email]), limits: LIMITS.emailAnywhere },
    { key: JSON.stringify(["address", address]), limits: LIMITS.addressAnyEmail },
  ];
}
