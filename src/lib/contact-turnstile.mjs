// Validate every production contact submission with Cloudflare Siteverify.
// Never accept a client-only challenge or caller-supplied forwarding headers.
export const TURNSTILE_ACTION = "contact";

export function contactTurnstileRequired(env = process.env) {
  return env.NODE_ENV === "production" || env.CONTACT_TURNSTILE_REQUIRED === "true";
}
export function allowedTurnstileHosts(raw) {
  return new Set(String(raw || "").split(",")
    .map(value => value.trim().toLowerCase())
    .filter(value => value.length > 0 && value.length <= 253 &&
      /^[a-z0-9.-]+$/.test(value) &&
      !value.startsWith(".") && !value.endsWith(".") && !value.includes("..")));
}
export function checkTurnstileResult(result, allowed) {
  return Boolean(result && result.success === true &&
    result.action === TURNSTILE_ACTION &&
    typeof result.hostname === "string" &&
    allowed.has(result.hostname.toLowerCase()));
}
export async function verifyContactTurnstile(token, { env = process.env, fetchImpl = fetch } = {}) {
  if (!contactTurnstileRequired(env)) return { ok: true };
  const secret = env.TURNSTILE_SECRET_KEY?.trim();
  const allowed = allowedTurnstileHosts(env.TURNSTILE_ALLOWED_HOSTNAMES);
  if (!secret || !env.TURNSTILE_SITE_KEY?.trim() || !allowed.size) {
    return { ok: false, reason: "not_configured" };
  }
  if (typeof token !== "string" || !token || token.length > 2048) {
    return { ok: false, reason: "invalid" };
  }
  try {
    const response = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return { ok: false, reason: "unavailable" };
    const result = await response.json();
    return checkTurnstileResult(result, allowed)
      ? { ok: true } : { ok: false, reason: "invalid" };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}
