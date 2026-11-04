import test from "node:test";
import assert from "node:assert/strict";
import { adminUidAllowlist, approvedAdminUid } from "../src/lib/admin-allowlist.mjs";
test("approved UIDs must be exact and case-sensitive", () => {
  const allowed = adminUidAllowlist(" primary , second,primary");
  assert.equal(allowed.size, 2);
  assert.ok(approvedAdminUid("primary", allowed));
  assert.ok(!approvedAdminUid("PRIMARY", allowed));
  assert.ok(!approvedAdminUid("primary-other", allowed));
});
test("missing allowlist never grants access", () => {
  assert.ok(!approvedAdminUid("any", adminUidAllowlist("")));
});
