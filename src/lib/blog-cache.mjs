// Shared by the public readers and the admin routes that invalidate them.
export const BLOG_CACHE_TAG = "blogs";
// How long public pages may show Firestore data before refreshing it.
export const BLOG_REVALIDATE_SECONDS = 300;
