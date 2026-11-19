import test from "node:test";
import assert from "node:assert/strict";
import { trustedClientAddress } from "../src/lib/client-address.mjs";

test("without a configured number of trusted proxies no address is trusted", () => {
  assert.equal(trustedClientAddress("203.0.113.9", undefined), null);
  assert.equal(trustedClientAddress("203.0.113.9", ""), null);
  assert.equal(trustedClientAddress("203.0.113.9", "0"), null);
  assert.equal(trustedClientAddress("203.0.113.9", "abc"), null);
  assert.equal(trustedClientAddress("203.0.113.9", "6"), null);
});

test("the client is the entry counted from the right, so forged leading entries are ignored", () => {
  assert.equal(trustedClientAddress("203.0.113.9", "1"), "203.0.113.9");
  assert.equal(trustedClientAddress("1.1.1.1, 2.2.2.2, 203.0.113.9", "1"), "203.0.113.9");
  assert.equal(trustedClientAddress("6.6.6.6, 203.0.113.9, 130.211.0.1", "2"), "203.0.113.9");
});

test("too few entries or a non-IP value gives null", () => {
  assert.equal(trustedClientAddress("203.0.113.9", "2"), null);
  assert.equal(trustedClientAddress("not-an-ip", "1"), null);
  assert.equal(trustedClientAddress(null, "1"), null);
  assert.equal(trustedClientAddress("2001:db8::1", "1"), "2001:db8::1");
});
