import { getPageMetadata } from "../../../i18n/pageMetadata"
import Blog from "../../../components/migrated/Blog"

export default function BlogPage() {
  return <Blog />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "blog")
}
