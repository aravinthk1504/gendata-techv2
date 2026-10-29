export const dynamic = "force-dynamic";
import { notFound } from "next/navigation"
import { isValidLanguage } from "../../i18n/config"
import Hero from "../../sections/home/Hero"
import AICapabilities from "../../sections/home/AICapabilities"
import TechnologyServices from "../../sections/home/TechnologyServices"
import IntelligenceProcess from "../../sections/home/IntelligenceProcess"
import Products from "../../sections/home/Products"
import Training from "../../sections/home/Training"
import Insights from "../../sections/home/Insights"
import {getPublishedBlogs} from "../../lib/public-blogs"
import FinalCTA from "../../sections/home/FinalCTA"

const homeDictionaries = {
  en: () => import("../../i18n/locales/en/home.json").then((m) => m.default),
  de: () => import("../../i18n/locales/de/home.json").then((m) => m.default),
}

export default async function HomePage({ params }) {
  const { lang } = await params
  if (!isValidLanguage(lang)) notFound()

  const content = await homeDictionaries[lang]()
  const posts = await getPublishedBlogs(lang,6)

  return (
    <main>
      <Hero lang={lang} content={content} />
      <AICapabilities lang={lang} content={content} />
      <TechnologyServices lang={lang} content={content} />
      <IntelligenceProcess lang={lang} content={content} />
      <Products lang={lang} content={content} />
      <Training lang={lang} content={content} />
      <Insights lang={lang} content={content} posts={posts} />
      <FinalCTA lang={lang} content={content} />
    </main>
  )
}
