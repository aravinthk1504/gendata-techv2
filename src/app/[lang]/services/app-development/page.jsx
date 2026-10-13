import { getPageMetadata } from "../../../../i18n/pageMetadata"
import AppDevelopment from "../../../../components/migrated/services/AppDevelopment"

export default function ServicePage() {
  return <AppDevelopment />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "services/app-development")
}
