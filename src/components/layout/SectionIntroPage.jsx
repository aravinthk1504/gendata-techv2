import Link from "next/link"

// Small, real-content interim pages so navigation works during migration.
// Replace each page with the original design when its migration begins.
const copy = {
  en: {
    services: {
      eyebrow: "What We Do",
      title: "Technology solutions built around your goals.",
      description: "Explore AI model development, Agentic AI, intelligent automation, full-stack development, software, mobile applications and IoT solutions.",
    },
    products: {
      eyebrow: "GenData Products",
      title: "Digital products designed for practical workflows.",
      description: "Our product areas include GenData LMS, CRM, ERP and billing platforms.",
    },
    training: {
      eyebrow: "Technology Training",
      title: "Practical learning for modern technology.",
      description: "Explore training areas including AI, Machine Learning, Data Science, IoT, software development and more.",
    },
    blog: {
      eyebrow: "Insights & Ideas",
      title: "Ideas, technology and what we're exploring.",
      description: "Insights into AI, software, connected technology and modern digital systems.",
    },
    contact: {
      eyebrow: "Contact GenData Tech",
      title: "Tell us what you're looking to build.",
      description: "Discuss an AI, software, app or IoT requirement with the GenData Tech team.",
    },
    back: "Back to Home",
    email: "Email us",
  },
  de: {
    services: {
      eyebrow: "Unsere Leistungen",
      title: "Technologielösungen für Ihre Ziele.",
      description: "Entdecken Sie AI Model Development, Agentic AI, intelligente Automatisierung, Full Stack Development, Software, mobile Anwendungen und IoT-Lösungen.",
    },
    products: {
      eyebrow: "GenData Produkte",
      title: "Digitale Produkte für praktische Arbeitsabläufe.",
      description: "Unsere Produktbereiche umfassen GenData LMS, CRM, ERP und Billing-Plattformen.",
    },
    training: {
      eyebrow: "Technologieschulungen",
      title: "Praxisnahes Lernen für moderne Technologie.",
      description: "Entdecken Sie Schulungen rund um AI, Machine Learning, Data Science, IoT, Softwareentwicklung und weitere Themen.",
    },
    blog: {
      eyebrow: "Einblicke & Ideen",
      title: "Ideen, Technologie und was wir erforschen.",
      description: "Einblicke in AI, Software, vernetzte Technologien und moderne digitale Systeme.",
    },
    contact: {
      eyebrow: "Kontakt zu GenData Tech",
      title: "Erzählen Sie uns von Ihrem Vorhaben.",
      description: "Sprechen Sie mit dem GenData Tech Team über Ihre Anforderungen an AI, Software, Apps oder IoT.",
    },
    back: "Zurück zur Startseite",
    email: "E-Mail senden",
  },
}

export default function SectionIntroPage({ lang, section }) {
  const locale = lang === "de" ? "de" : "en"
  const content = copy[locale]
  const page = content[section]

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-[#030b18] px-6 pb-24 pt-36 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[650px] -translate-x-1/2 rounded-full bg-[#002DCC]/20 blur-[160px]" />
      <div className="relative mx-auto w-full max-w-[1400px]">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-[#58bafc]">
          {page.eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          {page.title}
        </h1>
        <p className="mt-7 max-w-2xl font-body text-sm leading-8 text-slate-300 sm:text-base">
          {page.description}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.05] px-6 py-3 font-body text-xs font-semibold text-white transition hover:border-[#057CFA]"
          >
            {content.back}
          </Link>
          {section === "contact" && (
            <a
              href="mailto:gendatatechies@gmail.com"
              className="inline-flex items-center rounded-full bg-[#057CFA] px-6 py-3 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
            >
              {content.email}
            </a>
          )}
        </div>
      </div>
    </main>
  )
}
