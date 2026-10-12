import { notFound } from "next/navigation"

import { getDictionary } from "../../../i18n/dictionaries"
import { isValidLanguage } from "../../../i18n/config"


export default async function AboutPage({ params }) {
  const { lang } = await params

  if (!isValidLanguage(lang)) {
    notFound()
  }

  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-[75vh] bg-brand-dark px-6 py-28 lg:px-10">

      <div className="mx-auto max-w-[1400px]">

        <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent">
          {dictionary.about.eyebrow}
        </p>

        <h1 className="mt-6 max-w-4xl font-heading text-4xl font-semibold text-white sm:text-6xl">
          {dictionary.about.title}
        </h1>

        <p className="mt-7 max-w-2xl font-body text-base leading-8 text-slate-300">
          {dictionary.about.description}
        </p>

      </div>

    </main>
  )
}