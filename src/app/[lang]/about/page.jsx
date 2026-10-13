import { getPageMetadata } from "../../../i18n/pageMetadata"
import About from "../../../components/migrated/About"

export default function AboutPage() {
  return <About />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "about")
}
