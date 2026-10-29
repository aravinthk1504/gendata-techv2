import { getPageMetadata } from "../../../i18n/pageMetadata"
import Blog from "../../../components/migrated/Blog"
import { getPublishedBlogs } from "../../../lib/public-blogs"

export default async function BlogPage({params}) {
  const {lang}=await params;
  const posts=await getPublishedBlogs(lang);
  return <Blog posts={posts} />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "blog")
}
