import { getPageMetadata } from "../../../i18n/pageMetadata"
import Services from "../../../components/migrated/Services"

export default function ServicesPage() {
  return <Services />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "services")
}
