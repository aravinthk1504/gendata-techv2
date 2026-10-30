"use client"

import { useParams } from "next/navigation";
import ProcessFlowGlow from "../../layout/ProcessFlowGlow"
import ServiceFlowVisual from "../../layout/ServiceFlowVisual"

import { useRef, useState } from "react"

import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "motion/react"

import {
  FiArrowRight,
  FiChevronDown,
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiLock,
  FiMonitor,
  FiRepeat,
  FiServer,
  FiTarget,
} from "react-icons/fi"

import Link from "../../layout/LocalizedLink"

const translationsDE = {"Service Overview":"Leistungsüberblick","What We Offer":"Unsere Leistungen","Use Cases":"Anwendungsfälle","Technology Stack":"Technologie-Stack","Development Process":"Entwicklungsprozess","Why GenData Tech":"Warum GenData Tech","Frequently Asked Questions":"Häufig gestellte Fragen","Requirement":"Anforderungen","Planning":"Planung","Architecture":"Architektur","Development":"Entwicklung","Integration":"Integration","Testing":"Tests","Deployment":"Bereitstellung","Delivery":"Auslieferung","Understand":"Verstehen","Design":"Konzeption","Build":"Entwicklung","Evaluate":"Evaluierung","Evaluation":"Bewertung","Training":"Training","Structure":"Struktur","Connect":"Verbinden","Improve":"Verbessern","Start a Project":"Projekt starten","Discuss Your Requirement":"Anforderung besprechen","AI / ML Development":"KI- und ML-Entwicklung","Full Stack Development":"Full-Stack-Entwicklung","Web Development":"Webentwicklung","Software Development":"Softwareentwicklung","App Development":"App-Entwicklung","IoT Solutions":"IoT-Lösungen","AI Automation":"KI-Automatisierung","Custom AI Solutions":"Individuelle KI-Lösungen","Machine Learning Solutions":"Lösungen für maschinelles Lernen","Model Design":"Modellkonzeption","Data Understanding":"Datenverständnis","AI Model Development":"KI-Modellentwicklung","Frontend Development":"Frontend-Entwicklung","Backend Development":"Backend-Entwicklung","API Development":"API-Entwicklung","Database Integration":"Datenbankintegration","Authentication & Security":"Authentifizierung und Sicherheit","Corporate Websites":"Unternehmenswebsites","Startup Websites":"Websites für Start-ups","Product Websites":"Produktwebsites","Responsive Development":"Responsive Entwicklung","Performance-focused Development":"Performanceorientierte Entwicklung","SEO-ready Structure":"SEO-gerechte Struktur","Custom Business Software":"Individuelle Unternehmenssoftware","Internal Tools":"Interne Tools","Management Systems":"Managementsysteme","Workflow Applications":"Workflow-Anwendungen","API & System Integration":"API- und Systemintegration","Software Modernization":"Softwaremodernisierung","Android App Development":"Android-App-Entwicklung","iOS App Development":"iOS-App-Entwicklung","Cross-platform Applications":"Plattformübergreifende Anwendungen","Backend & API Integration":"Backend- und API-Integration","Notifications & User Features":"Benachrichtigungen und Nutzerfunktionen","Business Mobile Apps":"Mobile Business-Apps","Sensor Monitoring":"Sensorüberwachung","Device Automation":"Geräteautomatisierung","Remote Monitoring":"Fernüberwachung","IoT Dashboards":"IoT-Dashboards","Alerts & Notifications":"Warnmeldungen und Benachrichtigungen","AI-enabled IoT":"KI-gestütztes IoT","Our Services":"Unsere Leistungen","Technology Services":"Technologiedienstleistungen","Product Portfolio":"Produktportfolio","Our Products":"Unsere Produkte","GenData Tech Products":"GenData Tech Produkte","Training Programs":"Schulungsprogramme","Learning Experience":"Lernerfahrung","Learning Process":"Lernprozess","Learning Approach":"Lernkonzept","Contact GenData Tech":"Kontakt zu GenData Tech","Quick Contact":"Direkter Kontakt","Start Your Enquiry":"Anfrage senden","Full Name *":"Vollständiger Name *","Email Address *":"E-Mail-Adresse *","Phone Number":"Telefonnummer","What are you interested in? *":"Wofür interessieren Sie sich? *","Select a category":"Kategorie auswählen","Other Enquiry":"Sonstige Anfrage","What are you looking for? *":"Was suchen Sie? *","Tell us about your requirement *":"Beschreiben Sie Ihr Anliegen *","Locations":"Standorte","Before You Get in Touch":"Bevor Sie Kontakt aufnehmen","Your Requirement":"Ihre Anforderung","The Problem":"Die Herausforderung","The Next Step":"Der nächste Schritt","Our Response Promise":"Unser Antwortversprechen","Within 24 hrs":"Innerhalb von 24 Std.","Response":"Antwort","Availability":"Erreichbarkeit","Insights":"Einblicke","Explore":"Entdecken","Learn":"Lernen","Students":"Studierende","Beginners":"Einsteiger","Skill Builders":"Weiterbildungsinteressierte","Data Science":"Data Science","Data Analytics":"Datenanalyse","IoT Development":"IoT-Entwicklung","Mobile App Development":"Mobile-App-Entwicklung","Python":"Python","Modern, responsive and interactive user interfaces designed for web applications, dashboards and digital platforms.":"Moderne, responsive und interaktive Benutzeroberflächen für Webanwendungen, Dashboards und digitale Plattformen.","Backend systems responsible for application logic, data processing, APIs, authentication and business workflows.":"Backend-Systeme für Anwendungslogik, Datenverarbeitung, APIs, Authentifizierung und Geschäftsprozesse.","REST APIs and backend integrations that connect frontend applications, databases and external services.":"REST-APIs und Backend-Integrationen zur Verbindung von Frontends, Datenbanken und externen Diensten.","Structured database integration for storing, managing and retrieving application data efficiently.":"Strukturierte Datenbankintegration zur effizienten Speicherung, Verwaltung und Abfrage von Anwendungsdaten.","User authentication, authorization and access-control systems designed around application requirements.":"Authentifizierung, Autorisierung und Zugriffskontrolle entsprechend den Anforderungen der Anwendung.","Business Platforms":"Unternehmensplattformen","Full-stack platforms including dashboards, management systems and custom business applications.":"Full-Stack-Plattformen mit Dashboards, Verwaltungssystemen und individuellen Geschäftsanwendungen.","Understand the users, application goals and required functionality.":"Nutzer, Anwendungsziele und benötigte Funktionen verstehen.","Plan the frontend, backend, database and application structure.":"Frontend, Backend, Datenbank und Anwendungsstruktur planen.","UI Development":"Oberflächenentwicklung","Build responsive interfaces and application interactions.":"Responsive Benutzeroberflächen und interaktive Funktionen entwickeln.","Develop APIs, business logic, authentication and data handling.":"APIs, Geschäftslogik, Authentifizierung und Datenverarbeitung entwickeln.","Connect frontend, backend, databases and external services.":"Frontend, Backend, Datenbanken und externe Dienste verbinden.","Validate functionality, usability and application behavior.":"Funktionalität, Benutzerfreundlichkeit und Anwendungsverhalten prüfen.","Prepare the application for production and real-world use.":"Die Anwendung für den Produktivbetrieb und den praktischen Einsatz vorbereiten.","Requirement-first Development":"Anforderungsorientierte Entwicklung","We start by understanding the application requirement before choosing the technical architecture.":"Wir analysieren zunächst die Anforderungen, bevor wir die technische Architektur festlegen.","Frontend + Backend":"Frontend und Backend","We approach the application as one connected system rather than separate frontend and backend components.":"Wir betrachten die Anwendung als zusammenhängendes System statt als getrennte Frontend- und Backend-Komponenten.","Custom Development":"Individuelle Entwicklung","Application functionality is designed around specific workflows, users and business requirements.":"Die Funktionen orientieren sich an konkreten Arbeitsabläufen, Nutzern und Geschäftsanforderungen.","Scalable Structure":"Skalierbare Architektur","We plan applications with maintainability, integration and future growth in mind.":"Wir planen Anwendungen mit Blick auf Wartbarkeit, Integrationen und zukünftiges Wachstum.","What is full stack development?":"Was bedeutet Full-Stack-Entwicklung?","Full stack development covers both the user-facing frontend and the backend systems that manage application logic, APIs, authentication, databases and integrations.":"Full-Stack-Entwicklung umfasst sowohl das sichtbare Frontend als auch Backend-Systeme für Anwendungslogik, APIs, Authentifizierung, Datenbanken und Integrationen.","What types of full stack applications can GenData Tech develop?":"Welche Full-Stack-Anwendungen entwickelt GenData Tech?","We can develop web applications, dashboards, business platforms, internal tools, management systems and custom applications based on project requirements.":"Wir entwickeln Webanwendungen, Dashboards, Unternehmensplattformen, interne Tools, Verwaltungssysteme und individuelle Anwendungen entsprechend den Projektanforderungen.","Which frontend technologies do you use?":"Welche Frontend-Technologien verwenden Sie?","For modern frontend development, we work with technologies such as React, JavaScript, HTML, CSS and Tailwind CSS depending on the application requirement.":"Je nach Anforderungen verwenden wir Technologien wie React, JavaScript, HTML, CSS und Tailwind CSS.","Which backend technologies do you use?":"Welche Backend-Technologien verwenden Sie?","Our backend development can use Python-based frameworks such as Flask, Django and FastAPI depending on the architecture and application requirements.":"Je nach Architektur und Anforderungen nutzen wir Python-basierte Frameworks wie Flask, Django und FastAPI.","Can you develop APIs for an application?":"Können Sie APIs für eine Anwendung entwickeln?","Yes. We can develop and integrate APIs that connect frontend applications, databases, external platforms and other backend services.":"Ja. Wir entwickeln und integrieren APIs zur Verbindung von Frontend-Anwendungen, Datenbanken, externen Plattformen und Backend-Diensten.","Can you add authentication and user roles?":"Können Sie Authentifizierung und Benutzerrollen integrieren?","Yes. Authentication, authorization and role-based access can be included depending on the application's user structure and security requirements.":"Ja. Abhängig von Nutzerstruktur und Sicherheitsanforderungen können wir Authentifizierung, Autorisierung und rollenbasierte Zugriffsrechte integrieren.","Can AI features be integrated into a full stack application?":"Können KI-Funktionen in Full-Stack-Anwendungen integriert werden?","Yes. AI models, automation or intelligent features can be integrated with a full stack application through APIs or backend services when required.":"Ja. KI-Modelle, Automatisierung und intelligente Funktionen können bei Bedarf über APIs oder Backend-Dienste integriert werden.","Can I discuss an application idea before the full requirement is finalized?":"Kann ich eine Anwendungsidee besprechen, bevor alle Anforderungen feststehen?","Yes. You can share the application idea, target users and expected outcome even if the complete specification has not yet been finalized.":"Ja. Sie können Ihre Idee, Zielgruppe und das gewünschte Ergebnis vorstellen, auch wenn noch keine vollständige Spezifikation vorliegt.","Build complete applications":"Vollständige Anwendungen entwickeln","from interface to backend.":"von der Oberfläche bis zum Backend.","Discuss Your Application":"Anwendung besprechen","Application Layer":"Anwendungsebene","Database":"Datenbank","One connected application from frontend to database.":"Eine durchgängige Anwendung vom Frontend bis zur Datenbank.","Complete application development capabilities.":"Umfassende Kompetenzen für die Anwendungsentwicklung.","Full stack solutions for real application requirements.":"Full-Stack-Lösungen für konkrete Anwendungsanforderungen.","Technologies for building complete applications.":"Technologien für die Entwicklung vollständiger Anwendungen.","From requirement to complete application.":"Von der Anforderung zur fertigen Anwendung.","Full stack development with connected engineering.":"Full-Stack-Entwicklung mit integrierten Technologien.","Questions about full stack development.":"Fragen zur Full-Stack-Entwicklung.","Build a Full Stack Application":"Full-Stack-Anwendung entwickeln","Have an application idea or platform requirement?":"Sie haben eine Anwendungsidee oder benötigen eine Plattform?"};

function FullStackDevelopment() {
  const { lang } = useParams();
  const tr = (key) => lang === "de" ? (translationsDE[key] ?? key) : key;
  /* ======================================================
      HERO
  ====================================================== */

  const heroRef = useRef(null)

  const heroInView = useInView(heroRef, {
    margin: "-10% 0px -10% 0px",
  })

  const reduceMotion = useReducedMotion()

  const heroShouldAnimate =
    heroInView && !reduceMotion


  /* ======================================================
      FAQ
  ====================================================== */

  const [openFaq, setOpenFaq] = useState(null)


  /* ======================================================
      WHAT WE OFFER
  ====================================================== */

  const offerings = [
    {
      number: "01",
      title: tr("Frontend Development"),
      description: tr("Modern, responsive and interactive user interfaces designed for web applications, dashboards and digital platforms."),
    },

    {
      number: "02",
      title: tr("Backend Development"),
      description: tr("Backend systems responsible for application logic, data processing, APIs, authentication and business workflows."),
    },

    {
      number: "03",
      title: tr("API Development"),
      description: tr("REST APIs and backend integrations that connect frontend applications, databases and external services."),
    },

    {
      number: "04",
      title: tr("Database Integration"),
      description: tr("Structured database integration for storing, managing and retrieving application data efficiently."),
    },

    {
      number: "05",
      title: tr("Authentication & Security"),
      description: tr("User authentication, authorization and access-control systems designed around application requirements."),
    },

    {
      number: "06",
      title: tr("Business Platforms"),
      description:
        tr("Full-stack platforms including dashboards, management systems and custom business applications."),
    },
  ]


  /* ======================================================
      TECHNOLOGY STACK
  ====================================================== */

  const technologyStack = [
    {
      icon: FiMonitor,
      category: "Frontend",
      technologies: [
        "React",
        "JavaScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
      ],
    },

    {
      icon: FiServer,
      category: "Backend",
      technologies: [
        tr("Python"),
        "Flask",
        "Django",
        "FastAPI",
      ],
    },

    {
      icon: FiDatabase,
      category: "Databases",
      technologies: [
        "MySQL",
        "PostgreSQL",
        "SQLite",
      ],
    },

    {
      icon: FiLayers,
      category: "API & Integration",
      technologies: [
        "REST APIs",
        "JSON",
        "Third-party APIs",
      ],
    },

    {
      icon: FiLock,
      category: "Authentication",
      technologies: [
        "Session Authentication",
        "JWT",
        "Role-based Access",
      ],
    },

    {
      icon: FiGitBranch,
      category: "Development Tools",
      technologies: [
        "Git",
        "GitHub",
        "Vite",
        "Docker",
      ],
    },
  ]


  /* ======================================================
      DEVELOPMENT PROCESS
  ====================================================== */

  const process = [
    {
      number: "01",
      title: tr("Requirement"),
      description:
        tr("Understand the users, application goals and required functionality."),
    },

    {
      number: "02",
      title: tr("Architecture"),
      description:
        tr("Plan the frontend, backend, database and application structure."),
    },

    {
      number: "03",
      title: tr("UI Development"),
      description:
        tr("Build responsive interfaces and application interactions."),
    },

    {
      number: "04",
      title: tr("Backend Development"),
      description:
        tr("Develop APIs, business logic, authentication and data handling."),
    },

    {
      number: "05",
      title: tr("Integration"),
      description:
        tr("Connect frontend, backend, databases and external services."),
    },

    {
      number: "06",
      title: tr("Testing"),
      description:
        tr("Validate functionality, usability and application behavior."),
    },

    {
      number: "07",
      title: tr("Deployment"),
      description:
        tr("Prepare the application for production and real-world use."),
    },
  ]


  /* ======================================================
      WHY GENDATA TECH
  ====================================================== */

  const reasons = [
    {
      icon: FiTarget,
      title: tr("Requirement-first Development"),
      description:
        tr("We start by understanding the application requirement before choosing the technical architecture."),
    },

    {
      icon: FiLayers,
      title: tr("Frontend + Backend"),
      description:
        tr("We approach the application as one connected system rather than separate frontend and backend components."),
    },

    {
      icon: FiCode,
      title: tr("Custom Development"),
      description:
        tr("Application functionality is designed around specific workflows, users and business requirements."),
    },

    {
      icon: FiRepeat,
      title: tr("Scalable Structure"),
      description:
        tr("We plan applications with maintainability, integration and future growth in mind."),
    },
  ]


  /* ======================================================
      FAQ
  ====================================================== */

  const faqs = [
    {
      question:
        tr("What is full stack development?"),
      answer:
        tr("Full stack development covers both the user-facing frontend and the backend systems that manage application logic, APIs, authentication, databases and integrations."),
    },

    {
      question:
        tr("What types of full stack applications can GenData Tech develop?"),
      answer:
        tr("We can develop web applications, dashboards, business platforms, internal tools, management systems and custom applications based on project requirements."),
    },

    {
      question:
        tr("Which frontend technologies do you use?"),
      answer:
        tr("For modern frontend development, we work with technologies such as React, JavaScript, HTML, CSS and Tailwind CSS depending on the application requirement."),
    },

    {
      question:
        tr("Which backend technologies do you use?"),
      answer:
        tr("Our backend development can use Python-based frameworks such as Flask, Django and FastAPI depending on the architecture and application requirements."),
    },

    {
      question:
        tr("Can you develop APIs for an application?"),
      answer:
        tr("Yes. We can develop and integrate APIs that connect frontend applications, databases, external platforms and other backend services."),
    },

    {
      question:
        tr("Can you add authentication and user roles?"),
      answer:
        tr("Yes. Authentication, authorization and role-based access can be included depending on the application's user structure and security requirements."),
    },

    {
      question:
        tr("Can AI features be integrated into a full stack application?"),
      answer:
        tr("Yes. AI models, automation or intelligent features can be integrated with a full stack application through APIs or backend services when required."),
    },

    {
      question:
        tr("Can I discuss an application idea before the full requirement is finalized?"),
      answer:
        tr("Yes. You can share the application idea, target users and expected outcome even if the complete specification has not yet been finalized."),
    },
  ]


  return (
    <>
      

      <main className="overflow-hidden bg-white">

        {/* ======================================================
            HERO
        ====================================================== */}

        <section
          ref={heroRef}
          className="relative overflow-hidden bg-[#030b18] px-6 pb-20 pt-32 sm:pb-24 sm:pt-36 lg:px-10 lg:pb-20 lg:pt-32"
        >

          {/* MAIN GLOW */}

          <motion.div
            className="pointer-events-none absolute left-1/3 top-0 h-[520px] w-[850px] -translate-x-1/2 rounded-full bg-[#002DCC]/15 blur-[170px]"
            animate={
              heroShouldAnimate
                ? {
                    opacity: [0.55, 0.95, 0.55],
                    scale: [1, 1.05, 1],
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
            className="pointer-events-none absolute -right-32 top-24 h-[380px] w-[380px] rounded-full bg-[#057CFA]/10 blur-[120px]"
            animate={
              heroShouldAnimate
                ? {
                    x: [0, -22, 0],
                    y: [0, 18, 0],
                    opacity: [0.4, 0.8, 0.4],
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


          {/* GRID */}

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


          <div className="relative mx-auto max-w-[1400px]">

            <div className="grid min-w-0 min-h-[530px] items-center gap-10 sm:min-h-[530px] sm:gap-12 lg:min-h-[420px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-10" >

              {/* HERO COPY */}

              <div>

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
                    duration: 0.5,
                  }}
                  className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-[#057CFA]"
                >
                  {tr("Full Stack Development")}
                </motion.p>


                <motion.h1
                  initial={{
                    opacity: 1,
                    y: 25,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 1,
                          y: 25,
                        }
                  }
                  transition={{
                    duration: 0.65,
                    delay: 0.08,
                  }}
                  className="mt-5 max-w-4xl font-heading text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
                >
                  {tr("Build complete applications")}

                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    {tr("from interface to backend.")}
                  </span>
                </motion.h1>


                <motion.p
                  initial={{
                    opacity: 1,
                    y: 18,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 1,
                          y: 18,
                        }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.16,
                  }}
                  className="mt-7 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base sm:leading-8 lg:mt-5"
                >
                  GenData Tech develops full-stack applications that
                  connect modern user interfaces with backend systems,
                  databases, APIs and application logic.
                </motion.p>


                <motion.div
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
                    duration: 0.6,
                    delay: 0.3,
                  }}
                  className="mt-6"
                >

                  <Link
                    to="/contact"
                    className="gd-hero-button gd-hero-button--primary group "
                  >
                    {tr("Discuss Your Application")}

                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </Link>

                </motion.div>


                <motion.div
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
                    duration: 0.6,
                    delay: 0.24,
                  }}
                  className="mt-6 flex flex-wrap gap-2.5 lg:mt-5"
                >

                  {[
                    "Frontend",
                    "Backend",
                    "APIs",
                    "Databases",
                  ].map((item) => (

                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-200"
                    >
                      {item}
                    </span>

                  ))}

                </motion.div>

              </div>



              {/* ==================================================
                  HERO VISUAL
              ================================================== */}

              <div className="relative mx-auto hidden h-[340px] w-full max-w-[430px] items-center justify-center lg:flex lg:justify-self-center">
                <ServiceFlowVisual variant="fullstack" active={heroShouldAnimate}/>
              </div>

            </div>

          </div>

        </section>



        {/* ======================================================
            SERVICE OVERVIEW
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-[1400px]">

            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">

              <div>

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {tr("Service Overview")}
                </p>


                <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  {tr("One connected application from frontend to database.")}
                </h2>

              </div>


              <div className="space-y-5">

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Full stack development brings together the interface
                  users interact with and the backend systems that
                  manage data, application logic and integrations.
                </p>


                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  GenData Tech develops full-stack applications around
                  specific business requirements, user workflows and
                  operational needs.
                </p>


                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Our approach connects frontend development, backend
                  services, APIs and databases into one structured
                  application architecture.
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* ======================================================
            WHAT WE OFFER
        ====================================================== */}

        <section className="bg-[#F7F9FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-[1400px]">

            <div className="max-w-3xl">

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                {tr("What We Offer")}
              </p>


              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {tr("Complete application development capabilities.")}
              </h2>


              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                From interface development to backend logic and data
                management, we connect the layers required to build
                functional web applications.
              </p>

            </div>


            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {offerings.map((item, index) => (

                <motion.div
                  key={item.number}
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
                  className="rounded-[24px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#057CFA]/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
                >

                  <span className="font-heading text-[10px] font-semibold text-[#057CFA]">
                    {item.number}
                  </span>


                  <h3 className="mt-5 font-heading text-lg font-semibold text-slate-950">
                    {item.title}
                  </h3>


                  <p className="mt-3 font-body text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>

                </motion.div>

              ))}

            </div>

          </div>

        </section>



        {/* ======================================================
            USE CASES / SOLUTIONS

            Enable later when approved real project examples
            or use-case content is available.
        ====================================================== */}

        {/*
        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-[1400px]">

            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
              {tr("Use Cases")}
            </p>

            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              {tr("Full stack solutions for real application requirements.")}
            </h2>

          </div>

        </section>
        */}



        {/* ======================================================
            TECHNOLOGY STACK
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-[1400px]">

            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">

              <div>

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {tr("Technology Stack")}
                </p>


                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  {tr("Technologies for building complete applications.")}
                </h2>


                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  The exact technology stack depends on the
                  application architecture, functionality,
                  integration requirements and deployment needs.
                </p>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                {technologyStack.map((stack, index) => {

                  const Icon = stack.icon

                  return (

                    <motion.div
                      key={stack.category}
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
                        delay: index * 0.05,
                      }}
                      className="rounded-[22px] border border-slate-200 bg-[#F9FAFC] p-5"
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#002DCC]">
                          <Icon />
                        </div>


                        <h3 className="font-heading text-sm font-semibold text-slate-950">
                          {stack.category}
                        </h3>

                      </div>


                      <div className="mt-5 flex flex-wrap gap-2">

                        {stack.technologies.map((technology) => (

                          <span
                            key={technology}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-body text-[10px] font-medium text-slate-600"
                          >
                            {technology}
                          </span>

                        ))}

                      </div>

                    </motion.div>

                  )

                })}

              </div>

            </div>

          </div>

        </section>



        {/* ======================================================
            DEVELOPMENT PROCESS
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[170px]" />


          <div className="relative mx-auto max-w-[1400px]">

            <div className="max-w-3xl">

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                {tr("Development Process")}
              </p>


              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                {tr("From requirement to complete application.")}
              </h2>


              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                Full stack development connects interface design,
                backend development, data management and integration
                through one structured process.
              </p>

            </div>


            <div className="relative mt-14">

              <ProcessFlowGlow breakpoint="xl" columns={7} />


              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">

                {process.map((step, index) => (

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
                      delay: index * 0.05,
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
            WHY GENDATA TECH
        ====================================================== */}

        <section className="bg-[#F7F9FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-[1400px]">

            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">

              <div>

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {tr("Why GenData Tech")}
                </p>


                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  {tr("Full stack development with connected engineering.")}
                </h2>


                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  We approach the frontend, backend and data layers
                  as parts of one complete application architecture.
                </p>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                {reasons.map((reason, index) => {

                  const Icon = reason.icon

                  return (

                    <motion.div
                      key={reason.title}
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
                      className="rounded-[22px] border border-slate-200 bg-white p-5"
                    >

                      <div className="flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#002DCC]">
                          <Icon />
                        </div>


                        <div>

                          <h3 className="font-heading text-sm font-semibold text-slate-950">
                            {reason.title}
                          </h3>


                          <p className="mt-2 font-body text-xs leading-6 text-slate-500">
                            {reason.description}
                          </p>

                        </div>

                      </div>

                    </motion.div>

                  )

                })}

              </div>

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
                {tr("Questions about full stack development.")}
              </h2>


              <p className="mt-5 font-body text-sm leading-7 text-slate-500 sm:text-base">
                Common questions about frontend, backend,
                application development and system integration.
              </p>

            </div>


            <div className="mt-12 grid items-start gap-x-10 lg:grid-cols-2">

              {faqs.map((faq, index) => {

                const isOpen =
                  openFaq === index

                return (

                  <div
                    key={faq.question}
                    className="border-b border-slate-200"
                  >

                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(
                          isOpen
                            ? null
                            : index
                        )
                      }
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >

                      <span className="font-heading text-sm font-semibold leading-6 text-slate-900 sm:text-base">
                        {faq.question}
                      </span>


                      <FiChevronDown
                        className={`shrink-0 text-slate-500 transition duration-300 ${
                          isOpen
                            ? "rotate-180"
                            : ""
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

                )

              })}

            </div>

          </div>

        </section>



        {/* ======================================================
            FINAL CTA
        ====================================================== */}

        <section className="bg-[#030b18] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-[1400px]">

            <motion.div
              initial={{
                opacity: 1,
                y: 25,
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
              className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-12"
            >

              <div className="pointer-events-none absolute -right-24 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#057CFA]/10 blur-[110px]" />


              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <p className="font-body text-[12px] font-semibold uppercase tracking-[0.24em] text-[#057CFA]">
                    {tr("Build a Full Stack Application")}
                  </p>


                  <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    {tr("Have an application idea or platform requirement?")}
                  </h2>


                  <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                    Share your idea, users and required functionality.
                    We can discuss the most suitable application
                    architecture and development direction.
                  </p>

                </div>


                <Link
                  to="/contact"
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                >
                  {tr("Discuss Your Application")}

                  <FiArrowRight className="transition group-hover:translate-x-1" />
                </Link>

              </div>

            </motion.div>

          </div>

        </section>

      </main>

      
    </>
  )
}


export default FullStackDevelopment