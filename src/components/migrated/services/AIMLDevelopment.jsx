"use client"

import { useParams } from "next/navigation";
import ProcessFlowGlow from "../../layout/ProcessFlowGlow"
import useDesktopHeroMotion from "../../layout/useDesktopHeroMotion"
import AiNeuralEngineHero from "../../layout/AiNeuralEngineHero"

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
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiRepeat,
  FiTarget,
} from "react-icons/fi"

import Link from "../../layout/LocalizedLink"

const translationsDE = {"Service Overview":"Leistungsüberblick","What We Offer":"Unsere Leistungen","Use Cases":"Anwendungsfälle","Technology Stack":"Technologie-Stack","Development Process":"Entwicklungsprozess","Why GenData Tech":"Warum GenData Tech","Frequently Asked Questions":"Häufig gestellte Fragen","Requirement":"Anforderungen","Planning":"Planung","Architecture":"Architektur","Development":"Entwicklung","Integration":"Integration","Testing":"Testen","Deployment":"Bereitstellung","Delivery":"Auslieferung","Understand":"Verstehen","Design":"Konzeption","Build":"Entwickeln","Evaluate":"Evaluierung","Evaluation":"Evaluierung","Training":"Training","Structure":"Struktur","Connect":"Verbinden","Improve":"Verbessern","Start a Project":"Projekt starten","Discuss Your Requirement":"Anforderung besprechen","AI / ML Development":"KI- und ML-Entwicklung","Full Stack Development":"Full-Stack-Entwicklung","Web Development":"Webentwicklung","Software Development":"Softwareentwicklung","App Development":"App-Entwicklung","IoT Solutions":"IoT-Lösungen","AI Automation":"KI-Automatisierung","Custom AI Solutions":"Individuelle KI-Lösungen","Machine Learning Solutions":"Lösungen für maschinelles Lernen","Model Design":"Modellkonzeption","Data Understanding":"Datenverständnis","AI Model Development":"KI-Modellentwicklung","Frontend Development":"Frontend-Entwicklung","Backend Development":"Backend-Entwicklung","API Development":"API-Entwicklung","Database Integration":"Datenbankintegration","Authentication & Security":"Authentifizierung und Sicherheit","Corporate Websites":"Unternehmenswebsites","Startup Websites":"Websites für Start-ups","Product Websites":"Produktwebsites","Responsive Development":"Responsive Entwicklung","Performance-focused Development":"Performanceorientierte Entwicklung","SEO-ready Structure":"SEO-gerechte Struktur","Custom Business Software":"Individuelle Unternehmenssoftware","Internal Tools":"Interne Tools","Management Systems":"Managementsysteme","Workflow Applications":"Workflow-Anwendungen","API & System Integration":"API- und Systemintegration","Software Modernization":"Softwaremodernisierung","Android App Development":"Android-App-Entwicklung","iOS App Development":"iOS-App-Entwicklung","Cross-platform Applications":"Plattformübergreifende Anwendungen","Backend & API Integration":"Backend- und API-Integration","Notifications & User Features":"Benachrichtigungen und Nutzerfunktionen","Business Mobile Apps":"Mobile Business-Apps","Sensor Monitoring":"Sensorüberwachung","Device Automation":"Geräteautomatisierung","Remote Monitoring":"Fernüberwachung","IoT Dashboards":"IoT-Dashboards","Alerts & Notifications":"Warnmeldungen und Benachrichtigungen","AI-enabled IoT":"KI-gestütztes IoT","Our Services":"Unsere Leistungen","Technology Services":"Technologiedienstleistungen","Product Portfolio":"Produktportfolio","Our Products":"Unsere Produkte","GenData Tech Products":"GenData Tech Produkte","Training Programs":"Schulungsprogramme","Learning Experience":"Lernerfahrung","Learning Process":"Lernprozess","Learning Approach":"Lernkonzept","Contact GenData Tech":"Kontakt zu GenData Tech","Quick Contact":"Direkter Kontakt","Start Your Enquiry":"Anfrage senden","Full Name *":"Vollständiger Name *","Email Address *":"E-Mail-Adresse *","Phone Number":"Telefonnummer","What are you interested in? *":"Wofür interessieren Sie sich? *","Select a category":"Kategorie auswählen","Other Enquiry":"Sonstige Anfrage","What are you looking for? *":"Was suchen Sie? *","Tell us about your requirement *":"Beschreiben Sie Ihr Anliegen *","Locations":"Standorte","Before You Get in Touch":"Bevor Sie Kontakt aufnehmen","Your Requirement":"Ihre Anforderung","The Problem":"Die Herausforderung","The Next Step":"Der nächste Schritt","Our Response Promise":"Unser Antwortversprechen","Within 24 hrs":"Innerhalb von 24 Std.","Response":"Antwort","Availability":"Erreichbarkeit","Insights":"Einblicke","Explore":"Entdecken","Learn":"Lernen","Students":"Studierende","Beginners":"Einsteiger","Skill Builders":"Weiterbildungsinteressierte","Data Science":"Data Science","Data Analytics":"Datenanalyse","IoT Development":"IoT-Entwicklung","Mobile App Development":"Mobile-App-Entwicklung","Python":"Python","Deep Learning":"Deep Learning","Build Intelligent Products":"Intelligente Produkte entwickeln","Interface":"Benutzeroberfläche","Optimization":"Optimierung","System Design":"Systemplanung","Device Setup":"Geräteeinrichtung","Programming":"Programmierung","Practice":"Üben","Review":"Überprüfen","Apply":"Anwenden","Plan":"Planen","What You'll Learn":"Das lernen Sie","Tools & Technologies":"Tools und Technologien","Learning Outcome":"Lernergebnis","General Enquiry":"Allgemeine Anfrage","Partnership":"Partnerschaft","Business Enquiry":"Geschäftsanfrage","Other":"Sonstiges","Schedule a Call":"Gespräch vereinbaren","Custom artificial intelligence models designed around specific data, business requirements and application needs.":"Individuelle KI-Modelle für konkrete Daten, Geschäftsanforderungen und Anwendungsfälle.","Machine learning systems for prediction, classification, pattern recognition and intelligent decision support.":"Systeme des maschinellen Lernens für Prognosen, Klassifikation, Mustererkennung und intelligente Entscheidungsunterstützung.","Deep learning solutions using neural networks for more complex AI problems and data-driven applications.":"Deep-Learning-Lösungen mit neuronalen Netzen für komplexe KI-Aufgaben und datengetriebene Anwendungen.","Intelligent automation designed to reduce repetitive work and connect AI with operational workflows.":"Intelligente Automatisierung zur Reduzierung wiederkehrender Aufgaben und zur Integration von KI in betriebliche Abläufe.","AI agent systems capable of reasoning, using tools, completing tasks and supporting multi-step workflows.":"KI-Agentensysteme, die schlussfolgern, Werkzeuge nutzen, Aufgaben erledigen und mehrstufige Prozesse unterstützen.","Purpose-built AI applications combining models, automation, APIs and business logic into a tailored system.":"Maßgeschneiderte KI-Anwendungen, die Modelle, Automatisierung, APIs und Geschäftslogik in einem System vereinen.","Understand the problem, goal and expected AI outcome.":"Problem, Ziel und gewünschtes KI-Ergebnis verstehen.","Review available data, structure, quality and model requirements.":"Verfügbare Daten, Struktur, Qualität und Modellanforderungen prüfen.","Select suitable algorithms, architecture and development strategy.":"Geeignete Algorithmen, Architektur und Entwicklungsstrategie auswählen.","Train and refine the model using prepared data and suitable methods.":"Das Modell mit aufbereiteten Daten und geeigneten Verfahren trainieren und optimieren.","Evaluate model performance using relevant metrics and validation.":"Modellleistung anhand relevanter Kennzahlen und Validierung bewerten.","Connect the model with the application, API or required workflow.":"Das Modell mit der Anwendung, API oder dem benötigten Prozess verbinden.","Prepare the AI system for practical use and future improvement.":"Das KI-System für den Praxiseinsatz und spätere Verbesserungen vorbereiten.","Problem-first Development":"Problemorientierte Entwicklung","We begin by understanding the actual requirement before selecting the model or technology.":"Wir verstehen zuerst die konkrete Anforderung, bevor wir Modell oder Technologie auswählen.","AI-focused Direction":"KI-orientierte Ausrichtung","AI and machine learning remain central to our technology and product development direction.":"KI und maschinelles Lernen stehen im Mittelpunkt unserer Technologie- und Produktentwicklung.","AI + Software Integration":"KI- und Softwareintegration","We connect models with web applications, APIs, software platforms and business workflows.":"Wir verbinden Modelle mit Webanwendungen, APIs, Softwareplattformen und Geschäftsprozessen.","Iterative Improvement":"Kontinuierliche Verbesserung","AI systems are evaluated and refined based on performance, requirements and future expansion.":"KI-Systeme werden anhand ihrer Leistung, Anforderungen und künftigen Erweiterungen bewertet und verbessert.","What AI and machine learning services does GenData Tech provide?":"Welche KI- und Machine-Learning-Leistungen bietet GenData Tech an?","GenData Tech provides AI model development, machine learning solutions, deep learning, AI automation, Agentic AI and customized AI applications.":"GenData Tech bietet KI-Modellentwicklung, maschinelles Lernen, Deep Learning, KI-Automatisierung, Agentic AI und individuelle KI-Anwendungen.","Can you build a custom AI model for a specific business requirement?":"Können Sie ein individuelles KI-Modell für eine bestimmte Geschäftsanforderung entwickeln?","Yes. AI models can be designed around a specific requirement when suitable data, objectives and technical conditions are available.":"Ja. Bei geeigneten Daten, klaren Zielen und passenden technischen Voraussetzungen können wir KI-Modelle für konkrete Anforderungen entwickeln.","What programming language do you use for AI development?":"Welche Programmiersprache verwenden Sie für die KI-Entwicklung?","Python is our primary programming language for AI and machine learning development, supported by relevant AI, data and backend libraries.":"Python ist unsere wichtigste Programmiersprache für KI und maschinelles Lernen, ergänzt durch geeignete Daten-, KI- und Backend-Bibliotheken.","Which machine learning frameworks do you use?":"Welche Machine-Learning-Frameworks verwenden Sie?","Depending on the requirement, we can work with technologies such as Scikit-learn, TensorFlow and PyTorch.":"Je nach Anforderung arbeiten wir mit Technologien wie Scikit-learn, TensorFlow und PyTorch.","Can AI models be integrated into an existing application?":"Können KI-Modelle in bestehende Anwendungen integriert werden?","Yes. AI models can be connected with applications through APIs, backend services or other suitable integration methods depending on the existing system architecture.":"Ja. Abhängig von der vorhandenen Architektur lassen sich KI-Modelle über APIs, Backend-Dienste oder andere geeignete Schnittstellen integrieren.","Do you provide AI automation and Agentic AI development?":"Bieten Sie KI-Automatisierung und Agentic-AI-Entwicklung an?","Yes. AI automation and Agentic AI are part of our AI development direction, including intelligent workflows and AI agents that can interact with tools and systems.":"Ja. Dazu gehören intelligente Workflows und KI-Agenten, die mit Werkzeugen und Systemen interagieren können.","Do I need to know which AI technology my project requires?":"Muss ich bereits wissen, welche KI-Technologie mein Projekt benötigt?","No. You can share the problem, available data and expected outcome. We can then help identify an appropriate technical direction.":"Nein. Beschreiben Sie Ihr Problem, verfügbare Daten und das gewünschte Ergebnis. Wir helfen Ihnen, die passende technische Richtung zu finden.","Can I contact GenData Tech to discuss an early-stage AI idea?":"Kann ich eine KI-Idee in einer frühen Phase mit GenData Tech besprechen?","Yes. You do not need to have a complete specification before contacting us. Early-stage requirements can be discussed to understand the most suitable next step.":"Ja. Sie benötigen noch keine vollständige Spezifikation. Wir können Ihre Idee gemeinsam prüfen und die nächsten Schritte besprechen.","DATA":"DATEN","MODELS":"MODELLE","AUTOMATION":"AUTOMATISIERUNG","AGENTS":"AGENTEN","Build intelligent systems":"Intelligente Systeme entwickeln","around real requirements.":"für konkrete Anforderungen.","Discuss Your AI Requirement":"KI-Anforderung besprechen","INTELLIGENCE":"INTELLIGENZ","AI development built around the problem first.":"KI-Entwicklung beginnt mit der Problemstellung.","AI capabilities designed for different requirements.":"KI-Kompetenzen für unterschiedliche Anforderungen.","Practical applications of AI and machine learning.":"Praktische Anwendungen von KI und maschinellem Lernen.","Technologies we use to build AI solutions.":"Technologien für die Entwicklung von KI-Lösungen.","From requirement to deployed intelligence.":"Von der Anforderung bis zum einsatzbereiten KI-System.","AI development connected with practical engineering.":"KI-Entwicklung mit praxisorientiertem Engineering.","Questions about AI & ML development.":"Fragen zur KI- und ML-Entwicklung.","Start an AI Project":"KI-Projekt starten","Have an AI idea or machine learning requirement?":"Sie haben eine KI-Idee oder benötigen eine Machine-Learning-Lösung?","AI / ML":"KI / ML","AI development is most effective when it begins with a clear understanding of the problem, available data and expected outcome.":"Eine erfolgreiche KI-Entwicklung beginnt mit einem klaren Verständnis des Problems, der verfügbaren Daten und des gewünschten Ergebnisses.","GenData Tech develops artificial intelligence and machine learning solutions ranging from custom models to intelligent automation and AI-powered applications.":"GenData Tech entwickelt Lösungen für künstliche Intelligenz und maschinelles Lernen – von individuellen Modellen bis hin zu intelligenter Automatisierung und KI-gestützten Anwendungen.","Our approach combines model development with the software integration required to make AI usable within real applications and workflows.":"Unser Ansatz verbindet die Modellentwicklung mit der Softwareintegration, damit KI in realen Anwendungen und Arbeitsabläufen nutzbar wird.","Our AI development direction covers model development, automation, intelligent agents and custom AI applications.":"Unsere KI-Entwicklung umfasst Modellentwicklung, Automatisierung, intelligente Agenten und individuelle KI-Anwendungen.","The exact technology stack depends on the problem, data, application architecture and deployment requirements.":"Die konkrete Technologieauswahl richtet sich nach dem Problem, den Daten, der Anwendungsarchitektur und den Anforderungen an die Bereitstellung.","AI development moves through multiple stages of understanding, experimentation, validation and integration.":"KI-Entwicklung durchläuft mehrere Phasen: Problemverständnis, Experimente, Validierung und Integration.","We approach AI as part of a complete technology system rather than treating the model as an isolated component.":"Wir betrachten KI als Teil eines vollständigen Technologiesystems und nicht als isolierte Modellkomponente.","Common questions about our artificial intelligence, machine learning and AI integration services.":"Häufige Fragen zu unseren Leistungen in den Bereichen künstliche Intelligenz, maschinelles Lernen und KI-Integration.","Share the problem, available data or expected outcome. We can discuss the most suitable technical direction.":"Beschreiben Sie Ihr Problem, die verfügbaren Daten oder das gewünschte Ergebnis. Gemeinsam können wir den passenden technischen Ansatz besprechen."};

function AIMLDevelopment() {
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

  const glowShouldAnimate = useDesktopHeroMotion(heroShouldAnimate)

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
      title: tr("AI Model Development"),
      description: tr("Custom artificial intelligence models designed around specific data, business requirements and application needs."),
    },

    {
      number: "02",
      title: tr("Machine Learning Solutions"),
      description: tr("Machine learning systems for prediction, classification, pattern recognition and intelligent decision support."),
    },

    {
      number: "03",
      title: tr("Deep Learning"),
      description: tr("Deep learning solutions using neural networks for more complex AI problems and data-driven applications."),
    },

    {
      number: "04",
      title: tr("AI Automation"),
      description: tr("Intelligent automation designed to reduce repetitive work and connect AI with operational workflows."),
    },

    {
      number: "05",
      title: "Agentic AI",
      description: tr("AI agent systems capable of reasoning, using tools, completing tasks and supporting multi-step workflows."),
    },

    {
      number: "06",
      title: tr("Custom AI Solutions"),
      description: tr("Purpose-built AI applications combining models, automation, APIs and business logic into a tailored system."),
    },
  ]


  /* ======================================================
      TECHNOLOGY STACK
  ====================================================== */

  const technologyStack = [
    {
      icon: FiCode,
      category: tr("Programming"),
      technologies: [
        tr("Python"),
      ],
    },

    {
      icon: FiCpu,
      category: "AI / Machine Learning",
      technologies: [
        "Scikit-learn",
        "TensorFlow",
        "PyTorch",
      ],
    },

    {
      icon: FiDatabase,
      category: "Data",
      technologies: [
        "Pandas",
        "NumPy",
      ],
    },

    {
      icon: FiLayers,
      category: "Backend & Integration",
      technologies: [
        "Flask",
        "FastAPI",
        "REST APIs",
      ],
    },

    {
      icon: FiDatabase,
      category: "Databases",
      technologies: [
        "MySQL",
        "PostgreSQL",
      ],
    },

    {
      icon: FiGitBranch,
      category: "Development Tools",
      technologies: [
        "Git",
        "GitHub",
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
        tr("Understand the problem, goal and expected AI outcome."),
    },

    {
      number: "02",
      title: tr("Data Understanding"),
      description:
        tr("Review available data, structure, quality and model requirements."),
    },

    {
      number: "03",
      title: tr("Model Design"),
      description:
        tr("Select suitable algorithms, architecture and development strategy."),
    },

    {
      number: "04",
      title: tr("Training"),
      description:
        tr("Train and refine the model using prepared data and suitable methods."),
    },

    {
      number: "05",
      title: tr("Evaluation"),
      description:
        tr("Evaluate model performance using relevant metrics and validation."),
    },

    {
      number: "06",
      title: tr("Integration"),
      description:
        tr("Connect the model with the application, API or required workflow."),
    },

    {
      number: "07",
      title: tr("Deployment"),
      description:
        tr("Prepare the AI system for practical use and future improvement."),
    },
  ]


  /* ======================================================
      WHY GENDATA TECH
  ====================================================== */

  const reasons = [
    {
      icon: FiTarget,
      title: tr("Problem-first Development"),
      description:
        tr("We begin by understanding the actual requirement before selecting the model or technology."),
    },

    {
      icon: FiCpu,
      title: tr("AI-focused Direction"),
      description:
        tr("AI and machine learning remain central to our technology and product development direction."),
    },

    {
      icon: FiLayers,
      title: tr("AI + Software Integration"),
      description:
        tr("We connect models with web applications, APIs, software platforms and business workflows."),
    },

    {
      icon: FiRepeat,
      title: tr("Iterative Improvement"),
      description:
        tr("AI systems are evaluated and refined based on performance, requirements and future expansion."),
    },
  ]


  /* ======================================================
      FAQ
  ====================================================== */

  const faqs = [
    {
      question:
        tr("What AI and machine learning services does GenData Tech provide?"),
      answer:
        tr("GenData Tech provides AI model development, machine learning solutions, deep learning, AI automation, Agentic AI and customized AI applications."),
    },

    {
      question:
        tr("Can you build a custom AI model for a specific business requirement?"),
      answer:
        tr("Yes. AI models can be designed around a specific requirement when suitable data, objectives and technical conditions are available."),
    },

    {
      question:
        tr("What programming language do you use for AI development?"),
      answer:
        tr("Python is our primary programming language for AI and machine learning development, supported by relevant AI, data and backend libraries."),
    },

    {
      question:
        tr("Which machine learning frameworks do you use?"),
      answer:
        tr("Depending on the requirement, we can work with technologies such as Scikit-learn, TensorFlow and PyTorch."),
    },

    {
      question:
        tr("Can AI models be integrated into an existing application?"),
      answer:
        tr("Yes. AI models can be connected with applications through APIs, backend services or other suitable integration methods depending on the existing system architecture."),
    },

    {
      question:
        tr("Do you provide AI automation and Agentic AI development?"),
      answer:
        tr("Yes. AI automation and Agentic AI are part of our AI development direction, including intelligent workflows and AI agents that can interact with tools and systems."),
    },

    {
      question:
        tr("Do I need to know which AI technology my project requires?"),
      answer:
        tr("No. You can share the problem, available data and expected outcome. We can then help identify an appropriate technical direction."),
    },

    {
      question:
        tr("Can I contact GenData Tech to discuss an early-stage AI idea?"),
      answer:
        tr("Yes. You do not need to have a complete specification before contacting us. Early-stage requirements can be discussed to understand the most suitable next step."),
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
              glowShouldAnimate
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
              glowShouldAnimate
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
              glowShouldAnimate
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
              glowShouldAnimate
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

            <div className="grid min-w-0 min-h-0 items-center gap-8 sm:gap-10 lg:min-h-[465px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">

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
                  {tr("AI / ML Development")}
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
                  {tr("Build intelligent systems")}

                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    {tr("around real requirements.")}
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
                  className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base sm:leading-8"
                >
                  {lang === "de" ? "GenData Tech entwickelt KI- und Machine-Learning-Lösungen, die auf Daten, Arbeitsabläufe und praktische Anwendungsanforderungen abgestimmt sind." : "GenData Tech develops AI and machine learning solutions designed around data, workflows and practical application requirements."}
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
                    {tr("Discuss Your AI Requirement")}

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
                    "Machine Learning",
                    "Deep Learning",
                    tr("AI Automation"),
                    "Agentic AI",
                  ].map((item) => (

                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-200"
                    >
                      {item}
                    </span>

                  ))}

                </motion.div>

              </div>



              {/* Interactive neural intelligence concept; no live model or heavyweight 3D runtime. */}
              <div className="relative mx-auto flex w-full min-w-0 max-w-[500px] items-center justify-center lg:justify-self-center">
                <AiNeuralEngineHero active={heroShouldAnimate} lang={lang} />
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
                  {tr("AI development built around the problem first.")}
                </h2>

              </div>


              <div className="space-y-5">

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {tr("AI development is most effective when it begins with a clear understanding of the problem, available data and expected outcome.")}
                </p>


                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {tr("GenData Tech develops artificial intelligence and machine learning solutions ranging from custom models to intelligent automation and AI-powered applications.")}
                </p>


                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {tr("Our approach combines model development with the software integration required to make AI usable within real applications and workflows.")}
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
                {tr("AI capabilities designed for different requirements.")}
              </h2>


              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                {tr("Our AI development direction covers model development, automation, intelligent agents and custom AI applications.")}
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

            Enable later when GenData Tech has approved real
            project examples or use-case content.
        ====================================================== */}

        {/*
        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-[1400px]">

            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
              {tr("Use Cases")}
            </p>

            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              {tr("Practical applications of AI and machine learning.")}
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
                  {tr("Technologies we use to build AI solutions.")}
                </h2>


                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  {tr("The exact technology stack depends on the problem, data, application architecture and deployment requirements.")}
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
                {tr("From requirement to deployed intelligence.")}
              </h2>


              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                {tr("AI development moves through multiple stages of understanding, experimentation, validation and integration.")}
              </p>

            </div>


            <div className="relative mt-14">

              <ProcessFlowGlow breakpoint="xl" />


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
                  {tr("AI development connected with practical engineering.")}
                </h2>


                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  {tr("We approach AI as part of a complete technology system rather than treating the model as an isolated component.")}
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
                {tr("Questions about AI & ML development.")}
              </h2>


              <p className="mt-5 font-body text-sm leading-7 text-slate-500 sm:text-base">
                {tr("Common questions about our artificial intelligence, machine learning and AI integration services.")}
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
                      aria-expanded={isOpen}
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
                    {tr("Start an AI Project")}
                  </p>


                  <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    {tr("Have an AI idea or machine learning requirement?")}
                  </h2>


                  <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                    {tr("Share the problem, available data or expected outcome. We can discuss the most suitable technical direction.")}
                  </p>

                </div>


                <Link
                  to="/contact"
                  className="group inline-flex w-fit items-center gap-2 rounded-full gd-brand-primary px-6 py-3.5 font-body text-xs font-semibold text-white transition "
                >
                  {tr("Discuss Your Requirement")}

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


export default AIMLDevelopment