import { notFound } from "next/navigation"

import "../globals.css"

import { poppins, montserrat } from "../../lib/fonts"
import { languages, isValidLanguage } from "../../i18n/config"
import { getDictionary } from "../../i18n/dictionaries"
import SiteChrome from "../../components/layout/SiteChrome"

import footerEN from "../../i18n/locales/en/footer.json"
import footerDE from "../../i18n/locales/de/footer.json"

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  if (!isValidLanguage(lang)) return {}
  const dictionary = await getDictionary(lang)

  return {
    title: `GenData Tech | ${dictionary.home.title}`,
    description: dictionary.home.description,
  }
}

export default async function LanguageLayout({ children, params }) {
  const { lang } = await params

  if (!isValidLanguage(lang)) notFound()

  const dictionary = await getDictionary(lang)

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body suppressHydrationWarning className={`${poppins.variable} ${montserrat.variable} antialiased`}>
        <SiteChrome lang={lang} navigation={dictionary.nav} footer={{ footer: lang === "de" ? footerDE : footerEN }}>
          {children}
        </SiteChrome>
      </body>
    </html>
  )
}
