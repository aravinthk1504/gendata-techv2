import { getPageMetadata } from "../../../../i18n/pageMetadata"
import AIMLDevelopment from "../../../../components/migrated/services/AIMLDevelopment"

export default function ServicePage() {
  return <AIMLDevelopment />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "services/ai-ml-development")
}
