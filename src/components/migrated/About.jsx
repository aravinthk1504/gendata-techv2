"use client"

import ProcessFlowGlow from "../layout/ProcessFlowGlow"
import CountUpStat from "../layout/CountUpStat"

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import {
  FiArrowRight,
  FiBox,
  FiCode,
  FiCpu,
  FiLayers,
  FiSmartphone,
  FiZap,
} from "react-icons/fi";

import Link from "../layout/LocalizedLink"
import { useParams } from "next/navigation"

const aboutDE = {
  "Clients": "Kunden",
  "Client relationship": "Kundenbeziehung",
  "Project": "Projekt",
  "Project delivered": "Abgeschlossenes Projekt",
  "Years": "Jahre",
  "Building GenData Tech": "Aufbau von GenData Tech",
  "Practical Intelligence": "Praxisorientierte Intelligenz",
  "Engineering First": "Engineering an erster Stelle",
  "Built Around the Problem": "Am Problem orientiert",
  "Scalable by Design": "Von Grund auf skalierbar",
  "We focus on AI that solves useful problems and creates meaningful outcomes rather than using technology simply for the sake of it.": "Wir konzentrieren uns auf KI, die konkrete Probleme löst und echten Mehrwert schafft – statt Technologie um ihrer selbst willen einzusetzen.",
  "Strong architecture, maintainability and thoughtful engineering remain at the foundation of everything we build.": "Solide Architektur, Wartbarkeit und durchdachte Entwicklung bilden die Grundlage unserer Arbeit.",
  "We begin by understanding the real challenge before selecting technologies, models or platforms.": "Wir verstehen zunächst die tatsächliche Herausforderung, bevor wir Technologien, Modelle oder Plattformen auswählen.",
  "We aim to create systems that can evolve as requirements, users and technologies continue to grow.": "Wir entwickeln Systeme, die mit Anforderungen, Nutzern und Technologien wachsen können.",
  "AI Systems": "KI-Systeme",
  "AI Automation": "KI-Automatisierung",
  "Digital Products": "Digitale Produkte",
  "Software Platforms": "Softwareplattformen",
  "Mobile & IoT": "Mobile Anwendungen & IoT",
  "Technology Training": "Technologieschulungen",
  "Custom AI models, intelligent applications and machine-learning driven solutions.": "Individuelle KI-Modelle, intelligente Anwendungen und Lösungen auf Basis maschinellen Lernens.",
  "Automation systems designed to reduce repetitive work and improve operational efficiency.": "Automatisierungssysteme zur Reduzierung wiederkehrender Aufgaben und Steigerung der betrieblichen Effizienz.",
  "Technology products including platforms such as LMS, CRM, ERP and billing systems.": "Technologieprodukte wie LMS-, CRM-, ERP- und Abrechnungssysteme.",
  "Full-stack web applications and software systems engineered around business requirements.": "Full-Stack-Webanwendungen und Softwaresysteme, die auf geschäftliche Anforderungen abgestimmt sind.",
  "Mobile applications and connected IoT solutions that bridge software with the physical world.": "Mobile Anwendungen und vernetzte IoT-Lösungen, die Software mit der physischen Welt verbinden.",
  "Practical learning programs focused on AI, data, development and emerging technologies.": "Praxisnahe Schulungsprogramme rund um KI, Daten, Entwicklung und neue Technologien.",
  "Understand": "Verstehen",
  "Design": "Konzipieren",
  "Build": "Entwickeln",
  "Validate": "Prüfen",
  "Deploy": "Bereitstellen",
  "Improve": "Verbessern",
  "Define the problem, goals and actual requirements.": "Problem, Ziele und tatsächliche Anforderungen definieren.",
  "Plan the right architecture, experience and technical direction.": "Die passende Architektur, Nutzererfahrung und technische Ausrichtung planen.",
  "Develop the system using practical engineering and suitable technologies.": "Das System mit bewährten Entwicklungsmethoden und geeigneten Technologien realisieren.",
  "Test the solution against its intended use and requirements.": "Die Lösung anhand des vorgesehenen Einsatzes und der Anforderungen testen.",
  "Prepare and deliver the solution for real-world use.": "Die Lösung für den praktischen Einsatz vorbereiten und bereitstellen.",
  "Learn from usage and continue refining the system.": "Aus der Nutzung lernen und das System kontinuierlich verbessern.",
  "Started": "Beginn",
  "Built": "Aufbau",
  "Now": "Heute",
  "The beginning of GenData Tech": "Der Anfang von GenData Tech",
  "Our first client and project": "Unser erster Kunde und unser erstes Projekt",
  "Expanding our AI-focused direction": "Ausbau unseres KI-Schwerpunkts",
  "GenData Tech began with a focus on building technology around AI, data and practical digital solutions.": "GenData Tech startete mit dem Ziel, Technologien rund um KI, Daten und praxisnahe digitale Lösungen zu entwickeln.",
  "The journey moved from ideas into real delivery through our first client relationship and completed project.": "Aus Ideen wurden konkrete Ergebnisse – mit unserer ersten Kundenbeziehung und einem abgeschlossenen Projekt.",
  "Today we are strengthening our focus on AI systems, automation, digital products, engineering and technology training.": "Heute verstärken wir unseren Fokus auf KI-Systeme, Automatisierung, digitale Produkte, Softwareentwicklung und Technologieschulungen."
};

function About() {
  const { lang } = useParams();
  const tr = (value) => lang === "de" ? (aboutDE[value] ?? value) : value;
  /* ======================================================
      HERO ANIMATION CONTROL
  ====================================================== */

  const heroRef = useRef(null);

  const heroInView = useInView(heroRef, {
    margin: "-10% 0px -10% 0px",
    once: true,
  });

  const reduceMotion = useReducedMotion();

  const heroShouldAnimate = heroInView && !reduceMotion;

  /* ======================================================
      COMPANY SNAPSHOT
  ====================================================== */

  const companyStats = [
    {
      value: 2,
      label: tr("Clients"),
      description: tr("Client relationship"),
    },
    {
      value: 1,
      label: tr("Project"),
      description: tr("Project delivered"),
    },
    {
      value: 2,
      label: tr("Years"),
      description: tr("Building GenData Tech"),
    },
  ];

  /* ======================================================
      PRINCIPLES
  ====================================================== */

  const principles = [
    {
      number: "01",
      title: tr("Practical Intelligence"),
      description:
        tr("We focus on AI that solves useful problems and creates meaningful outcomes rather than using technology simply for the sake of it."),
    },

    {
      number: "02",
      title: tr("Engineering First"),
      description:
        tr("Strong architecture, maintainability and thoughtful engineering remain at the foundation of everything we build."),
    },

    {
      number: "03",
      title: tr("Built Around the Problem"),
      description:
        tr("We begin by understanding the real challenge before selecting technologies, models or platforms."),
    },

    {
      number: "04",
      title: tr("Scalable by Design"),
      description:
        tr("We aim to create systems that can evolve as requirements, users and technologies continue to grow."),
    },
  ];

  /* ======================================================
      WHAT WE BUILD
  ====================================================== */

  const capabilities = [
    {
      icon: FiCpu,
      title: tr("AI Systems"),
      description:
        tr("Custom AI models, intelligent applications and machine-learning driven solutions."),
    },

    {
      icon: FiZap,
      title: tr("AI Automation"),
      description:
        tr("Automation systems designed to reduce repetitive work and improve operational efficiency."),
    },

    {
      icon: FiBox,
      title: tr("Digital Products"),
      description:
        tr("Technology products including platforms such as LMS, CRM, ERP and billing systems."),
    },

    {
      icon: FiCode,
      title: tr("Software Platforms"),
      description:
        tr("Full-stack web applications and software systems engineered around business requirements."),
    },

    {
      icon: FiSmartphone,
      title: tr("Mobile & IoT"),
      description:
        tr("Mobile applications and connected IoT solutions that bridge software with the physical world."),
    },

    {
      icon: FiLayers,
      title: tr("Technology Training"),
      description:
        tr("Practical learning programs focused on AI, data, development and emerging technologies."),
    },
  ];

  /* ======================================================
      APPROACH
  ====================================================== */

  const approach = [
    {
      number: "01",
      title: tr("Understand"),
      description: tr("Define the problem, goals and actual requirements."),
    },

    {
      number: "02",
      title: tr("Design"),
      description:
        tr("Plan the right architecture, experience and technical direction."),
    },

    {
      number: "03",
      title: tr("Build"),
      description:
        tr("Develop the system using practical engineering and suitable technologies."),
    },

    {
      number: "04",
      title: tr("Validate"),
      description:
        tr("Test the solution against its intended use and requirements."),
    },

    {
      number: "05",
      title: tr("Deploy"),
      description: tr("Prepare and deliver the solution for real-world use."),
    },

    {
      number: "06",
      title: tr("Improve"),
      description: tr("Learn from usage and continue refining the system."),
    },
  ];

  /* ======================================================
      JOURNEY
  ====================================================== */

  const journey = [
    {
      number: "01",
      year: "2024",
      label: tr("Started"),
      title: tr("The beginning of GenData Tech"),
      description:
        tr("GenData Tech began with a focus on building technology around AI, data and practical digital solutions."),
    },

    {
      number: "02",
      year: "2025",
      label: tr("Built"),
      title: tr("Our first client and project"),
      description:
        tr("The journey moved from ideas into real delivery through our first client relationship and completed project."),
    },

    {
      number: "03",
      year: "2026",
      label: tr("Now"),
      title: tr("Expanding our AI-focused direction"),
      description:
        tr("Today we are strengthening our focus on AI systems, automation, digital products, engineering and technology training."),
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
          className="relative overflow-hidden bg-[#030b18] px-6 pt-32 pb-[66px] sm:pt-36 sm:pb-28 lg:px-10 lg:pt-32 lg:pb-20"
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
                    x: [0, -25, 0],
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

          <div className="relative mx-auto flex w-full max-w-[1400px] items-center py-6 sm:py-8 lg:min-h-[430px] lg:py-8">
            <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
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
                  {lang === "de" ? "Über GenData Tech" : "About GenData Tech"}
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
                  {lang === "de" ? "Intelligente Lösungen für" : "Engineering intelligence for"}
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    {lang === "de" ? "die Praxis." : "real-world impact."}
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
                  {lang === "de" ? "GenData Tech entwickelt als KI-orientiertes Technologieunternehmen\n                  intelligente Systeme, digitale Produkte und technische\n                  Lösungen für konkrete geschäftliche Herausforderungen." : "GenData Tech is an AI-focused technology company building\n                  intelligent systems, digital products and engineering\n                  solutions designed around practical business and real-world\n                  challenges."}
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
                  {["AI", "Automation", "Products", "Engineering"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-200"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </motion.div>
              </div>

              {/* ==================================================
                  HERO INTELLIGENCE STACK
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
                  duration: 0.7,
                  delay: 0.16,
                }}
                className="relative mx-auto w-full max-w-[470px]"
              >
                <div className="relative flex min-h-[370px] items-center justify-center lg:min-h-[340px]">
                  {/* BACKGROUND RING */}

                  <motion.div
                    className="absolute h-[330px] w-[330px] rounded-full border border-white/[0.05]"
                    animate={
                      heroShouldAnimate
                        ? {
                            rotate: 360,
                          }
                        : {
                            rotate: 0,
                          }
                    }
                    transition={
                      heroShouldAnimate
                        ? {
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                          }
                        : {
                            duration: 0.2,
                          }
                    }
                  >
                    <div className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#057CFA] shadow-[0_0_16px_rgba(5,124,250,0.9)]" />
                  </motion.div>

                  {/* STACK */}

                  <div className="relative z-10 flex w-full max-w-[330px] flex-col gap-3">
                    {[
                      {
                        number: "04",
                        label: "Intelligence",
                        sub: "Decision & reasoning",
                      },
                      {
                        number: "03",
                        label: "AI & Automation",
                        sub: "Models, agents & workflows",
                      },
                      {
                        number: "02",
                        label: tr("Digital Products"),
                        sub: "Platforms & applications",
                      },
                      {
                        number: "01",
                        label: "Engineering Systems",
                        sub: "Software, mobile & IoT",
                      },
                    ].map((layer, index) => (
                      <motion.div
                        key={layer.number}
                        animate={
                          heroShouldAnimate
                            ? {
                                x: index % 2 === 0 ? [0, 5, 0] : [0, -5, 0],
                              }
                            : {
                                x: 0,
                              }
                        }
                        transition={
                          heroShouldAnimate
                            ? {
                                duration: 4 + index * 0.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }
                            : {
                                duration: 0.2,
                              }
                        }
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#06152C]/90 px-5 py-4 backdrop-blur-sm"
                      >
                        <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-[#057CFA] to-transparent" />

                        <div className="flex items-center justify-between gap-5">
                          <div>
                            <p className="font-heading text-sm font-semibold text-white">
                              {layer.label}
                            </p>

                            <p className="mt-1 font-body text-[10px] text-slate-300">
                              {layer.sub}
                            </p>
                          </div>

                          <span className="font-heading text-[10px] font-semibold text-[#057CFA]">
                            {layer.number}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            WHO WE ARE
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
              {/* LEFT */}

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
              >
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {lang === "de" ? "Wer wir sind" : "Who We Are"}
                </p>

                <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold leading-[1.15] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  {lang === "de" ? "Ein KI-orientiertes Unternehmen für praxisnahe intelligente Systeme." : "An AI-focused company focused on practical intelligent systems."}
                </h2>
              </motion.div>

              {/* RIGHT */}

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
                  delay: 0.08,
                }}
                className="space-y-5"
              >
                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {lang === "de" ? "GenData Tech konzentriert sich auf die Entwicklung von KI-Modellen, agentenbasierter KI, KI-Automatisierung und individuellen intelligenten Lösungen. Unser Ziel ist es, konkrete Anforderungen in verständliche, nützliche und praxistaugliche Systeme umzusetzen." : "GenData Tech focuses primarily on AI model development, Agentic AI, AI automation and customized intelligent solutions. Our goal is to transform real requirements into systems that are useful, understandable and built for practical application."}
                </p>

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {lang === "de" ? "Neben KI umfassen unsere Entwicklungskompetenzen Full-Stack- und Softwareentwicklung, mobile Anwendungen sowie IoT-Lösungen. So verbinden wir Intelligenz mit den Plattformen und Systemen, in denen sie Mehrwert schafft." : "Alongside AI, our engineering capabilities include full-stack development, software development, mobile applications and IoT solutions — allowing us to connect intelligence with the platforms and systems where it creates value."}
                </p>

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {lang === "de" ? "Wir wachsen weiter, lernen dazu und erweitern unsere Kompetenzen. Dabei schaffen wir die Grundlage für ein Technologieunternehmen, das Herausforderungen mit Intelligenz und technischer Sorgfalt angeht." : "We are still growing, learning and expanding our capabilities. Our focus is on building the foundation of a technology company that approaches problems with both intelligence and engineering discipline."}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            COMPANY SNAPSHOT
        ====================================================== */}

        <section className="border-y border-slate-200 bg-[#F7F9FC] px-6 py-14 lg:px-10 lg:py-18">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
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
                    delay: index * 0.08,
                  }}
                  className="py-7 sm:px-8 sm:py-4 lg:px-12"
                >
                  <div className="flex items-end gap-3">
                    <span className="font-heading text-5xl font-semibold tracking-[-0.05em] text-slate-950 lg:text-6xl">
                      <CountUpStat value={stat.value}/>
                    </span>

                    <span className="pb-1 font-heading text-sm font-semibold text-[#057CFA]">
                      {stat.label}
                    </span>
                  </div>

                  <p className="mt-3 font-body text-xs text-slate-500">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================
            MISSION + VISION
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[170px]" />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                {lang === "de" ? "Unsere Ausrichtung" : "Our Direction"}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                {lang === "de" ? "Von klaren Zielen geleitet. Mit Weitblick entwickelt." : "Guided by purpose. Built with direction."}
              </h2>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {/* MISSION */}

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
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:p-10"
              >
                <div className="absolute left-0 top-10 h-16 w-[2px] bg-[#057CFA]" />

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-[#057CFA]">
                  {lang === "de" ? "Mission" : "Mission"}
                </p>

                <h3 className="mt-5 font-heading text-2xl font-semibold text-white sm:text-3xl">
                  {lang === "de" ? "Intelligente Lösungen für die reale Welt entwickeln." : "Build intelligence that works in the real world."}
                </h3>

                <p className="mt-5 max-w-xl font-body text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
                  {lang === "de" ? "Unsere Mission ist es, praxistaugliche intelligente Systeme und digitale Produkte zu entwickeln, die mithilfe von KI, Automatisierung und solider Softwareentwicklung reale Probleme lösen." : "Our mission is to build practical intelligent systems and digital products that solve real problems through AI, automation and strong engineering."}
                </p>
              </motion.div>

              {/* VISION */}

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
                  delay: 0.08,
                }}
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-8 lg:p-10"
              >
                <div className="absolute left-0 top-10 h-16 w-[2px] bg-[#002DCC]" />

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-[#057CFA]">
                  {lang === "de" ? "Vision" : "Vision"}
                </p>

                <h3 className="mt-5 font-heading text-2xl font-semibold text-white sm:text-3xl">
                  {lang === "de" ? "Ein vertrauenswürdiges KI-Unternehmen aufbauen." : "Grow into a trusted AI-focused technology company."}
                </h3>

                <p className="mt-5 max-w-xl font-body text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
                  {lang === "de" ? "Unsere Vision ist es, GenData Tech als Technologieunternehmen zu etablieren, das für nützliche, skalierbare und sorgfältig entwickelte KI-Lösungen steht." : "Our vision is to establish GenData Tech as a technology company known for useful, scalable and thoughtfully engineered AI-driven solutions."}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            PRINCIPLES
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              {/* INTRO */}

              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {lang === "de" ? "Unsere Grundsätze" : "Our Principles"}
                </p>

                <h2 className="mt-5 max-w-md font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  {lang === "de" ? "Wie wir Technologie verstehen." : "How we think about technology."}
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-900">
                  {lang === "de" ? "Wir verbinden praxisorientierte KI, durchdachtes Engineering und klare Lösungen für reale Anforderungen." : "Practical AI, thoughtful engineering and solutions built around real requirements define our approach."}
                </p>
              </div>

              {/* PRINCIPLE GRID */}

              <div className="grid gap-4 sm:grid-cols-2">
                {principles.map((principle, index) => (
                  <motion.div
                    key={principle.number}
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
                    className="rounded-[24px] border border-slate-200 bg-[#F9FAFC] p-6 transition duration-300 hover:border-[#057CFA]/30 hover:bg-white hover:shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
                  >
                    <span className="font-heading text-[12px] font-semibold text-[#057CFA]">
                      {principle.number}
                    </span>

                    <h3 className="mt-5 font-heading text-lg font-semibold text-slate-950">
                      {principle.title}
                    </h3>

                    <p className="mt-3 font-body text-sm leading-7 text-slate-900">
                      {principle.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            WHAT WE BUILD
        ====================================================== */}

        <section className="bg-[#F7F9FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                {lang === "de" ? "Was wir entwickeln" : "What We Build"}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {lang === "de" ? "Intelligenz trifft auf Engineering." : "Intelligence connected with engineering."}
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                {lang === "de" ? "Unsere Kompetenzen verbinden KI mit Software, Plattformen und vernetzten Systemen, um intelligente Lösungen praktisch nutzbar zu machen." : "Our capabilities combine AI with the software, platforms and connected systems required to put intelligence into practice."}
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon;

                return (
                  <motion.div
                    key={capability.title}
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
                    className="group rounded-[24px] border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#057CFA]/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#002DCC] transition group-hover:bg-[#057CFA] group-hover:text-white">
                      <Icon />
                    </div>

                    <h3 className="mt-6 font-heading text-lg font-semibold text-slate-950">
                      {capability.title}
                    </h3>

                    <p className="mt-3 font-body text-sm leading-7 text-slate-500">
                      {capability.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US — dedicated section */}
        <section className="bg-[#F4F8FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">{lang === "de" ? "Warum GenData Tech" : "Why Choose GenData Tech"}</p>
              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">{lang === "de" ? "Technologie mit klarem Ziel." : "Technology built around your needs."}</h2>
              <p className="mt-4 font-body text-sm leading-7 text-slate-600 sm:text-base">{lang === "de" ? "Wir verbinden KI-Kompetenz mit praxisorientierter Entwicklung und transparenter Zusammenarbeit." : "We combine AI expertise with practical engineering and clear collaboration to build solutions that serve real requirements."}</p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {title:lang==="de"?"KI im Mittelpunkt":"AI-first thinking",description:lang==="de"?"Intelligente Funktionen stehen dort im Fokus, wo sie echten Nutzen bringen.":"We apply intelligence where it can solve meaningful problems."},
                {title:lang==="de"?"Individuelle Lösungen":"Tailored engineering",description:lang==="de"?"Wir entwickeln passend zu Anforderungen, Nutzern und Arbeitsabläufen.":"Solutions are shaped around your workflows, users and technical needs."},
                {title:lang==="de"?"Klare Zusammenarbeit":"Clear collaboration",description:lang==="de"?"Wir kommunizieren Anforderungen und nächste Schritte transparent.":"We keep requirements, decisions and next steps understandable."}
              ].map((reason,index)=><div key={reason.title} className="rounded-2xl border border-slate-200 bg-white p-6"><span className="font-heading text-xs font-semibold text-[#057CFA]">0{index+1}</span><h3 className="mt-4 font-heading text-lg font-semibold text-slate-950">{reason.title}</h3><p className="mt-3 font-body text-sm leading-7 text-slate-600">{reason.description}</p></div>)}
            </div>
          </div>
        </section>

        {/* ======================================================
            OUR APPROACH
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] rounded-full bg-[#057CFA]/7 blur-[150px]" />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                {lang === "de" ? "Unser Vorgehen" : "Our Approach"}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                {lang === "de" ? "Vom Problem zur funktionierenden Lösung." : "From problem to working system."}
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                {lang === "de" ? "Technologie beginnt damit, das Problem zu verstehen. Unser Ansatz verbindet alle Phasen – von der Analyse bis zur kontinuierlichen Verbesserung." : "Technology starts with understanding the problem. Our approach keeps each stage connected from discovery through continuous improvement."}
              </p>
            </div>

            <div className="relative mt-14">
              {/* DESKTOP LINE */}

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
                    className="relative"
                  >
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#057CFA]/30 bg-[#06152C] font-heading text-[10px] font-semibold text-[#057CFA]">
                      {step.number}
                    </div>

                    <h3 className="mt-5 font-heading text-sm font-semibold text-white sm:text-base">
                      {step.title}
                    </h3>

                    <p className="mt-2 font-body text-xs leading-6 text-slate-200 sm:text-sm sm:leading-7">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            JOURNEY
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              {/* INTRO */}

              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {lang === "de" ? "Unser Weg" : "Our Journey"}
                </p>

                <h2 className="mt-5 max-w-md font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  {lang === "de" ? "Zwei Jahre Grundlagenarbeit." : "Two years of building the foundation."}
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  {lang === "de" ? "GenData Tech befindet sich noch in einer frühen Entwicklungsphase. Unser bisheriger Weg ist geprägt von Lernen, praktischer Umsetzung und dem stetigen Ausbau unserer KI-Kompetenzen." : "GenData Tech is still at an early stage. The journey so far is about learning, delivering and steadily strengthening our AI-focused technology direction."}
                </p>
              </div>

              {/* TIMELINE */}

              <div className="relative">
                <div className="absolute bottom-0 left-[18px] top-0 w-px bg-slate-200" />

                <div className="space-y-9">
                  {journey.map((item, index) => (
                    <motion.div
                      key={item.number}
                      initial={{
                        opacity: 1,
                        x: 15,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      className="relative grid grid-cols-[38px_1fr] gap-5"
                    >
                      <div className="relative z-10 mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-white shadow-sm">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#057CFA]" />
                      </div>

                      <div className="pb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-heading text-sm font-semibold text-[#002DCC]">
                            {item.year}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-slate-300" />

                          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-[#057CFA]">
                            {item.label}
                          </span>
                        </div>

                        <h3 className="mt-2 font-heading text-lg font-semibold text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-3 max-w-2xl font-body text-sm leading-7 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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
                    {lang === "de" ? "Mit GenData Tech entwickeln" : "Build With GenData Tech"}
                  </p>

                  <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    {lang === "de" ? "Sie planen eine intelligente Lösung?" : "Building something that needs intelligence?"}
                  </h2>

                  <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                    {lang === "de" ? "Sprechen Sie mit uns über KI, Automatisierung, digitale Produkte oder technische Lösungen." : "Talk to us about AI, automation, digital products or engineering solutions."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/Contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                  >
                    {lang === "de" ? "Kontakt aufnehmen" : "Contact Us"}
                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </Link>

                  <Link
                    to="/"
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:border-[#057CFA]/40 hover:bg-white/[0.07]"
                  >
                    {lang === "de" ? "GenData Tech entdecken" : "Explore GenData Tech"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      
    </>
  );
}

export default About;
