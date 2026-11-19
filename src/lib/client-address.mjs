import { isIP } from "node:net";

// X-Forwarded-For can be written by the client, so it is only usable when the
// number of trusted proxies in front of the app is known. Each trusted proxy
// appends the address of the peer it received the request from, so the real
// client is the entry `hops` positions from the right; anything further left
// may be forged. Returns null whenever the address cannot be trusted, in which
// case callers must fall back to behaviour that does not depend on an address.
export function trustedClientAddress(forwardedFor, hops) {
  const count = Number.parseInt(String(hops ?? ""), 10);
  if (!Number.isInteger(count) || count < 1 || count > 5) return null;
  const entries = String(forwardedFor ?? "").split(",").map(part => part.trim()).filter(Boolean);
  if (entries.length < count) return null;
  const candidate = entries[entries.length - count];
  return isIP(candidate) ? candidate : null;
}
