// Exact Firebase UID matches only; emails, domains and prefixes never grant access.
export function adminUidAllowlist(raw) {
  return new Set(String(raw || "").split(",").map(uid => uid.trim()).filter(Boolean));
}
export function approvedAdminUid(uid, allowed) {
  return typeof uid === "string" && uid.length > 0 && allowed.has(uid);
}
