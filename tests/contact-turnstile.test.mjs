import test from "node:test";
import assert from "node:assert/strict";
import { allowedTurnstileHosts, checkTurnstileResult, contactTurnstileRequired, verifyContactTurnstile } from "../src/lib/contact-turnstile.mjs";

const env = { NODE_ENV: "production", TURNSTILE_SITE_KEY: "public", TURNSTILE_SECRET_KEY: "secret", TURNSTILE_ALLOWED_HOSTNAMES: "gendatatech.com,www.gendatatech.com" };
test("production Turnstile always required; local dev optional", () => {
  assert.equal(contactTurnstileRequired({ NODE_ENV: "production", CONTACT_TURNSTILE_REQUIRED: "false" }), true);
  assert.equal(contactTurnstileRequired({ NODE_ENV: "development" }), false);
  assert.equal(contactTurnstileRequired({ NODE_ENV: "development", CONTACT_TURNSTILE_REQUIRED: "true" }), true);
});
test("hostname and action require exact matches", () => {
  const hosts = allowedTurnstileHosts(env.TURNSTILE_ALLOWED_HOSTNAMES);
  assert.ok(checkTurnstileResult({ success: true, hostname: "gendatatech.com", action: "contact" }, hosts));
  assert.ok(!checkTurnstileResult({ success: true, hostname: "evilgendatatech.com", action: "contact" }, hosts));
  assert.ok(!checkTurnstileResult({ success: true, hostname: "gendatatech.com", action: "admin" }, hosts));
  assert.equal(allowedTurnstileHosts("*.gendatatech.com").size, 0);
});
test("missing configuration, empty and oversized tokens all fail closed", async () => {
  let requests = 0;
  const fetchImpl = async () => { requests++; throw Error("should not run"); };
  assert.deepEqual(await verifyContactTurnstile("token", { env: { NODE_ENV: "production" }, fetchImpl }), { ok: false, reason: "not_configured" });
  assert.deepEqual(await verifyContactTurnstile("", { env, fetchImpl }), { ok: false, reason: "invalid" });
  assert.deepEqual(await verifyContactTurnstile("x".repeat(2049), { env, fetchImpl }), { ok: false, reason: "invalid" });
  assert.equal(requests, 0);
});
test("server uses official endpoint and rejects wrong hostname", async () => {
  const fetchImpl = async (url, options) => {
    assert.equal(url, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
    assert.equal(options.body.get("secret"), "secret");
    assert.equal(options.body.get("response"), "token");
    assert.equal(options.body.get("remoteip"), null);
    return { ok: true, json: async () => ({ success: true, hostname: "gendatatech.com", action: "contact" }) };
  };
  assert.deepEqual(await verifyContactTurnstile("token", { env, fetchImpl }), { ok: true });
  const wrongHost = async () => ({ ok: true, json: async () => ({ success: true, hostname: "wrong.example", action: "contact" }) });
  assert.deepEqual(await verifyContactTurnstile("token", { env, fetchImpl: wrongHost }), { ok: false, reason: "invalid" });
});
test("provider errors fail closed", async () => {
  assert.deepEqual(await verifyContactTurnstile("token", { env, fetchImpl: async () => { throw Error("offline"); } }), { ok: false, reason: "unavailable" });
});
