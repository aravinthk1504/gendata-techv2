import "server-only";
import { revalidatePath, revalidateTag } from "next/cache";
import { BLOG_CACHE_TAG } from "./blog-cache.mjs";

// Called by the admin routes after a successful create, update or delete so the
// public site reflects the change immediately instead of after the 5 minute
// cache window. `id` has the form "<lang>_<slug>".
export function revalidateBlogContent(id = "") {
  revalidateTag(BLOG_CACHE_TAG, { expire: 0 });
  for (const lang of ["en", "de"]) {
    revalidatePath(`/${lang}`);
    revalidatePath(`/${lang}/blog`);
  }
  const match = /^(en|de)_([a-z0-9-]+)$/.exec(id);
  if (match) revalidatePath(`/${match[1]}/blog/${match[2]}`);
  revalidatePath("/sitemap.xml");
}
