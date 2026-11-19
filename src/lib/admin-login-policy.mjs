// Pure login-lock policy. Keep separate from Firestore for deterministic tests.
export const MAX_FAILURES = 5;
export const WINDOW_MS = 15 * 60 * 1000;
export const COOLDOWN_MS = 10 * 60 * 1000;

export const DEFAULT_LIMITS = Object.freeze({
  max: MAX_FAILURES,
  windowMs: WINDOW_MS,
  cooldownMs: COOLDOWN_MS,
});

export function loginLockStatus(state, now) {
  const blockedUntil = Number(state?.blockedUntil || 0);
  return {
    blocked: blockedUntil > now,
    retryAfter: blockedUntil > now ? Math.max(1, Math.ceil((blockedUntil - now) / 1000)) : 0,
  };
}

export function nextFailedLogin(state, now, limits = DEFAULT_LIMITS) {
  const current = loginLockStatus(state, now);
  if (current.blocked) return { ...current, state: null };

  const lockExpired = Number(state?.blockedUntil || 0) > 0 &&
    Number(state.blockedUntil) <= now;
  const started = Number(state?.windowStartedAt || 0);
  const inWindow = !lockExpired && started > now - limits.windowMs && started <= now;
  const failures = (inWindow ? Number(state?.failures || 0) : 0) + 1;
  const blocked = failures >= limits.max;
  const blockedUntil = blocked ? now + limits.cooldownMs : 0;

  return {
    blocked,
    retryAfter: blocked ? limits.cooldownMs / 1000 : 0,
    remaining: Math.max(0, limits.max - failures),
    state: {
      windowStartedAt: inWindow ? started : now,
      failures,
      blockedUntil,
    },
  };
}
