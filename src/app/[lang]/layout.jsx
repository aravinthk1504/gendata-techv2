import { notFound } from "next/navigation"

import "../globals.css"

import { poppins, montserrat, urbanist } from "../../lib/fonts"
import { languages, isValidLanguage } from "../../i18n/config"
import { getDictionary } from "../../i18n/dictionaries"
import SiteChrome from "../../components/layout/SiteChrome"
import JsonLd from "../../components/seo/JsonLd"
import { organizationSchema, websiteSchema } from "../../lib/json-ld.mjs"
import { SITE_NAME, defaultShareImage, siteUrl } from "../../lib/site.mjs"

import footerEN from "../../i18n/locales/en/footer.json"
import footerDE from "../../i18n/locales/de/footer.json"

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  if (!isValidLanguage(lang)) return {}
  const dictionary = await getDictionary(lang)

  // Canonical/hreflang are set per page, never here: a layout-level canonical
  // would be inherited by pages that forget to set their own.
  return {
    metadataBase: new URL(siteUrl()),
    applicationName: SITE_NAME,
    title: `GenData Tech | ${dictionary.home.title}`,
    description: dictionary.home.description,
    openGraph: { type: "website", siteName: SITE_NAME, images: [defaultShareImage(lang)] },
    twitter: { card: "summary_large_image", images: [defaultShareImage(lang).url] },
  }
}

export default async function LanguageLayout({ children, params }) {
  const { lang } = await params

  if (!isValidLanguage(lang)) notFound()

  const dictionary = await getDictionary(lang)

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body suppressHydrationWarning className={`${poppins.variable} ${montserrat.variable} ${urbanist.variable} antialiased`}>
        <JsonLd data={[organizationSchema(), websiteSchema(lang)]} />
        <SiteChrome lang={lang} navigation={dictionary.nav} footer={{ footer: lang === "de" ? footerDE : footerEN }}>
          {children}
        </SiteChrome>
      </body>
    </html>
  )
}
