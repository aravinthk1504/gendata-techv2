import { securityHeaders } from "./src/lib/security-headers.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,
  // Security headers (CSP, HSTS, framing, MIME sniffing); see src/lib/security-headers.mjs.
  async headers() {
    return [{
      source: "/:path*",
      headers: securityHeaders({ production: process.env.NODE_ENV === "production" }),
    }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
