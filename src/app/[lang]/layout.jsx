import { notFound } from "next/navigation"

import "../globals.css"

import { poppins, montserrat } from "../../lib/fonts"
import { languages, isValidLanguage } from "../../i18n/config"
import { getDictionary } from "../../i18n/dictionaries"
import Navbar from "../../components/layout/Navbar"
import Footer from "../../components/layout/Footer"

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
    <html lang={lang}>
      <body className={`${poppins.variable} ${montserrat.variable} antialiased`}>
        <Navbar lang={lang} navigation={dictionary.nav} />
        {children}
        <Footer lang={lang} content={{ footer: lang === "de" ? footerDE : footerEN }} />
      </body>
    </html>
  )
}
