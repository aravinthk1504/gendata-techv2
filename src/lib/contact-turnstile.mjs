// Validate every production contact submission with Cloudflare Siteverify.
// Never accept a client-only challenge or caller-supplied forwarding headers.
export const TURNSTILE_ACTION = "contact";

export function contactTurnstileRequired(env = process.env) {
  if (env.NODE_ENV === "production") return true;
  if (env.CONTACT_TURNSTILE_REQUIRED === "true") return true;
  if (env.CONTACT_TURNSTILE_REQUIRED === "false") return false;
  // Auto-enable local verification when the developer has configured keys.
  // This avoids a silent hidden widget while testing in Next.js dev mode.
  return Boolean(env.TURNSTILE_SITE_KEY?.trim() || env.TURNSTILE_SECRET_KEY?.trim());
}

const TEST_SITE_KEY = "1x00000000000000000000AA";
const TEST_SECRET_KEY = "1x0000000000000000000000000000000AA";

function looksLikeTestKey(value) {
  return /^[123]x0000000000000000/.test(value);
}
export function allowedTurnstileHosts(raw) {
  return new Set(String(raw || "").split(",")
    .map(value => value.trim().toLowerCase())
    .filter(value => value.length > 0 && value.length <= 253 &&
      /^[a-z0-9.-]+$/.test(value) &&
      !value.startsWith(".") && !value.endsWith(".") && !value.includes("..")));
}
export function checkTurnstileResult(result, allowed, { allowTestAction = false } = {}) {
  return Boolean(result && result.success === true &&
    (result.action === TURNSTILE_ACTION ||
      (allowTestAction && result.action === "test")) &&
    typeof result.hostname === "string" &&
    allowed.has(result.hostname.toLowerCase()));
}
export async function verifyContactTurnstile(token, { env = process.env, fetchImpl = fetch } = {}) {
  if (!contactTurnstileRequired(env)) return { ok: true };
  const secret = env.TURNSTILE_SECRET_KEY?.trim();
  const siteKey = env.TURNSTILE_SITE_KEY?.trim();
  const allowed = allowedTurnstileHosts(env.TURNSTILE_ALLOWED_HOSTNAMES);
  if (!secret || !siteKey || !allowed.size) {
    return { ok: false, reason: "not_configured" };
  }
  // Cloudflare's public dummy keys are only for development, never production.
  if (env.NODE_ENV === "production" &&
      (looksLikeTestKey(siteKey) || looksLikeTestKey(secret))) {
    return { ok: false, reason: "not_configured" };
  }
  const allowTestAction = env.NODE_ENV !== "production" &&
    siteKey === TEST_SITE_KEY && secret === TEST_SECRET_KEY;
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
    return checkTurnstileResult(result, allowed, { allowTestAction })
      ? { ok: true } : { ok: false, reason: "invalid" };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
}
