// Static page refreshed in the background; shows an empty list if Firestore is unreachable.
export const revalidate = 300;
import { getPageMetadata } from "../../../i18n/pageMetadata"
import Blog from "../../../components/migrated/Blog"
import { getPublishedBlogsOrEmpty } from "../../../lib/public-blogs"

export default async function BlogPage({params}) {
  const {lang}=await params;
  const posts=await getPublishedBlogsOrEmpty(lang,100);
  return <Blog posts={posts} />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "blog")
}
