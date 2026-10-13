import { getPageMetadata } from "../../../i18n/pageMetadata"
import Training from "../../../components/migrated/Training"

export default function TrainingPage() {
  return <Training />
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return getPageMetadata(lang, "training")
}
