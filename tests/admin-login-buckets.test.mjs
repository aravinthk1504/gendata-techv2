import test from "node:test";
import assert from "node:assert/strict";
import { loginBuckets, LIMITS } from "../src/lib/admin-login-buckets.mjs";
import { DEFAULT_LIMITS, nextFailedLogin } from "../src/lib/admin-login-policy.mjs";

test("without an address only the email is counted, with the original limits", () => {
  const buckets = loginBuckets("admin@example.com", null);
  assert.equal(buckets.length, 1);
  assert.equal(buckets[0].limits, DEFAULT_LIMITS);
});

test("with an address the email, email+address and address are counted separately", () => {
  const buckets = loginBuckets("admin@example.com", "203.0.113.9");
  assert.equal(buckets.length, 3);
  assert.equal(new Set(buckets.map(b => b.key)).size, 3);
  const joined = buckets.map(b => b.key).join(" ");
  assert.ok(joined.includes("203.0.113.9") && joined.includes("admin@example.com"));
});

test("keys cannot collide across kinds even with unusual email text", () => {
  const a = loginBuckets("a|b@example.com", "1.2.3.4").map(b => b.key);
  const b = loginBuckets("a@example.com", "b|1.2.3.4").map(b => b.key);
  assert.equal(a.filter(key => b.includes(key)).length, 0);
});

test("an attacker's failures from another address cannot lock the admin's own address", () => {
  const now = Date.now();
  let attackerEmailAddress = null;
  let shared = null;
  for (let i = 0; i < 5; i++) {
    attackerEmailAddress = nextFailedLogin(attackerEmailAddress, now + i, LIMITS.emailAndAddress).state;
    shared = nextFailedLogin(shared, now + i, LIMITS.emailAnywhere).state;
  }
  // The attacker's own bucket is locked after 5 failures...
  assert.ok(attackerEmailAddress.blockedUntil > now);
  // ...but the shared per-email bucket is not, so the real admin is not locked out.
  assert.equal(shared.blockedUntil, 0);
});

test("sustained guessing from many addresses still trips the shared per-email limit", () => {
  const now = Date.now();
  let shared = null;
  let blocked = false;
  for (let i = 0; i < LIMITS.emailAnywhere.max; i++) {
    const result = nextFailedLogin(shared, now + i, LIMITS.emailAnywhere);
    shared = result.state;
    blocked = result.blocked;
  }
  assert.equal(blocked, true);
});

test("custom limits do not change the default policy", () => {
  const result = nextFailedLogin(null, Date.now());
  assert.equal(result.remaining, DEFAULT_LIMITS.max - 1);
});
