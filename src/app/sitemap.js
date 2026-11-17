import { LANGUAGES, STATIC_ROUTES, absoluteUrl } from "../lib/site.mjs";
import { getPublishedBlogEntries } from "../lib/public-blogs";

// Regenerated at most once an hour.
export const revalidate = 3600;

// A slow or unreachable Firestore must never hang the sitemap.
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

function languageAlternates(path) {
  return {
    ...Object.fromEntries(LANGUAGES.map(lang => [lang, absoluteUrl(`/${lang}${path}`)])),
    "x-default": absoluteUrl(`/${LANGUAGES[0]}${path}`),
  };
}

export default async function sitemap() {
  const entries = [];

  for (const path of STATIC_ROUTES) {
    for (const lang of LANGUAGES) {
      entries.push({
        url: absoluteUrl(`/${lang}${path}`),
        changeFrequency: path === "/blog" || path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.startsWith("/services/") ? 0.7 : 0.8,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  // Articles are published per language, so they carry no hreflang alternates.
  // If Firestore is unavailable the static pages are still served.
  try {
    for (const post of await withTimeout(getPublishedBlogEntries(), 8000)) {
      entries.push({
        url: absoluteUrl(`/${post.language}/blog/${post.slug}`),
        ...(post.lastModified ? { lastModified: post.lastModified } : {}),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch (error) {
    console.error("Sitemap blog entries unavailable", error?.code || error?.name || "unknown");
  }

  return entries;
}
