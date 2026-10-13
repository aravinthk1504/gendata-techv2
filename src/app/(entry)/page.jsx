export const metadata = {
  title: "GenData Tech | Choose Language",
  description:
    "Choose your preferred language to explore GenData Tech.",
}

export default function EntryPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#030B18] px-6 text-center">

      <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
        GenData{" "}
        <span className="text-[#057CFA]">
          Tech
        </span>
      </h1>

      <p className="mt-5 font-body text-sm text-slate-300">
        Choose your language / Sprache wählen
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">

        <a
          href="/en"
          className="inline-flex items-center justify-center rounded-full bg-[#057CFA] px-8 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-[#002DCC]"
        >
          English
        </a>

        <a
          href="/de"
          className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 font-body text-sm font-semibold text-white transition hover:border-[#057CFA]"
        >
          Deutsch
        </a>

      </div>

    </main>
  )
}