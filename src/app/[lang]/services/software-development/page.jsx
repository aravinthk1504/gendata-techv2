import { getPageMetadata } from "../../../../i18n/pageMetadata"
import SoftwareDevelopment from "../../../../components/migrated/services/SoftwareDevelopment"

export default function ServicePage() {
  return <SoftwareDevelopment />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "services/software-development")
}
