import { getPageMetadata } from "../../../../i18n/pageMetadata"
import FullStackDevelopment from "../../../../components/migrated/services/FullStackDevelopment"

export default function ServicePage() {
  return <FullStackDevelopment />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "services/full-stack-development")
}
