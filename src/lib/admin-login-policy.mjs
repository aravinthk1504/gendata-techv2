// Pure login-lock policy. Keep separate from Firestore for deterministic tests.
export const MAX_FAILURES = 5;
export const WINDOW_MS = 15 * 60 * 1000;
export const COOLDOWN_MS = 10 * 60 * 1000;

export function loginLockStatus(state, now) {
  const blockedUntil = Number(state?.blockedUntil || 0);
  return {
    blocked: blockedUntil > now,
    retryAfter: blockedUntil > now ? Math.max(1, Math.ceil((blockedUntil - now) / 1000)) : 0,
  };
}

export function nextFailedLogin(state, now) {
  const current = loginLockStatus(state, now);
  if (current.blocked) return { ...current, state: null };

  const lockExpired = Number(state?.blockedUntil || 0) > 0 &&
    Number(state.blockedUntil) <= now;
  const started = Number(state?.windowStartedAt || 0);
  const inWindow = !lockExpired && started > now - WINDOW_MS && started <= now;
  const failures = (inWindow ? Number(state?.failures || 0) : 0) + 1;
  const blocked = failures >= MAX_FAILURES;
  const blockedUntil = blocked ? now + COOLDOWN_MS : 0;

  return {
    blocked,
    retryAfter: blocked ? COOLDOWN_MS / 1000 : 0,
    remaining: Math.max(0, MAX_FAILURES - failures),
    state: {
      windowStartedAt: inWindow ? started : now,
      failures,
      blockedUntil,
    },
  };
}
