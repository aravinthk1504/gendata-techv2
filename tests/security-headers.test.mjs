import test from "node:test";
import assert from "node:assert/strict";
import { contentSecurityPolicy, securityHeaders } from "../src/lib/security-headers.mjs";

const byKey = headers => Object.fromEntries(headers.map(h => [h.key, h.value]));

test("production CSP blocks framing, plugins, foreign base URLs and foreign connections", () => {
  const csp = contentSecurityPolicy({ production: true });
  for (const part of [
    "default-src 'self'", "frame-ancestors 'none'", "object-src 'none'",
    "base-uri 'self'", "form-action 'self'", "connect-src 'self'",
  ]) assert.ok(csp.includes(part), part);
  assert.ok(!csp.includes("unsafe-eval"), "no eval in production");
  assert.ok(!/script-src[^;]*https:/.test(csp), "scripts cannot load from arbitrary hosts");
  assert.ok(!csp.includes("*"), "no wildcards");
});

test("development CSP allows eval and websockets for hot reloading only", () => {
  const csp = contentSecurityPolicy({ production: false });
  assert.ok(csp.includes("'unsafe-eval'"));
  assert.ok(csp.includes("ws:"));
});

test("HSTS is sent in production only, without includeSubDomains or preload", () => {
  const prod = byKey(securityHeaders({ production: true }));
  assert.equal(prod["Strict-Transport-Security"], "max-age=31536000");
  assert.equal(byKey(securityHeaders({ production: false }))["Strict-Transport-Security"], undefined);
});

test("the existing hardening headers are still present", () => {
  const headers = byKey(securityHeaders({ production: true }));
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.equal(headers["Referrer-Policy"], "strict-origin-when-cross-origin");
  assert.equal(headers["Cross-Origin-Opener-Policy"], "same-origin");
});
