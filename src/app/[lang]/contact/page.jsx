import SectionIntroPage from "../../../components/layout/SectionIntroPage"

// Temporary navigation destination; replace with the original page during migration.
export default async function SectionPage({ params }) {
  const { lang } = await params
  return <SectionIntroPage lang={lang} section="contact" />
}
