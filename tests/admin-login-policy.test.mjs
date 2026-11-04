import test from "node:test";
import assert from "node:assert/strict";
import {
  COOLDOWN_MS, MAX_FAILURES, WINDOW_MS,
  loginLockStatus, nextFailedLogin,
} from "../src/lib/admin-login-policy.mjs";

test("fifth failed login locks the account; earlier ones do not", () => {
  let state = null;
  const start = Date.now();
  for (let attempt = 1; attempt <= MAX_FAILURES; attempt++) {
    const result = nextFailedLogin(state, start + attempt * 1000);
    state = result.state;
    assert.equal(result.blocked, attempt === MAX_FAILURES);
    assert.equal(result.remaining, MAX_FAILURES - attempt);
  }
  assert.equal(loginLockStatus(state, start + MAX_FAILURES * 1000).blocked, true);
});

test("locked account remains blocked without incrementing state", () => {
  const now = Date.now();
  const state = { windowStartedAt: now - 3000, failures: MAX_FAILURES, blockedUntil: now + COOLDOWN_MS };
  const result = nextFailedLogin(state, now + 1000);
  assert.equal(result.blocked, true);
  assert.equal(result.state, null);
  assert.ok(result.retryAfter > 0);
});

test("lock expires and resets counter", () => {
  const now = Date.now();
  const state = { windowStartedAt: now - 5000, failures: MAX_FAILURES, blockedUntil: now + COOLDOWN_MS };
  const result = nextFailedLogin(state, now + COOLDOWN_MS + 1);
  assert.equal(result.blocked, false);
  assert.equal(result.state.failures, 1);
});

test("old failure windows reset automatically", () => {
  const now = Date.now();
  const result = nextFailedLogin({
    windowStartedAt: now - WINDOW_MS - 1, failures: MAX_FAILURES - 1, blockedUntil: 0,
  }, now);
  assert.equal(result.blocked, false);
  assert.equal(result.state.failures, 1);
});

test("retry delay is rounded up to a whole second", () => {
  const now = Date.now();
  const value = loginLockStatus({ blockedUntil: now + 1501 }, now);
  assert.equal(value.blocked, true);
  assert.equal(value.retryAfter, 2);
});
