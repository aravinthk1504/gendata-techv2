// Response security headers, kept in a plain module so they can be unit tested.
//
// The CSP is deliberately not nonce-based: nonces force every page to render
// dynamically, which would undo static generation. Inline scripts therefore stay
// allowed ('unsafe-inline'), and the policy locks down everything else: where
// resources load from, framing, <base>, plugins and form targets.
export function contentSecurityPolicy({ production }) {
  const directives = [
    ["default-src", "'self'"],
    // 'unsafe-eval' is only needed by the development server's hot reloading.
    ["script-src", production ? "'self' 'unsafe-inline'" : "'self' 'unsafe-inline' 'unsafe-eval'"],
    ["style-src", "'self' 'unsafe-inline'"],
    // Blog images may be any HTTPS URL entered in the admin (Cloudinary by default).
    ["img-src", "'self' data: blob: https:"],
    ["font-src", "'self' data:"],
    // Browser code only talks to this site's own API routes.
    ["connect-src", production ? "'self'" : "'self' ws: wss:"],
    ["frame-ancestors", "'none'"],
    ["base-uri", "'self'"],
    ["form-action", "'self'"],
    ["object-src", "'none'"],
  ];
  return directives.map(([name, value]) => `${name} ${value}`).join("; ");
}

export function securityHeaders({ production }) {
  const headers = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Content-Security-Policy", value: contentSecurityPolicy({ production }) },
  ];
  // Browsers ignore HSTS over plain HTTP, but it is only sent in production.
  // includeSubDomains is left out on purpose: add it once every subdomain
  // (mail, staging, ...) is served over HTTPS.
  if (production) {
    headers.push({ key: "Strict-Transport-Security", value: "max-age=31536000" });
  }
  return headers;
}
