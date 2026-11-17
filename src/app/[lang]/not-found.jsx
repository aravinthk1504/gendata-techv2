"use client"

import { useParams } from "next/navigation"
import LocalizedLink from "../../components/layout/LocalizedLink"

const COPY = {
  en: { title: "Page not found", text: "The page you are looking for does not exist or has moved.", home: "Back to home", contact: "Contact us" },
  de: { title: "Seite nicht gefunden", text: "Die gesuchte Seite existiert nicht oder wurde verschoben.", home: "Zur Startseite", contact: "Kontakt" },
}

export default function NotFound() {
  const { lang } = useParams()
  const copy = COPY[lang] || COPY.en
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-[70vh] items-center bg-white px-6 pb-24 pt-36 text-[#081b3a] outline-none">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.3em] text-[#057cfa]">404</p>
        <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">{copy.title}</h1>
        <p className="mt-4 text-slate-600">{copy.text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <LocalizedLink to="/" className="rounded-full bg-[#002DCC] px-6 py-3 font-medium text-white">{copy.home}</LocalizedLink>
          <LocalizedLink to="/contact" className="rounded-full border border-slate-300 px-6 py-3 font-medium">{copy.contact}</LocalizedLink>
        </div>
      </div>
    </main>
  )
}
