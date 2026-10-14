"use client"

import ProcessFlowGlow from "../../layout/ProcessFlowGlow"

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

function FullStackDevelopment() {
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
      title: "Frontend Development",
      description:
        "Modern, responsive and interactive user interfaces designed for web applications, dashboards and digital platforms.",
    },

    {
      number: "02",
      title: "Backend Development",
      description:
        "Backend systems responsible for application logic, data processing, APIs, authentication and business workflows.",
    },

    {
      number: "03",
      title: "API Development",
      description:
        "REST APIs and backend integrations that connect frontend applications, databases and external services.",
    },

    {
      number: "04",
      title: "Database Integration",
      description:
        "Structured database integration for storing, managing and retrieving application data efficiently.",
    },

    {
      number: "05",
      title: "Authentication & Security",
      description:
        "User authentication, authorization and access-control systems designed around application requirements.",
    },

    {
      number: "06",
      title: "Business Platforms",
      description:
        "Full-stack platforms including dashboards, management systems and custom business applications.",
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
        "Python",
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
      title: "Requirement",
      description:
        "Understand the users, application goals and required functionality.",
    },

    {
      number: "02",
      title: "Architecture",
      description:
        "Plan the frontend, backend, database and application structure.",
    },

    {
      number: "03",
      title: "UI Development",
      description:
        "Build responsive interfaces and application interactions.",
    },

    {
      number: "04",
      title: "Backend Development",
      description:
        "Develop APIs, business logic, authentication and data handling.",
    },

    {
      number: "05",
      title: "Integration",
      description:
        "Connect frontend, backend, databases and external services.",
    },

    {
      number: "06",
      title: "Testing",
      description:
        "Validate functionality, usability and application behavior.",
    },

    {
      number: "07",
      title: "Deployment",
      description:
        "Prepare the application for production and real-world use.",
    },
  ]


  /* ======================================================
      WHY GENDATA TECH
  ====================================================== */

  const reasons = [
    {
      icon: FiTarget,
      title: "Requirement-first Development",
      description:
        "We start by understanding the application requirement before choosing the technical architecture.",
    },

    {
      icon: FiLayers,
      title: "Frontend + Backend",
      description:
        "We approach the application as one connected system rather than separate frontend and backend components.",
    },

    {
      icon: FiCode,
      title: "Custom Development",
      description:
        "Application functionality is designed around specific workflows, users and business requirements.",
    },

    {
      icon: FiRepeat,
      title: "Scalable Structure",
      description:
        "We plan applications with maintainability, integration and future growth in mind.",
    },
  ]


  /* ======================================================
      FAQ
  ====================================================== */

  const faqs = [
    {
      question:
        "What is full stack development?",
      answer:
        "Full stack development covers both the user-facing frontend and the backend systems that manage application logic, APIs, authentication, databases and integrations.",
    },

    {
      question:
        "What types of full stack applications can GenData Tech develop?",
      answer:
        "We can develop web applications, dashboards, business platforms, internal tools, management systems and custom applications based on project requirements.",
    },

    {
      question:
        "Which frontend technologies do you use?",
      answer:
        "For modern frontend development, we work with technologies such as React, JavaScript, HTML, CSS and Tailwind CSS depending on the application requirement.",
    },

    {
      question:
        "Which backend technologies do you use?",
      answer:
        "Our backend development can use Python-based frameworks such as Flask, Django and FastAPI depending on the architecture and application requirements.",
    },

    {
      question:
        "Can you develop APIs for an application?",
      answer:
        "Yes. We can develop and integrate APIs that connect frontend applications, databases, external platforms and other backend services.",
    },

    {
      question:
        "Can you add authentication and user roles?",
      answer:
        "Yes. Authentication, authorization and role-based access can be included depending on the application's user structure and security requirements.",
    },

    {
      question:
        "Can AI features be integrated into a full stack application?",
      answer:
        "Yes. AI models, automation or intelligent features can be integrated with a full stack application through APIs or backend services when required.",
    },

    {
      question:
        "Can I discuss an application idea before the full requirement is finalized?",
      answer:
        "Yes. You can share the application idea, target users and expected outcome even if the complete specification has not yet been finalized.",
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

            <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">

              {/* HERO COPY */}

              <div>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 15,
                        }
                  }
                  transition={{
                    duration: 0.5,
                  }}
                  className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-[#057CFA]"
                >
                  Full Stack Development
                </motion.p>


                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 25,
                        }
                  }
                  transition={{
                    duration: 0.65,
                    delay: 0.08,
                  }}
                  className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-[1.07] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
                >
                  Build complete applications

                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    from interface to backend.
                  </span>
                </motion.h1>


                <motion.p
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 18,
                        }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.16,
                  }}
                  className="mt-7 max-w-2xl font-body text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 lg:mt-5"
                >
                  GenData Tech develops full-stack applications that
                  connect modern user interfaces with backend systems,
                  databases, APIs and application logic.
                </motion.p>


                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
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
                    className="group inline-flex items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                  >
                    Discuss Your Application

                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </Link>

                </motion.div>


                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
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
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-300"
                    >
                      {item}
                    </span>

                  ))}

                </motion.div>

              </div>



              {/* ==================================================
                  HERO VISUAL
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={
                  heroInView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {
                        opacity: 0,
                        scale: 0.96,
                      }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.16,
                }}
                className="relative mx-auto hidden h-[420px] w-full max-w-[480px] items-center justify-center lg:flex"
              >

                {/* OUTER RING */}

                <motion.div
                  className="absolute h-[350px] w-[350px] rounded-full border border-white/[0.06]"
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
                  <div className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#057CFA] shadow-[0_0_18px_rgba(5,124,250,0.9)]" />
                </motion.div>


                {/* INNER RING */}

                <motion.div
                  className="absolute h-[250px] w-[250px] rounded-full border border-[#057CFA]/15"
                  animate={
                    heroShouldAnimate
                      ? {
                          rotate: -360,
                        }
                      : {
                          rotate: 0,
                        }
                  }
                  transition={
                    heroShouldAnimate
                      ? {
                          duration: 26,
                          repeat: Infinity,
                          ease: "linear",
                        }
                      : {
                          duration: 0.2,
                        }
                  }
                >
                  <div className="absolute bottom-[25px] right-[20px] h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_14px_rgba(147,197,253,0.8)]" />
                </motion.div>


                {/* CENTER */}

                <motion.div
                  animate={
                    heroShouldAnimate
                      ? {
                          scale: [1, 1.04, 1],
                        }
                      : {
                          scale: 1,
                        }
                  }
                  transition={
                    heroShouldAnimate
                      ? {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : {
                          duration: 0.2,
                        }
                  }
                  className="relative z-10 flex h-[150px] w-[150px] flex-col items-center justify-center rounded-full border border-[#057CFA]/25 bg-[#06152C] shadow-[0_0_70px_rgba(5,124,250,0.14)]"
                >

                  <FiLayers className="text-2xl text-[#057CFA]" />

                  <span className="mt-3 font-heading text-sm font-semibold text-white">
                    Full Stack
                  </span>

                  <span className="mt-1 font-body text-[8px] uppercase tracking-[0.2em] text-slate-500">
                    Application Layer
                  </span>

                </motion.div>


                {/* FRONTEND */}

                <motion.div
                  animate={
                    heroShouldAnimate
                      ? {
                          y: [0, -7, 0],
                        }
                      : {
                          y: 0,
                        }
                  }
                  transition={{
                    duration: 4,
                    repeat:
                      heroShouldAnimate
                        ? Infinity
                        : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute right-0 top-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[10px] font-semibold text-slate-300">
                    Frontend
                  </p>
                </motion.div>


                {/* BACKEND */}

                <motion.div
                  animate={
                    heroShouldAnimate
                      ? {
                          x: [0, 6, 0],
                        }
                      : {
                          x: 0,
                        }
                  }
                  transition={{
                    duration: 4.8,
                    repeat:
                      heroShouldAnimate
                        ? Infinity
                        : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-16 left-0 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[10px] font-semibold text-slate-300">
                    Backend
                  </p>
                </motion.div>


                {/* DATABASE */}

                <motion.div
                  animate={
                    heroShouldAnimate
                      ? {
                          y: [0, 7, 0],
                        }
                      : {
                          y: 0,
                        }
                  }
                  transition={{
                    duration: 5,
                    repeat:
                      heroShouldAnimate
                        ? Infinity
                        : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-6 right-10 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[10px] font-semibold text-slate-300">
                    Database
                  </p>
                </motion.div>

              </motion.div>

            </div>

          </div>

        </section>



        {/* ======================================================
            SERVICE OVERVIEW
        ====================================================== */}

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="mx-auto max-w-[1400px]">

            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">

              <div>

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Service Overview
                </p>


                <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  One connected application from frontend to database.
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

        <section className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="mx-auto max-w-[1400px]">

            <div className="max-w-3xl">

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                What We Offer
              </p>


              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Complete application development capabilities.
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
                    opacity: 0,
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
        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="mx-auto max-w-[1400px]">

            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
              Use Cases
            </p>

            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              Full stack solutions for real application requirements.
            </h2>

          </div>

        </section>
        */}



        {/* ======================================================
            TECHNOLOGY STACK
        ====================================================== */}

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="mx-auto max-w-[1400px]">

            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">

              <div>

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Technology Stack
                </p>


                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Technologies for building complete applications.
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
                        opacity: 0,
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

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[170px]" />


          <div className="relative mx-auto max-w-[1400px]">

            <div className="max-w-3xl">

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                Development Process
              </p>


              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                From requirement to complete application.
              </h2>


              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-400 sm:text-base">
                Full stack development connects interface design,
                backend development, data management and integration
                through one structured process.
              </p>

            </div>


            <div className="relative mt-14">

              <ProcessFlowGlow breakpoint="xl" />


              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">

                {process.map((step, index) => (

                  <motion.div
                    key={step.number}
                    initial={{
                      opacity: 0,
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

        <section className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="mx-auto max-w-[1400px]">

            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">

              <div>

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Why GenData Tech
                </p>


                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Full stack development with connected engineering.
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
                        opacity: 0,
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

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="mx-auto max-w-[1400px]">

            <div className="mx-auto max-w-3xl text-center">

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                Frequently Asked Questions
              </p>


              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Questions about full stack development.
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
                            opacity: 0,
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

        <section className="bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-[1400px]">

            <motion.div
              initial={{
                opacity: 0,
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

                  <p className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#057CFA]">
                    Build a Full Stack Application
                  </p>


                  <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    Have an application idea or platform requirement?
                  </h2>


                  <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-400 sm:text-base">
                    Share your idea, users and required functionality.
                    We can discuss the most suitable application
                    architecture and development direction.
                  </p>

                </div>


                <Link
                  to="/contact"
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                >
                  Discuss Your Application

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