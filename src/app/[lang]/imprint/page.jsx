import { notFound } from "next/navigation"
import { isValidLanguage } from "../../../i18n/config"
import LegalPlaceholder from "../../../components/legal/LegalPlaceholder"

const TITLES = { en: "Imprint", de: "Impressum" }

// Placeholder page: kept out of search results until the text is complete.
export async function generateMetadata({ params }) {
  const { lang } = await params
  if (!isValidLanguage(lang)) return {}
  return { title: `${TITLES[lang]} | GenData Tech`, robots: { index: false, follow: true } }
}

export default async function Page({ params }) {
  const { lang } = await params
  if (!isValidLanguage(lang)) notFound()
  return <LegalPlaceholder lang={lang} title={TITLES[lang]} />
}
