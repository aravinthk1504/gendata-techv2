"use client"

import { useParams } from "next/navigation";
import ProcessFlowGlow from "../layout/ProcessFlowGlow"

import { useRef, useState } from "react";

import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "motion/react";

import {
  FiArrowRight,
  FiChevronDown,
  FiCode,
  FiCpu,
  FiLayers,
  FiMonitor,
  FiRepeat,
  FiSmartphone,
  FiTarget,
  FiZap,
} from "react-icons/fi";

import Link from "../layout/LocalizedLink"
import InfinityVisual from "../../sections/home/InfinityVisual"

const translationsDE = {"Service Overview":"Leistungsüberblick","What We Offer":"Unsere Leistungen","Use Cases":"Anwendungsfälle","Technology Stack":"Technologie-Stack","Development Process":"Entwicklungsprozess","Why GenData Tech":"Warum GenData Tech","Frequently Asked Questions":"Häufig gestellte Fragen","Requirement":"Anforderungen","Planning":"Planung","Architecture":"Architektur","Development":"Entwicklung","Integration":"Integration","Testing":"Testen","Deployment":"Bereitstellung","Delivery":"Auslieferung","Understand":"Verstehen","Design":"Konzeption","Build":"Entwickeln","Evaluate":"Evaluierung","Evaluation":"Evaluierung","Training":"Training","Structure":"Struktur","Connect":"Verbinden","Improve":"Verbessern","Start a Project":"Projekt starten","Discuss Your Requirement":"Anforderung besprechen","AI / ML Development":"KI- und ML-Entwicklung","Full Stack Development":"Full-Stack-Entwicklung","Web Development":"Webentwicklung","Software Development":"Softwareentwicklung","App Development":"App-Entwicklung","IoT Solutions":"IoT-Lösungen","AI Automation":"KI-Automatisierung","Custom AI Solutions":"Individuelle KI-Lösungen","Machine Learning Solutions":"Lösungen für maschinelles Lernen","Model Design":"Modellkonzeption","Data Understanding":"Datenverständnis","AI Model Development":"KI-Modellentwicklung","Frontend Development":"Frontend-Entwicklung","Backend Development":"Backend-Entwicklung","API Development":"API-Entwicklung","Database Integration":"Datenbankintegration","Authentication & Security":"Authentifizierung und Sicherheit","Corporate Websites":"Unternehmenswebsites","Startup Websites":"Websites für Start-ups","Product Websites":"Produktwebsites","Responsive Development":"Responsive Entwicklung","Performance-focused Development":"Performanceorientierte Entwicklung","SEO-ready Structure":"SEO-gerechte Struktur","Custom Business Software":"Individuelle Unternehmenssoftware","Internal Tools":"Interne Tools","Management Systems":"Managementsysteme","Workflow Applications":"Workflow-Anwendungen","API & System Integration":"API- und Systemintegration","Software Modernization":"Softwaremodernisierung","Android App Development":"Android-App-Entwicklung","iOS App Development":"iOS-App-Entwicklung","Cross-platform Applications":"Plattformübergreifende Anwendungen","Backend & API Integration":"Backend- und API-Integration","Notifications & User Features":"Benachrichtigungen und Nutzerfunktionen","Business Mobile Apps":"Mobile Business-Apps","Sensor Monitoring":"Sensorüberwachung","Device Automation":"Geräteautomatisierung","Remote Monitoring":"Fernüberwachung","IoT Dashboards":"IoT-Dashboards","Alerts & Notifications":"Warnmeldungen und Benachrichtigungen","AI-enabled IoT":"KI-gestütztes IoT","Our Services":"Unsere Leistungen","Technology Services":"Technologiedienstleistungen","Product Portfolio":"Produktportfolio","Our Products":"Unsere Produkte","GenData Tech Products":"GenData Tech Produkte","Training Programs":"Schulungsprogramme","Learning Experience":"Lernerfahrung","Learning Process":"Lernprozess","Learning Approach":"Lernkonzept","Contact GenData Tech":"Kontakt zu GenData Tech","Quick Contact":"Direkter Kontakt","Start Your Enquiry":"Anfrage senden","Full Name *":"Vollständiger Name *","Email Address *":"E-Mail-Adresse *","Phone Number":"Telefonnummer","What are you interested in? *":"Wofür interessieren Sie sich? *","Select a category":"Kategorie auswählen","Other Enquiry":"Sonstige Anfrage","What are you looking for? *":"Was suchen Sie? *","Tell us about your requirement *":"Beschreiben Sie Ihr Anliegen *","Locations":"Standorte","Before You Get in Touch":"Bevor Sie Kontakt aufnehmen","Your Requirement":"Ihre Anforderung","The Problem":"Die Herausforderung","The Next Step":"Der nächste Schritt","Our Response Promise":"Unser Antwortversprechen","Within 24 hrs":"Innerhalb von 24 Std.","Response":"Antwort","Availability":"Erreichbarkeit","Insights":"Einblicke","Explore":"Entdecken","Learn":"Lernen","Students":"Studierende","Beginners":"Einsteiger","Skill Builders":"Weiterbildungsinteressierte","Data Science":"Data Science","Data Analytics":"Datenanalyse","IoT Development":"IoT-Entwicklung","Mobile App Development":"Mobile-App-Entwicklung","Python":"Python","AI-focused services built around":"KI-orientierte Leistungen für","real business problems.":"reale Geschäftsanforderungen.","One technology partner. Multiple engineering capabilities.":"Ein Technologiepartner. Viele Kompetenzen.","Our services combine AI with software, applications and connected systems to turn ideas and business requirements into practical working technology.":"Unsere Leistungen verbinden KI mit Software, Anwendungen und vernetzten Systemen, um Ideen und geschäftliche Anforderungen in praxistaugliche Technologien umzusetzen.","Technology should create a useful outcome.":"Technologie soll echten Mehrwert schaffen.","A clear path from requirement to delivery.":"Von der Anforderung bis zur Umsetzung.","Built around intelligence, engineering and practical thinking.":"KI, Engineering und praxisorientiertes Denken.","Questions about our technology services.":"Antworten zu unseren Technologiedienstleistungen.","Not Sure What You Need?":"Sie sind noch unsicher?","How We Help":"So unterstützen wir Sie","Custom AI models, machine learning solutions, intelligent automation and Agentic AI systems designed around real business requirements.":"Individuelle KI-Modelle, maschinelles Lernen, intelligente Automatisierung und agentenbasierte KI für konkrete Unternehmensanforderungen.","Complete application development covering frontend, backend, databases, APIs and system integration.":"Ganzheitliche Anwendungsentwicklung mit Frontend, Backend, Datenbanken, APIs und Systemintegration.","Modern, responsive and performance-focused websites designed for companies, startups, products and digital brands.":"Moderne, responsive und leistungsstarke Websites für Unternehmen, Start-ups, Produkte und digitale Marken.","Custom software systems designed around business processes, internal operations and digital workflows.":"Individuelle Softwaresysteme für Geschäftsprozesse, interne Abläufe und digitale Workflows.","Mobile applications designed around practical functionality, modern user experiences and connected services.":"Mobile Anwendungen mit praxisnahen Funktionen, moderner Nutzererfahrung und vernetzten Diensten.","Connected IoT systems combining sensors, devices, monitoring, automation and intelligent software.":"Vernetzte IoT-Systeme mit Sensoren, Geräten, Überwachung, Automatisierung und intelligenter Software.","Automate Repetitive Processes":"Wiederkehrende Prozesse automatisieren","Reduce manual effort through intelligent workflows and connected automation systems.":"Manuellen Aufwand durch intelligente Workflows und vernetzte Automatisierung reduzieren.","Build Intelligent Products":"Intelligente Produkte entwickeln","Add AI capabilities to software products, digital platforms and applications.":"Softwareprodukte, digitale Plattformen und Anwendungen um KI-Funktionen erweitern.","Modernize Workflows":"Arbeitsabläufe modernisieren","Transform fragmented manual processes into connected digital systems.":"Fragmentierte manuelle Abläufe in vernetzte digitale Systeme umwandeln.","Create Scalable Applications":"Skalierbare Anwendungen entwickeln","Build applications designed to evolve as users, requirements and operations grow.":"Anwendungen entwickeln, die mit Nutzern, Anforderungen und Abläufen wachsen.","Connect Devices & Software":"Geräte und Software verbinden","Bring sensors, IoT devices, monitoring platforms and software together.":"Sensoren, IoT-Geräte, Überwachungsplattformen und Software miteinander verbinden.","Turn Ideas Into Solutions":"Ideen in Lösungen verwandeln","Move from an early concept or requirement into a practical working product.":"Aus einer ersten Idee oder Anforderung ein praxistaugliches Produkt entwickeln.","Understand the problem, users and expected outcome.":"Problem, Nutzer und gewünschtes Ergebnis verstehen.","Define the right technical direction and architecture.":"Die passende technische Ausrichtung und Architektur festlegen.","Develop the solution using suitable technologies.":"Die Lösung mit geeigneten Technologien entwickeln.","Connect platforms, APIs, services and required workflows.":"Plattformen, APIs, Dienste und benötigte Arbeitsabläufe verbinden.","Validate functionality, usability and technical behavior.":"Funktionalität, Benutzerfreundlichkeit und technisches Verhalten prüfen.","Prepare the solution for deployment and real-world use.":"Die Lösung für Bereitstellung und Praxiseinsatz vorbereiten.","AI-focused Thinking":"KI-orientiertes Denken","Artificial intelligence remains at the center of our technology direction.":"Künstliche Intelligenz steht im Mittelpunkt unserer technologischen Ausrichtung.","Problem-led Solutions":"Problemorientierte Lösungen","We start with the actual requirement before deciding which technologies to use.":"Wir beginnen mit der tatsächlichen Anforderung, bevor wir Technologien auswählen.","AI + Engineering":"KI und Engineering","We combine intelligent systems with web, software, mobile and IoT engineering.":"Wir verbinden intelligente Systeme mit Web-, Software-, App- und IoT-Entwicklung.","Custom Development":"Individuelle Entwicklung","Solutions are designed around specific workflows, users and technical needs.":"Lösungen richten sich nach konkreten Arbeitsabläufen, Nutzern und technischen Anforderungen.","Scalable Direction":"Skalierbare Ausrichtung","We consider maintainability and future growth while designing technical systems.":"Bei der Entwicklung berücksichtigen wir Wartbarkeit und zukünftiges Wachstum.","Direct Communication":"Direkte Kommunikation","Clear communication keeps requirements, expectations and technical direction aligned.":"Klare Kommunikation stimmt Anforderungen, Erwartungen und technische Ausrichtung aufeinander ab.","Deep Learning":"Deep Learning","Interface":"Benutzeroberfläche","Optimization":"Optimierung","System Design":"Systemplanung","Device Setup":"Geräteeinrichtung","Programming":"Programmierung","Practice":"Üben","Review":"Überprüfen","Apply":"Anwenden","Plan":"Planen","What You'll Learn":"Das lernen Sie","Tools & Technologies":"Tools und Technologien","Learning Outcome":"Lernergebnis","General Enquiry":"Allgemeine Anfrage","Partnership":"Partnerschaft","Business Enquiry":"Geschäftsanfrage","Other":"Sonstiges","Schedule a Call":"Gespräch vereinbaren","Integrate":"Integrieren","Test":"Testen","Deliver":"Bereitstellen","How AI Automation Can Improve Business Workflows":"Wie KI-Automatisierung Geschäftsabläufe verbessern kann","Explore how intelligent automation can reduce repetitive work, improve process efficiency and connect business operations.":"Erfahren Sie, wie intelligente Automatisierung wiederkehrende Aufgaben reduziert, Prozesse effizienter gestaltet und Geschäftsabläufe vernetzt.","When Should a Business Choose a Custom AI Solution?":"Wann lohnt sich eine individuelle KI-Lösung für Unternehmen?","Understand when a custom AI or machine learning solution may be more suitable than a generic software tool.":"Erfahren Sie, wann eine individuelle KI- oder Machine-Learning-Lösung besser geeignet ist als eine Standardsoftware.","Web Application vs Custom Software: What Should You Build?":"Webanwendung oder individuelle Software: Was passt zu Ihrem Vorhaben?","A practical overview of the differences between web applications and custom software systems when planning a digital product.":"Ein praxisnaher Überblick über die Unterschiede zwischen Webanwendungen und individueller Software bei der Planung digitaler Produkte.","What technology services does GenData Tech provide?":"Welche Technologiedienstleistungen bietet GenData Tech an?","GenData Tech provides AI and machine learning development, full stack development, web development, software development, mobile app development and IoT solutions.":"GenData Tech bietet KI- und Machine-Learning-Entwicklung, Full-Stack-Entwicklung, Webentwicklung, Softwareentwicklung, App-Entwicklung und IoT-Lösungen an.","Do you build custom AI and machine learning solutions?":"Entwickeln Sie individuelle KI- und Machine-Learning-Lösungen?","Yes. We build AI and machine learning solutions around specific requirements, including predictive models, classification systems, intelligent automation, Agentic AI and custom AI applications.":"Ja. Wir entwickeln maßgeschneiderte KI- und Machine-Learning-Lösungen, darunter Prognosemodelle, Klassifikationssysteme, intelligente Automatisierung, Agentic AI und individuelle KI-Anwendungen.","Can you develop both websites and full web applications?":"Entwickeln Sie sowohl Websites als auch vollständige Webanwendungen?","Yes. We develop corporate and startup websites as well as full web applications that may include frontend interfaces, backend systems, APIs, authentication and databases.":"Ja. Wir entwickeln Websites für Unternehmen und Start-ups sowie vollständige Webanwendungen mit Frontend, Backend, APIs, Authentifizierung und Datenbanken.","Do you provide Android and iOS app development?":"Bieten Sie App-Entwicklung für Android und iOS an?","Yes. We provide mobile application development for business and product requirements, including applications that connect with backend services and APIs.":"Ja. Wir entwickeln mobile Anwendungen für Unternehmen und Produkte, einschließlich Anbindungen an Backend-Dienste und APIs.","Can AI be integrated into an existing software system?":"Lässt sich KI in bestehende Softwaresysteme integrieren?","Yes. AI capabilities can be integrated into existing applications or workflows when the current architecture and technical requirements support the integration.":"Ja. KI-Funktionen lassen sich in bestehende Anwendungen und Arbeitsabläufe integrieren, sofern Architektur und technische Voraussetzungen dies ermöglichen.","Does GenData Tech provide IoT development?":"Bietet GenData Tech IoT-Entwicklung an?","Yes. Our IoT solutions can combine sensors, connected devices, monitoring systems, automation and software platforms for practical real-world applications.":"Ja. Unsere IoT-Lösungen verbinden Sensoren, Geräte, Überwachung, Automatisierung und Softwareplattformen für praktische Anwendungen.","How do you choose the right technology for a project?":"Wie wählen Sie die passende Technologie für ein Projekt aus?","We begin by understanding the problem, users, expected outcome and technical requirements. The technology stack is selected based on what best fits the project rather than using the same stack for every solution.":"Zunächst analysieren wir Problemstellung, Nutzer, gewünschtes Ergebnis und technische Anforderungen. Anschließend wählen wir die Technologien passend zum jeweiligen Projekt aus.","Can I contact GenData Tech if I am not sure which service I need?":"Kann ich GenData Tech kontaktieren, wenn ich noch nicht weiß, welche Leistung ich benötige?","Yes. You can share the problem or idea without knowing the exact technology. We can review the requirement and help identify an appropriate technical direction.":"Ja. Beschreiben Sie uns Ihre Idee oder Herausforderung. Wir prüfen Ihre Anforderungen und unterstützen Sie bei der Wahl einer geeigneten technischen Lösung.","Capabilities":"Kompetenzen","Explore Service":"Leistung entdecken","Our Service Approach":"Unser Vorgehen","Ideas and perspectives around modern technology.":"Ideen und Perspektiven zu modernen Technologien.","Read Insight":"Beitrag lesen"};

function Services() {
  const { lang } = useParams();
  const tr = (key) => lang === "de" ? (translationsDE[key] ?? key) : key;
  /* ======================================================
      HERO ANIMATION
  ====================================================== */

  const heroRef = useRef(null);

  const heroInView = useInView(heroRef, {
    margin: "-10% 0px -10% 0px",
    once: true,
  });

  const reduceMotion = useReducedMotion();

  const heroShouldAnimate = heroInView && !reduceMotion;

  const [openFaq, setOpenFaq] = useState(null);
  /* ======================================================
      TECHNOLOGY SERVICES
  ====================================================== */

  const services = [
    {
      icon: FiCpu,
      title: tr("AI / ML Development"),
      description:
        tr("Custom AI models, machine learning solutions, intelligent automation and Agentic AI systems designed around real business requirements."),
      useCases: [
        "AI Models",
        "Machine Learning",
        tr("AI Automation"),
        "Agentic AI",
      ],
      path: "/services/ai-ml-development",
    },

    {
      icon: FiLayers,
      title: tr("Full Stack Development"),
      description:
        tr("Complete application development covering frontend, backend, databases, APIs and system integration."),
      useCases: ["Web Applications", "Dashboards", "Business Platforms"],
      path: "/services/full-stack-development",
    },

    {
      icon: FiMonitor,
      title: tr("Web Development"),
      description:
        tr("Modern, responsive and performance-focused websites designed for companies, startups, products and digital brands."),
      useCases: [tr("Corporate Websites"), tr("Startup Websites"), tr("Product Websites")],
      path: "/services/web-development",
    },

    {
      icon: FiCode,
      title: tr("Software Development"),
      description:
        tr("Custom software systems designed around business processes, internal operations and digital workflows."),
      useCases: ["Business Software", tr("Internal Tools"), tr("Management Systems")],
      path: "/services/software-development",
    },

    {
      icon: FiSmartphone,
      title: tr("App Development"),
      description:
        tr("Mobile applications designed around practical functionality, modern user experiences and connected services."),
      useCases: ["Android Apps", "iOS Apps", "Business Apps"],
      path: "/services/app-development",
    },

    {
      icon: FiCpu,
      title: tr("IoT Solutions"),
      description:
        tr("Connected IoT systems combining sensors, devices, monitoring, automation and intelligent software."),
      useCases: [tr("Sensor Monitoring"), "Automation", "Connected Systems"],
      path: "/services/iot-solutions",
    },
  ];

  /* ======================================================
      OUTCOMES
  ====================================================== */

  const outcomes = [
    {
      title: tr("Automate Repetitive Processes"),
      description:
        tr("Reduce manual effort through intelligent workflows and connected automation systems."),
    },

    {
      title: tr("Build Intelligent Products"),
      description:
        tr("Add AI capabilities to software products, digital platforms and applications."),
    },

    {
      title: tr("Modernize Workflows"),
      description:
        tr("Transform fragmented manual processes into connected digital systems."),
    },

    {
      title: tr("Create Scalable Applications"),
      description:
        tr("Build applications designed to evolve as users, requirements and operations grow."),
    },

    {
      title: tr("Connect Devices & Software"),
      description:
        tr("Bring sensors, IoT devices, monitoring platforms and software together."),
    },

    {
      title: tr("Turn Ideas Into Solutions"),
      description:
        tr("Move from an early concept or requirement into a practical working product."),
    },
  ];

  /* ======================================================
      SERVICE APPROACH
  ====================================================== */

  const approach = [
    {
      number: "01",
      title: tr("Understand"),
      description: tr("Understand the problem, users and expected outcome."),
    },

    {
      number: "02",
      title: tr("Plan"),
      description: tr("Define the right technical direction and architecture."),
    },

    {
      number: "03",
      title: tr("Build"),
      description: tr("Develop the solution using suitable technologies."),
    },

    {
      number: "04",
      title: tr("Integrate"),
      description: tr("Connect platforms, APIs, services and required workflows."),
    },

    {
      number: "05",
      title: tr("Test"),
      description: tr("Validate functionality, usability and technical behavior."),
    },

    {
      number: "06",
      title: tr("Deliver"),
      description: tr("Prepare the solution for deployment and real-world use."),
    },
  ];

  /* ======================================================
      WHY GENDATA TECH
  ====================================================== */

  const reasons = [
    {
      icon: FiCpu,
      title: tr("AI-focused Thinking"),
      description:
        tr("Artificial intelligence remains at the center of our technology direction."),
    },

    {
      icon: FiTarget,
      title: tr("Problem-led Solutions"),
      description:
        tr("We start with the actual requirement before deciding which technologies to use."),
    },

    {
      icon: FiLayers,
      title: tr("AI + Engineering"),
      description:
        tr("We combine intelligent systems with web, software, mobile and IoT engineering."),
    },

    {
      icon: FiCode,
      title: tr("Custom Development"),
      description:
        tr("Solutions are designed around specific workflows, users and technical needs."),
    },

    {
      icon: FiRepeat,
      title: tr("Scalable Direction"),
      description:
        tr("We consider maintainability and future growth while designing technical systems."),
    },

    {
      icon: FiZap,
      title: tr("Direct Communication"),
      description:
        tr("Clear communication keeps requirements, expectations and technical direction aligned."),
    },
  ];

  /* ======================================================
    INSIGHTS
====================================================== */

  const insights = [
    {
      category: "AI & Automation",
      title: tr("How AI Automation Can Improve Business Workflows"),
      description:
        tr("Explore how intelligent automation can reduce repetitive work, improve process efficiency and connect business operations."),
    },

    {
      category: "Artificial Intelligence",
      title: tr("When Should a Business Choose a Custom AI Solution?"),
      description:
        tr("Understand when a custom AI or machine learning solution may be more suitable than a generic software tool."),
    },

    {
      category: "Software Engineering",
      title: tr("Web Application vs Custom Software: What Should You Build?"),
      description:
        tr("A practical overview of the differences between web applications and custom software systems when planning a digital product."),
    },
  ];

  /* ======================================================
    FAQ
====================================================== */

  const faqs = [
    {
      question: tr("What technology services does GenData Tech provide?"),
      answer:
        tr("GenData Tech provides AI and machine learning development, full stack development, web development, software development, mobile app development and IoT solutions."),
    },

    {
      question: tr("Do you build custom AI and machine learning solutions?"),
      answer:
        tr("Yes. We build AI and machine learning solutions around specific requirements, including predictive models, classification systems, intelligent automation, Agentic AI and custom AI applications."),
    },

    {
      question: tr("Can you develop both websites and full web applications?"),
      answer:
        tr("Yes. We develop corporate and startup websites as well as full web applications that may include frontend interfaces, backend systems, APIs, authentication and databases."),
    },

    {
      question: tr("Do you provide Android and iOS app development?"),
      answer:
        tr("Yes. We provide mobile application development for business and product requirements, including applications that connect with backend services and APIs."),
    },

    {
      question: tr("Can AI be integrated into an existing software system?"),
      answer:
        tr("Yes. AI capabilities can be integrated into existing applications or workflows when the current architecture and technical requirements support the integration."),
    },

    {
      question: tr("Does GenData Tech provide IoT development?"),
      answer:
        tr("Yes. Our IoT solutions can combine sensors, connected devices, monitoring systems, automation and software platforms for practical real-world applications."),
    },

    {
      question: tr("How do you choose the right technology for a project?"),
      answer:
        tr("We begin by understanding the problem, users, expected outcome and technical requirements. The technology stack is selected based on what best fits the project rather than using the same stack for every solution."),
    },

    {
      question:
        tr("Can I contact GenData Tech if I am not sure which service I need?"),
      answer:
        tr("Yes. You can share the problem or idea without knowing the exact technology. We can review the requirement and help identify an appropriate technical direction."),
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
          className="relative flex min-h-[calc(94svh+50px)] items-start overflow-hidden bg-[#030b18] px-6 pb-[78px] pt-28 sm:min-h-[94svh] sm:pb-16 sm:pt-36 lg:min-h-[calc(88svh+80px)] lg:items-center lg:px-10 lg:pb-16 lg:pt-28"
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

          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            <div className="relative isolate grid w-full min-w-0 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
              {/* HERO LEFT: keep copy readable above the subtle mobile ribbon. */}

              <div className="relative z-20 min-w-0">
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
                  {tr("Our Services")}
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
                  {tr("AI-focused services built around")}
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    {tr("real business problems.")}
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
                  className="mt-7 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base sm:leading-8"
                >
                  GenData Tech combines artificial intelligence, software
                  engineering, web, mobile and IoT technologies to build
                  practical digital systems around real requirements.
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
                    delay: 0.24,
                  }}
                  className="mt-8 flex flex-wrap gap-2.5"
                >
                  {["AI / ML", "Software", "Web", "Mobile", "IoT"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-[12px] font-semibold uppercase tracking-[0.13em] text-slate-200"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </motion.div>
              </div>

              {/* Exactly the Home hero's 570px infinity ribbon sizing. On mobile,
                  render it behind the text, without a separate visual block. */}
              <div className="pointer-events-none absolute inset-x-0 top-[165px] z-0 flex justify-center overflow-visible sm:top-[125px] lg:relative lg:inset-auto lg:z-auto lg:block">
                <div className="w-full max-w-[420px] translate-x-0 opacity-40 sm:w-[90%] sm:max-w-[590px] sm:translate-x-[8%] lg:w-full lg:max-w-none lg:translate-x-0 lg:opacity-100">
                  <InfinityVisual />
                </div>
              </div>
              {/* Keep service text and tags legible over the mobile ribbon. */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#030b18]/85 via-[#030b18]/65 to-[#030b18]/40 lg:hidden" />
            </div>
          </div>
        </section>

        {/* ======================================================
            TECHNOLOGY SERVICES
        ====================================================== */}

        <section id="technology-services" className="bg-[#F7F9FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            {/* SECTION INTRO */}

            <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {tr("Technology Services")}
                </p>

                <h2 className="mt-5 max-w-2xl min-w-0 font-heading text-3xl font-semibold leading-[1.15] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  {tr("One technology partner. Multiple engineering capabilities.")}
                </h2>
              </div>

              <div className="lg:pb-1">
                <p className="max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                  {tr("Our services combine AI with software, applications and connected systems to turn ideas and business requirements into practical working technology.")}
                </p>
              </div>
            </div>

            {/* SERVICE GRID */}

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.div
                    key={service.title}
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
                      delay: index * 0.06,
                    }}
                    className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#057CFA]/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.07)]"
                  >
                    <div className="relative">
                      {/* ICON */}

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#002DCC] transition duration-300 group-hover:bg-[#057CFA] group-hover:text-white">
                        <Icon />
                      </div>

                      {/* TITLE */}

                      <h3 className="mt-6 font-heading text-xl font-semibold text-slate-950">
                        {service.title}
                      </h3>

                      {/* DESCRIPTION */}

                      <p className="mt-3 font-body text-sm leading-7 text-slate-500">
                        {service.description}
                      </p>

                      {/* CAPABILITIES */}

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                          {tr("Capabilities")}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {service.useCases.map((item) => (
                            <span
                              key={item}
                              className="rounded-full bg-slate-50 px-3 py-1.5 font-body text-[10px] font-medium text-slate-500"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* SERVICE LINK */}
                      <Link
                        to={service.path}
                        className="mt-6 inline-flex items-center gap-2 font-body text-xs font-semibold text-[#002DCC]"
                      >
                        {tr("Explore Service")}
                        <FiArrowRight className="transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================================================
            HOW WE HELP
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[170px]" />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                  {tr("How We Help")}
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                  {tr("Technology should create a useful outcome.")}
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-200">
                  The technology may change, but our focus remains on what the
                  system needs to achieve.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {outcomes.map((outcome, index) => (
                  <motion.div
                    key={outcome.title}
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
                    className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#057CFA]/10 text-xs text-[#057CFA]">
                        <FiArrowRight />
                      </div>

                      <div>
                        <h3 className="font-heading text-sm font-semibold text-white">
                          {outcome.title}
                        </h3>

                        <p className="mt-2 font-body text-xs leading-6 text-slate-200">
                          {outcome.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            SERVICE APPROACH
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                {tr("Our Service Approach")}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {tr("A clear path from requirement to delivery.")}
              </h2>
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
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#057CFA]/25 bg-white font-heading text-[10px] font-semibold text-[#057CFA] shadow-sm">
                      {step.number}
                    </div>

                    <h3 className="mt-5 font-heading text-sm font-semibold text-slate-950">
                      {step.title}
                    </h3>

                    <p className="mt-2 font-body text-xs leading-6 text-slate-500">
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
                  {tr("Built around intelligence, engineering and practical thinking.")}
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;

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
                        delay: index * 0.05,
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
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
          INSIGHTS
        ====================================================== */}

        <section className="bg-[#F7F9FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            {/* SECTION HEADER */}

            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {tr("Insights")}
                </p>

                <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  {tr("Ideas and perspectives around modern technology.")}
                </h2>
              </div>

              <div className="lg:pb-1">
                <p className="max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                  Explore practical insights around artificial intelligence,
                  automation, software engineering and digital product
                  development.
                </p>
              </div>
            </div>

            {/* INSIGHT CARDS */}

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight, index) => (
                <motion.article
                  key={insight.title}
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
                    delay: index * 0.07,
                  }}
                  className="group flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#057CFA]/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
                >
                  <p className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#057CFA]">
                    {insight.category}
                  </p>

                  <h3 className="mt-4 font-heading text-xl font-semibold leading-7 text-slate-950">
                    {insight.title}
                  </h3>

                  <p className="mt-4 flex-1 font-body text-sm leading-7 text-slate-500">
                    {insight.description}
                  </p>

                  <div className="mt-6 border-t border-slate-100 pt-5">
                    <span className="inline-flex items-center gap-2 font-body text-xs font-semibold text-[#002DCC]">
                      {tr("Read Insight")}
                      <FiArrowRight className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================
    FAQ
====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            {/* FAQ HEADER */}

            <div className="mx-auto max-w-3xl text-center">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                {tr("Frequently Asked Questions")}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {tr("Questions about our technology services.")}
              </h2>

              <p className="mt-5 font-body text-sm leading-7 text-slate-500 sm:text-base">
                Find answers to common questions about AI, software, web, mobile
                and IoT development services.
              </p>
            </div>

            {/* FAQ TWO COLUMN GRID */}

            <div className="mt-12 grid items-start gap-x-10 lg:grid-cols-2">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div key={faq.question} className="border-b border-slate-200">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
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
            FINAL CTA
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] rounded-full bg-[#057CFA]/10 blur-[150px]" />

          <div className="relative mx-auto max-w-[1400px]">
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
              className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-12"
            >
              <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end">
                <div>
                  <p className="font-body text-[12px] font-semibold uppercase tracking-[0.24em] text-[#057CFA]">
                    {tr("Not Sure What You Need?")}
                  </p>

                  <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    Tell us the problem. We&apos;ll help identify the right
                    direction.
                  </h2>

                  <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                    You don&apos;t need to know the exact technology before
                    contacting us. Share the requirement and we can discuss the
                    most suitable technical approach.
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "AI / ML",
                      "Web Application",
                      "Software System",
                      "Mobile App",
                      "IoT",
                      "Not Sure Yet",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-[10px] font-semibold text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="group inline-flex items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                    >
                      {tr("Start a Project")}
                      <FiArrowRight className="transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      
    </>
  );
}

export default Services;
