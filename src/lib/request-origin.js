/**
 * Validate browser-origin requests behind Firebase App Hosting.
 *
 * In production App Hosting, Host is the internal Cloud Run hostname.
 * Firebase supplies the public request host/protocol via forwarded headers.
 * In local development, fall back to the direct Host header.
 */
export function isSameOriginRequest(request) {
  const originHeader = request.headers.get("origin");
  if (!originHeader) return false;

  try {
    const origin = new URL(originHeader);
    const forwardedHost = request.headers.get("x-forwarded-host");
    const forwardedProto = request.headers.get("x-forwarded-proto");

    if (process.env.NODE_ENV === "production") {
      if (!forwardedHost || forwardedHost.includes(",") || forwardedProto !== "https") {
        return false;
      }
      return origin.protocol === "https:" &&
        origin.host.toLowerCase() === forwardedHost.trim().toLowerCase();
    }

    const host = request.headers.get("host");
    if (!host) return false;
    const expectedHost = forwardedHost || host;
    const expectedProto = forwardedProto?.split(",")[0]?.trim();
    if (expectedProto && origin.protocol !== `${expectedProto}:`) return false;
    return origin.host.toLowerCase() === expectedHost.trim().toLowerCase();
  } catch {
    return false;
  }
}
