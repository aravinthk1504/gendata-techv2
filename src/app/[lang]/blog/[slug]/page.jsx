import { getPageMetadata } from "../../../../i18n/pageMetadata"
import BlogDetails from "../../../../components/migrated/BlogDetails"

export default function BlogDetailsPage() {
  return <BlogDetails />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "blog/[slug]")
}
