import { LANGUAGES, absoluteUrl } from "../lib/site.mjs";

export default function robots() {
  return {
    rules: [{
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", ...LANGUAGES.map(lang => `/${lang}/admin`)],
    }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
