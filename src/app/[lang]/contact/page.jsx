import { getPageMetadata } from "../../../i18n/pageMetadata"
import Contact from "../../../components/migrated/Contact"

export default function ContactPage() {
  return <Contact />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "contact")
}
