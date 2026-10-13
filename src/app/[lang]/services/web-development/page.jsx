import { getPageMetadata } from "../../../../i18n/pageMetadata"
import WebDevelopment from "../../../../components/migrated/services/WebDevelopment"

export default function ServicePage() {
  return <WebDevelopment />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "services/web-development")
}
