"use client"

import { useParams } from "next/navigation";
import ProcessFlowGlow from "../layout/ProcessFlowGlow"
import TechHeroSculpture from "../layout/TechHeroSculpture"

import { useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import {
  FiArrowRight,
  FiBookOpen,
  FiChevronDown,
  FiCreditCard,
  
  FiGrid,
  FiLayers,
  FiRepeat,
  FiTarget,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import Link from "../layout/LocalizedLink"

import CommonCTA from "../layout/CommonCTA"
const translationsDE = {"Service Overview":"Leistungsüberblick","What We Offer":"Unsere Leistungen","Use Cases":"Anwendungsfälle","Technology Stack":"Technologie-Stack","Development Process":"Entwicklungsprozess","Why GenData Tech":"Warum GenData Tech","Frequently Asked Questions":"Häufig gestellte Fragen","Requirement":"Anforderungen","Planning":"Planung","Architecture":"Architektur","Development":"Entwicklung","Integration":"Integration","Testing":"Tests","Deployment":"Bereitstellung","Delivery":"Auslieferung","Understand":"Verstehen","Design":"Konzeption","Build":"Entwicklung","Evaluate":"Evaluierung","Evaluation":"Bewertung","Training":"Training","Structure":"Struktur","Connect":"Verbinden","Improve":"Verbessern","Start a Project":"Projekt starten","Discuss Your Requirement":"Anforderung besprechen","AI / ML Development":"KI- und ML-Entwicklung","Full Stack Development":"Full-Stack-Entwicklung","Web Development":"Webentwicklung","Software Development":"Softwareentwicklung","App Development":"App-Entwicklung","IoT Solutions":"IoT-Lösungen","AI Automation":"KI-Automatisierung","Custom AI Solutions":"Individuelle KI-Lösungen","Machine Learning Solutions":"Lösungen für maschinelles Lernen","Model Design":"Modellkonzeption","Data Understanding":"Datenverständnis","AI Model Development":"KI-Modellentwicklung","Frontend Development":"Frontend-Entwicklung","Backend Development":"Backend-Entwicklung","API Development":"API-Entwicklung","Database Integration":"Datenbankintegration","Authentication & Security":"Authentifizierung und Sicherheit","Corporate Websites":"Unternehmenswebsites","Startup Websites":"Websites für Start-ups","Product Websites":"Produktwebsites","Responsive Development":"Responsive Entwicklung","Performance-focused Development":"Performanceorientierte Entwicklung","SEO-ready Structure":"SEO-gerechte Struktur","Custom Business Software":"Individuelle Unternehmenssoftware","Internal Tools":"Interne Tools","Management Systems":"Managementsysteme","Workflow Applications":"Workflow-Anwendungen","API & System Integration":"API- und Systemintegration","Software Modernization":"Softwaremodernisierung","Android App Development":"Android-App-Entwicklung","iOS App Development":"iOS-App-Entwicklung","Cross-platform Applications":"Plattformübergreifende Anwendungen","Backend & API Integration":"Backend- und API-Integration","Notifications & User Features":"Benachrichtigungen und Nutzerfunktionen","Business Mobile Apps":"Mobile Business-Apps","Sensor Monitoring":"Sensorüberwachung","Device Automation":"Geräteautomatisierung","Remote Monitoring":"Fernüberwachung","IoT Dashboards":"IoT-Dashboards","Alerts & Notifications":"Warnmeldungen und Benachrichtigungen","AI-enabled IoT":"KI-gestütztes IoT","Our Services":"Unsere Leistungen","Technology Services":"Technologiedienstleistungen","Product Portfolio":"Produktportfolio","Our Products":"Unsere Produkte","GenData Tech Products":"GenData Tech Produkte","Training Programs":"Schulungsprogramme","Learning Experience":"Lernerfahrung","Learning Process":"Lernprozess","Learning Approach":"Lernkonzept","Contact GenData Tech":"Kontakt zu GenData Tech","Quick Contact":"Direkter Kontakt","Start Your Enquiry":"Anfrage senden","Full Name *":"Vollständiger Name *","Email Address *":"E-Mail-Adresse *","Phone Number":"Telefonnummer","What are you interested in? *":"Wofür interessieren Sie sich? *","Select a category":"Kategorie auswählen","Other Enquiry":"Sonstige Anfrage","What are you looking for? *":"Was suchen Sie? *","Tell us about your requirement *":"Beschreiben Sie Ihr Anliegen *","Locations":"Standorte","Before You Get in Touch":"Bevor Sie Kontakt aufnehmen","Your Requirement":"Ihre Anforderung","The Problem":"Die Herausforderung","The Next Step":"Der nächste Schritt","Our Response Promise":"Unser Antwortversprechen","Within 24 hrs":"Innerhalb von 24 Std.","Response":"Antwort","Availability":"Erreichbarkeit","Insights":"Einblicke","Explore":"Entdecken","Learn":"Lernen","Students":"Studierende","Beginners":"Einsteiger","Skill Builders":"Weiterbildungsinteressierte","Data Science":"Data Science","Data Analytics":"Datenanalyse","IoT Development":"IoT-Entwicklung","Mobile App Development":"Mobile-App-Entwicklung","Python":"Python","Digital products built":"Digitale Produkte für","around practical workflows.":"Bildung und Business.","Software products for learning and business operations.":"Software für Bildung und Unternehmen.","A growing product ecosystem from GenData Tech.":"Ein wachsendes Produktportfolio von GenData Tech.","Products shaped around useful everyday workflows.":"Produkte für praktische Arbeitsabläufe.","From user need to structured digital product.":"Vom Nutzerbedarf zum digitalen Produkt.","Questions about GenData Tech products.":"Fragen zu den Produkten von GenData Tech.","A learning management platform designed to organize courses, learners, training content and learning activities in one connected system.":"Eine Lernplattform, die Kurse, Teilnehmende, Schulungsinhalte und Lernaktivitäten in einem vernetzten System organisiert.","A customer relationship platform designed to organize customer information, interactions, follow-ups and business relationships.":"Eine CRM-Plattform zur Verwaltung von Kundeninformationen, Interaktionen, Nachfassaktionen und Geschäftsbeziehungen.","A centralized business platform designed to connect operational information, workflows and management activities.":"Eine zentrale Unternehmensplattform, die Betriebsdaten, Arbeitsabläufe und Managementprozesse verbindet.","A billing and business transaction platform designed to simplify invoice creation, records and billing-related workflows.":"Eine Plattform für Abrechnungen und Geschäftsvorgänge, die Rechnungsstellung, Aufzeichnungen und Abrechnungsprozesse vereinfacht.","Built Around the Workflow":"An Arbeitsabläufen orientiert","Products should support the process users actually need rather than adding unnecessary complexity.":"Produkte sollen die tatsächlich benötigten Prozesse unterstützen, statt unnötige Komplexität zu schaffen.","Connected Information":"Vernetzte Informationen","Data, users and workflows are structured so important information can work together within one platform.":"Daten, Nutzer und Abläufe werden so strukturiert, dass wichtige Informationen auf einer Plattform zusammenwirken.","Practical Experience":"Praxisnahe Nutzung","Interfaces and functionality are designed around useful everyday actions and clear user journeys.":"Oberflächen und Funktionen orientieren sich an alltäglichen Aufgaben und klaren Nutzerwegen.","Designed to Evolve":"Für Weiterentwicklung ausgelegt","Product architecture considers future features, integrations and changing operational requirements.":"Die Produktarchitektur berücksichtigt künftige Funktionen, Integrationen und sich verändernde Anforderungen.","Understand the user, workflow and problem the product needs to support.":"Nutzer, Arbeitsabläufe und die zu lösende Aufgabe verstehen.","Define the modules, information flow and product architecture.":"Module, Informationsflüsse und Produktarchitektur festlegen.","Plan interfaces and user journeys around important actions.":"Oberflächen und Nutzerwege für wichtige Aufgaben gestalten.","Develop the required product functionality and supporting systems.":"Benötigte Produktfunktionen und unterstützende Systeme entwickeln.","Integrate data, APIs and other services where required.":"Daten, APIs und weitere Dienste bei Bedarf integrieren.","Continue refining functionality as product requirements evolve.":"Funktionen mit neuen Produktanforderungen kontinuierlich verbessern.","What products does GenData Tech provide?":"Welche Produkte bietet GenData Tech an?","GenData Tech's product portfolio includes GenData LMS, GenData CRM, GenData ERP and GenData Billing.":"Zum Produktportfolio von GenData Tech gehören GenData LMS, GenData CRM, GenData ERP und GenData Billing.","What is GenData LMS?":"Was ist GenData LMS?","GenData LMS is a learning management platform designed around course organization, learner management, training content and learning activities.":"GenData LMS ist eine Lernmanagementplattform für die Organisation von Kursen, Teilnehmenden, Schulungsinhalten und Lernaktivitäten.","What is GenData CRM?":"Was ist GenData CRM?","GenData CRM is designed to help organize customer information, leads, interactions and follow-up activities within one system.":"GenData CRM unterstützt die Verwaltung von Kundendaten, Leads, Interaktionen und Nachfassaktionen in einem System.","What is GenData ERP?":"Was ist GenData ERP?","GenData ERP is designed as a centralized platform for connecting business information, operational workflows and management activities.":"GenData ERP ist eine zentrale Plattform zur Verbindung von Unternehmensdaten, betrieblichen Abläufen und Verwaltungsaufgaben.","What is GenData Billing?":"Was ist GenData Billing?","GenData Billing is designed to support billing workflows including invoice creation, customer records and transaction-related information.":"GenData Billing unterstützt Abrechnungsabläufe wie die Rechnungserstellung, Kundenverwaltung und Verarbeitung von Transaktionsdaten.","Can I contact GenData Tech to learn more about a product?":"Kann ich GenData Tech kontaktieren, um mehr über ein Produkt zu erfahren?","Yes. You can use the Contact page, select Products as the enquiry category and choose the product you are interested in.":"Ja. Wählen Sie auf der Kontaktseite die Anfragekategorie „Produkte“ und anschließend das gewünschte Produkt aus.","Can GenData Tech products connect with other systems?":"Können GenData-Tech-Produkte mit anderen Systemen verbunden werden?","Integration possibilities depend on the product requirement and the external system involved. APIs and connected services can be considered where technically suitable.":"Die Integrationsmöglichkeiten hängen vom Produkt und dem externen System ab. APIs und vernetzte Dienste können bei technischer Eignung berücksichtigt werden.","Can I request a product demonstration?":"Kann ich eine Produktdemonstration anfordern?","Yes. You can submit a product enquiry through the Contact page and mention that you would like to discuss or request a demonstration.":"Ja. Stellen Sie über die Kontaktseite eine Produktanfrage und geben Sie an, dass Sie eine Demonstration wünschen.","Explore Our Products":"Unsere Produkte entdecken","Core Capabilities":"Kernfunktionen","Enquire About Product":"Produkt anfragen","Product Thinking":"Produktphilosophie","Product Approach":"Unser Produktansatz","Product Ecosystem":"Produktökosystem","Different products. One technology direction.":"Verschiedene Produkte. Eine gemeinsame technologische Ausrichtung.","Learning":"Lernen","Customers":"Kunden","Operations":"Betrieb","Billing":"Abrechnung","Course Management":"Kursverwaltung","Learner Management":"Teilnehmerverwaltung","Training Content":"Schulungsinhalte","Learning Tracking":"Lernfortschritt","Customer Records":"Kundendaten","Lead Management":"Lead-Verwaltung","Follow-ups":"Nachfassaktionen","Interaction Tracking":"Interaktionsverfolgung","Business Records":"Unternehmensdaten","Workflow Management":"Workflow-Verwaltung","Centralized Data":"Zentrale Daten","Invoices":"Rechnungen","Billing Records":"Abrechnungsdaten","Customer Details":"Kundendetails","Transaction Management":"Transaktionsverwaltung"};

function Products() {
  const { lang } = useParams();
  const tr = (key) => lang === "de" ? (translationsDE[key] ?? key) : key;
  /* ======================================================
      HERO
  ====================================================== */

  const heroRef = useRef(null);
  const productsRef = useRef(null);

  const heroInView = useInView(heroRef, {
    margin: "-10% 0px -10% 0px",
    once: true,
  });

  const reduceMotion = useReducedMotion();

  const heroShouldAnimate = heroInView && !reduceMotion;

  /* ======================================================
      FAQ
  ====================================================== */

  const [openFaq, setOpenFaq] = useState(null);

  /* ======================================================
      PRODUCTS
  ====================================================== */

  const products = [
    {
      icon: FiBookOpen,
      name: "GenData LMS",
      shortName: "LMS",
      description:
        tr("A learning management platform designed to organize courses, learners, training content and learning activities in one connected system."),
      capabilities: [
        tr("Course Management"),
        tr("Learner Management"),
        tr("Training Content"),
        tr("Learning Tracking"),
      ],
      Link: "/contact?category=Products&offering=GenData%20LMS",
    },

    {
      icon: FiUsers,
      name: "GenData CRM",
      shortName: "CRM",
      description:
        tr("A customer relationship platform designed to organize customer information, interactions, follow-ups and business relationships."),
      capabilities: [
        tr("Customer Records"),
        tr("Lead Management"),
        tr("Follow-ups"),
        tr("Interaction Tracking"),
      ],
      Link: "/contact?category=Products&offering=GenData%20CRM",
    },

    {
      icon: FiGrid,
      name: "GenData ERP",
      shortName: "ERP",
      description:
        tr("A centralized business platform designed to connect operational information, workflows and management activities."),
      capabilities: [
        tr("Operations"),
        tr("Business Records"),
        tr("Workflow Management"),
        tr("Centralized Data"),
      ],
      Link: "/contact?category=Products&offering=GenData%20ERP",
    },

    {
      icon: FiCreditCard,
      name: "GenData Billing",
      shortName: "Billing",
      description:
        tr("A billing and business transaction platform designed to simplify invoice creation, records and billing-related workflows."),
      capabilities: [
        tr("Invoices"),
        tr("Billing Records"),
        tr("Customer Details"),
        tr("Transaction Management"),
      ],
      Link: "/contact?category=Products&offering=GenData%20Billing",
    },
  ];

  /* ======================================================
      PRODUCT PRINCIPLES
  ====================================================== */

  const principles = [
    {
      icon: FiTarget,
      title: tr("Built Around the Workflow"),
      description:
        tr("Products should support the process users actually need rather than adding unnecessary complexity."),
    },

    {
      icon: FiLayers,
      title: tr("Connected Information"),
      description:
        tr("Data, users and workflows are structured so important information can work together within one platform."),
    },

    {
      icon: FiZap,
      title: tr("Practical Experience"),
      description:
        tr("Interfaces and functionality are designed around useful everyday actions and clear user journeys."),
    },

    {
      icon: FiRepeat,
      title: tr("Designed to Evolve"),
      description:
        tr("Product architecture considers future features, integrations and changing operational requirements."),
    },
  ];

  /* ======================================================
      PRODUCT APPROACH
  ====================================================== */

  const approach = [
    {
      number: "01",
      title: tr("Understand"),
      description:
        tr("Understand the user, workflow and problem the product needs to support."),
    },

    {
      number: "02",
      title: tr("Structure"),
      description:
        tr("Define the modules, information flow and product architecture."),
    },

    {
      number: "03",
      title: tr("Design"),
      description:
        tr("Plan interfaces and user journeys around important actions."),
    },

    {
      number: "04",
      title: tr("Build"),
      description:
        tr("Develop the required product functionality and supporting systems."),
    },

    {
      number: "05",
      title: tr("Connect"),
      description: tr("Integrate data, APIs and other services where required."),
    },

    {
      number: "06",
      title: tr("Improve"),
      description:
        tr("Continue refining functionality as product requirements evolve."),
    },
  ];

  /* ======================================================
      FAQ
  ====================================================== */

  const faqs = [
    {
      question: tr("What products does GenData Tech provide?"),
      answer:
        "GenData Tech's product portfolio includes GenData LMS, GenData CRM, GenData ERP and GenData Billing.",
    },

    {
      question: tr("What is GenData LMS?"),
      answer:
        "GenData LMS is a learning management platform designed around course organization, learner management, training content and learning activities.",
    },

    {
      question: tr("What is GenData CRM?"),
      answer:
        "GenData CRM is designed to help organize customer information, leads, interactions and follow-up activities within one system.",
    },

    {
      question: tr("What is GenData ERP?"),
      answer:
        "GenData ERP is designed as a centralized platform for connecting business information, operational workflows and management activities.",
    },

    {
      question: tr("What is GenData Billing?"),
      answer:
        "GenData Billing is designed to support billing workflows including invoice creation, customer records and transaction-related information.",
    },

    {
      question: tr("Can I contact GenData Tech to learn more about a product?"),
      answer:
        "Yes. You can use the Contact page, select Products as the enquiry category and choose the product you are interested in.",
    },

    {
      question: tr("Can GenData Tech products connect with other systems?"),
      answer:
        "Integration possibilities depend on the product requirement and the external system involved. APIs and connected services can be considered where technically suitable.",
    },

    {
      question: tr("Can I request a product demonstration?"),
      answer:
        "Yes. You can submit a product enquiry through the Contact page and mention that you would like to discuss or request a demonstration.",
    },
  ];

  return (
    <>
      

      <main className="overflow-hidden bg-white">
        {/* ======================================================
            HERO
        ====================================================== */}

       <section
  ref={heroRef}
  className={`relative overflow-hidden bg-[#030b18] px-6 pt-32 ${lang === "de" ? "pb-[206px]" : "pb-[186px]"} sm:pt-36 sm:pb-[132px] lg:px-10 lg:pt-32 lg:pb-20`}
>
          {/* MAIN GLOW */}

          <motion.div
            className="pointer-events-none absolute left-1/3 top-0 h-[430px] w-[760px] -translate-x-1/2 rounded-full bg-[#002DCC]/15 blur-[160px]"
            animate={
              heroShouldAnimate
                ? {
                    opacity: [0.55, 0.9, 0.55],
                    scale: [1, 1.04, 1],
                  }
                : {
                    opacity: 0.65,
                    scale: 1,
                  }
            }
            transition={
              heroShouldAnimate
                ? {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {
                    duration: 0.2,
                  }
            }
          />

          {/* SECONDARY GLOW */}

          <motion.div
            className="pointer-events-none absolute -right-28 top-20 h-[320px] w-[320px] rounded-full bg-[#057CFA]/10 blur-[110px]"
            animate={
              heroShouldAnimate
                ? {
                    x: [0, -18, 0],
                    y: [0, 14, 0],
                    opacity: [0.4, 0.75, 0.4],
                  }
                : {
                    x: 0,
                    y: 0,
                    opacity: 0.5,
                  }
            }
            transition={
              heroShouldAnimate
                ? {
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {
                    duration: 0.2,
                  }
            }
          />

          {/* BACKGROUND GRID */}

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(5,124,250,0.35) 1px, transparent 1px),
                linear-gradient(90deg, rgba(5,124,250,0.35) 1px, transparent 1px)
              `,
              backgroundSize: "72px 72px",
            }}
          />

        <div className="relative mx-auto flex w-full max-w-[1400px] items-center py-6 sm:py-8 lg:min-h-[430px] lg:py-8">
            <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
              {/* HERO COPY */}

              <div className="min-w-0 w-full max-w-3xl text-left lg:max-w-none">
                <motion.p
                  initial={{
                    opacity: 1,
                    y: 12,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 1,
                          y: 12,
                        }
                  }
                  transition={{
                    duration: 0.5,
                  }}
                  className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-[#057CFA]"
                >
                  {tr("GenData Tech Products")}
                </motion.p>

                <motion.h1
                  initial={{
                    opacity: 1,
                    y: 20,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 1,
                          y: 20,
                        }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.08,
                  }}
                  className="mt-5 max-w-4xl font-heading text-[clamp(1.75rem,6.5vw,2.5rem)] break-words [overflow-wrap:anywhere] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
                >
                  {tr("Digital products built")}
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    {tr("around practical workflows.")}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{
                    opacity: 1,
                    y: 15,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 1,
                          y: 15,
                        }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.15,
                  }}
                  className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base"
                >
                  GenData Tech develops digital products that bring information,
                  users and workflows together through structured software
                  platforms.
                </motion.p>

                <motion.div
                  initial={{
                    opacity: 1,
                    y: 12,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 1,
                          y: 12,
                        }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.22,
                  }}
                  className="mt-6 flex flex-wrap justify-start gap-2"
                >
                  {["LMS", "CRM", "ERP", "Billing"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 font-body text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 1,
                    y: 12,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 1,
                          y: 12,
                        }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.28,
                  }}
                  className="mt-6 flex justify-start"
                >
                  <button
                    type="button"
                    aria-controls="products"
                    onClick={() =>
                      productsRef.current?.scrollIntoView({
                        behavior: reduceMotion ? "instant" : "smooth",
                        block: "start",
                      })
                    }
                    className="gd-hero-button gd-hero-button--primary group "
                  >
                    {tr("Explore Our Products")}
                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </div>

              {/* ==================================================
                  PRODUCT HERO VISUAL
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 1,
                  scale: 0.96,
                }}
                animate={
                  heroInView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        opacity: 1,
                        scale: 0.96,
                      }
                }
                transition={{
                  duration: 0.65,
                  delay: 0.15,
                }}
                className="relative mx-auto hidden h-[340px] w-full max-w-[430px] items-center justify-center lg:flex lg:justify-self-center"
              >
                <TechHeroSculpture variant="products" animate={heroShouldAnimate}/>
              </motion.div>)}
                  </div>
                  <div className="mt-3 flex items-center justify-between rounded-lg border border-cyan-500/15 bg-[#057CFA]/10 px-3 py-2"><span className="text-[10px] text-slate-300">Connected product ecosystem</span><motion.span className="h-2 w-2 rounded-full bg-cyan-400" animate={heroShouldAnimate?{opacity:[0.3,1,0.3]}:{opacity:1}} transition={{duration:2,repeat:heroShouldAnimate?Infinity:0}}/></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            PRODUCT INTRODUCTION
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {tr("Product Portfolio")}
                </p>

                <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  {tr("Software products for learning and business operations.")}
                </h2>
              </div>

              <div className="space-y-5">
                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  GenData Tech&apos;s product direction focuses on building
                  structured digital platforms for common learning and business
                  requirements.
                </p>

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Each product is designed around a clear operational area while
                  maintaining a consistent focus on usable interfaces, connected
                  information and practical workflows.
                </p>

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Our product portfolio includes learning management, customer
                  relationships, business operations and billing systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            PRODUCTS
        ====================================================== */}

        <section ref={productsRef} id="products" className="bg-[#F7F9FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                {tr("Our Products")}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {tr("A growing product ecosystem from GenData Tech.")}
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                Explore platforms designed around learning, customer management,
                business operations and billing workflows.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {products.map((product, index) => {
                const Icon = product.icon;

                return (
                  <motion.article
                    key={product.name}
                    initial={{
                      opacity: 1,
                      y: 22,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.07,
                    }}
                    className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#057CFA]/30 hover:shadow-[0_22px_55px_rgba(15,23,42,0.07)] sm:p-7"
                  >
                    {/* DECORATIVE GLOW */}

                    <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#057CFA]/5 blur-[60px]" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#002DCC] transition duration-300 group-hover:bg-[#057CFA] group-hover:text-white">
                          <Icon />
                        </div>

                        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
                          {product.shortName}
                        </span>
                      </div>

                      <h3 className="mt-7 font-heading text-2xl font-semibold tracking-[-0.025em] text-slate-950">
                        {product.name}
                      </h3>

                      <p className="mt-4 max-w-xl font-body text-sm leading-7 text-slate-500">
                        {product.description}
                      </p>

                      {/* CAPABILITIES */}

                      <div className="mt-6 border-t border-slate-100 pt-5">
                        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          {tr("Core Capabilities")}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.capabilities.map((capability) => (
                            <span
                              key={capability}
                              className="rounded-full bg-slate-50 px-3 py-1.5 font-body text-[10px] font-medium text-slate-500"
                            >
                              {capability}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Link
                        to={product.Link}
                        className="mt-7 inline-flex items-center gap-2 font-body text-xs font-semibold text-[#002DCC]"
                      >
                        {tr("Enquire About Product")}
                        <FiArrowRight className="transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================================================
            WHY OUR PRODUCTS
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {tr("Product Thinking")}
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  {tr("Products shaped around useful everyday workflows.")}
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  Our focus is not only on adding features. We think about how
                  users, information and actions work together across the
                  product.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {principles.map((principle, index) => {
                  const Icon = principle.icon;

                  return (
                    <motion.div
                      key={principle.title}
                      initial={{
                        opacity: 1,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.06,
                      }}
                      className="rounded-[22px] border border-slate-200 bg-[#F9FAFC] p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#002DCC]">
                          <Icon />
                        </div>

                        <div>
                          <h3 className="font-heading text-sm font-semibold text-slate-950">
                            {principle.title}
                          </h3>

                          <p className="mt-2 font-body text-xs leading-6 text-slate-500">
                            {principle.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            PRODUCT APPROACH
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[170px]" />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                {tr("Product Approach")}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                {tr("From user need to structured digital product.")}
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                Product development connects requirements, architecture, user
                experience and engineering through one continuous process.
              </p>
            </div>

            <div className="relative mt-14">
              <ProcessFlowGlow />

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
                {approach.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{
                      opacity: 1,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                    }}
                  >
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#057CFA]/30 bg-[#06152C] font-heading text-[10px] font-semibold text-[#057CFA]">
                      {step.number}
                    </div>

                    <h3 className="mt-5 font-heading text-sm font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 font-body text-xs leading-6 text-slate-200">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            CONNECTED PRODUCT ECOSYSTEM
        ====================================================== */}

        <section className="bg-[#F7F9FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {tr("Product Ecosystem")}
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  {tr("Different products. One technology direction.")}
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  Our product portfolio addresses different areas while
                  following a consistent approach to usable software, structured
                  data and connected workflows.
                </p>
              </div>

              <motion.div
                initial={{
                  opacity: 1,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      label: "Learning",
                      product: "GenData LMS",
                    },

                    {
                      label: "Customers",
                      product: "GenData CRM",
                    },

                    {
                      label: tr("Operations"),
                      product: "GenData ERP",
                    },

                    {
                      label: tr("Billing"),
                      product: "GenData Billing",
                    },
                  ].map((item) => (
                    <div
                      key={item.product}
                      className="rounded-2xl border border-slate-100 bg-[#F9FAFC] p-5"
                    >
                      <p className="font-body text-[12px] font-semibold uppercase tracking-[0.17em] text-[#057CFA]">
                        {item.label}
                      </p>

                      <p className="mt-2 font-heading text-sm font-semibold text-slate-950">
                        {item.product}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            FAQ
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                {tr("Frequently Asked Questions")}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {tr("Questions about GenData Tech products.")}
              </h2>

              <p className="mt-5 font-body text-sm leading-7 text-slate-500 sm:text-base">
                Learn more about our product portfolio and how to start a
                product enquiry.
              </p>
            </div>

            <div className="mt-12 grid items-start gap-x-10 lg:grid-cols-2">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={faq.question} className="border-b border-slate-200">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-heading text-sm font-semibold leading-6 text-slate-900 sm:text-base">
                        {faq.question}
                      </span>

                      <FiChevronDown
                        className={`shrink-0 text-slate-500 transition duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 1,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-6 font-body text-sm leading-7 text-slate-500">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================================================
            COMMON CTA
        ====================================================== */}

        <CommonCTA
          eyebrow="Explore GenData Tech Products"
          title="Looking for a product that fits your workflow?"
          description="Tell us which GenData Tech product you are interested in and we can discuss the right next step."
          buttonText="Product Enquiry"
          buttonLink="/contact"
        />
      </main>

      
    </>
  );
}

export default Products;
