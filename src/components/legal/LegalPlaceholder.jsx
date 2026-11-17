import LocalizedLink from "../layout/LocalizedLink";

const COPY = {
  en: {
    draft: "This page is a placeholder and has not been completed yet.",
    back: "Back to home",
    sections: ["Who is responsible", "What personal data we process and why", "Your rights and how to contact us"],
  },
  de: {
    draft: "Diese Seite ist ein Platzhalter und noch nicht fertiggestellt.",
    back: "Zurück zur Startseite",
    sections: ["Verantwortlicher", "Welche personenbezogenen Daten wir verarbeiten und warum", "Ihre Rechte und Kontakt"],
  },
};

// Structure only. The legal wording must be written or approved by the
// company's legal adviser before this goes live.
export default function LegalPlaceholder({ lang, title }) {
  const copy = COPY[lang] || COPY.en;
  return (
    <main id="main-content" tabIndex={-1} className="bg-white px-6 pb-24 pt-36 text-[#081b3a] outline-none">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-bold tracking-tight">{title}</h1>
        <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">{copy.draft}</p>
        {copy.sections.map(section => (
          <section key={section} className="mt-10">
            <h2 className="font-heading text-xl font-semibold">{section}</h2>
            <p className="mt-3 text-slate-600">—</p>
          </section>
        ))}
        <LocalizedLink to="/" className="mt-12 inline-block font-medium text-[#002DCC] underline">{copy.back}</LocalizedLink>
      </div>
    </main>
  );
}
