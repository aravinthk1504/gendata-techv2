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
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiRepeat,
  FiTarget,
} from "react-icons/fi"

import Link from "../../layout/LocalizedLink"

function AIMLDevelopment() {
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
      title: "AI Model Development",
      description:
        "Custom artificial intelligence models designed around specific data, business requirements and application needs.",
    },

    {
      number: "02",
      title: "Machine Learning Solutions",
      description:
        "Machine learning systems for prediction, classification, pattern recognition and intelligent decision support.",
    },

    {
      number: "03",
      title: "Deep Learning",
      description:
        "Deep learning solutions using neural networks for more complex AI problems and data-driven applications.",
    },

    {
      number: "04",
      title: "AI Automation",
      description:
        "Intelligent automation designed to reduce repetitive work and connect AI with operational workflows.",
    },

    {
      number: "05",
      title: "Agentic AI",
      description:
        "AI agent systems capable of reasoning, using tools, completing tasks and supporting multi-step workflows.",
    },

    {
      number: "06",
      title: "Custom AI Solutions",
      description:
        "Purpose-built AI applications combining models, automation, APIs and business logic into a tailored system.",
    },
  ]


  /* ======================================================
      TECHNOLOGY STACK
  ====================================================== */

  const technologyStack = [
    {
      icon: FiCode,
      category: "Programming",
      technologies: [
        "Python",
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
      title: "Requirement",
      description:
        "Understand the problem, goal and expected AI outcome.",
    },

    {
      number: "02",
      title: "Data Understanding",
      description:
        "Review available data, structure, quality and model requirements.",
    },

    {
      number: "03",
      title: "Model Design",
      description:
        "Select suitable algorithms, architecture and development strategy.",
    },

    {
      number: "04",
      title: "Training",
      description:
        "Train and refine the model using prepared data and suitable methods.",
    },

    {
      number: "05",
      title: "Evaluation",
      description:
        "Evaluate model performance using relevant metrics and validation.",
    },

    {
      number: "06",
      title: "Integration",
      description:
        "Connect the model with the application, API or required workflow.",
    },

    {
      number: "07",
      title: "Deployment",
      description:
        "Prepare the AI system for practical use and future improvement.",
    },
  ]


  /* ======================================================
      WHY GENDATA TECH
  ====================================================== */

  const reasons = [
    {
      icon: FiTarget,
      title: "Problem-first Development",
      description:
        "We begin by understanding the actual requirement before selecting the model or technology.",
    },

    {
      icon: FiCpu,
      title: "AI-focused Direction",
      description:
        "AI and machine learning remain central to our technology and product development direction.",
    },

    {
      icon: FiLayers,
      title: "AI + Software Integration",
      description:
        "We connect models with web applications, APIs, software platforms and business workflows.",
    },

    {
      icon: FiRepeat,
      title: "Iterative Improvement",
      description:
        "AI systems are evaluated and refined based on performance, requirements and future expansion.",
    },
  ]


  /* ======================================================
      FAQ
  ====================================================== */

  const faqs = [
    {
      question:
        "What AI and machine learning services does GenData Tech provide?",
      answer:
        "GenData Tech provides AI model development, machine learning solutions, deep learning, AI automation, Agentic AI and customized AI applications.",
    },

    {
      question:
        "Can you build a custom AI model for a specific business requirement?",
      answer:
        "Yes. AI models can be designed around a specific requirement when suitable data, objectives and technical conditions are available.",
    },

    {
      question:
        "What programming language do you use for AI development?",
      answer:
        "Python is our primary programming language for AI and machine learning development, supported by relevant AI, data and backend libraries.",
    },

    {
      question:
        "Which machine learning frameworks do you use?",
      answer:
        "Depending on the requirement, we can work with technologies such as Scikit-learn, TensorFlow and PyTorch.",
    },

    {
      question:
        "Can AI models be integrated into an existing application?",
      answer:
        "Yes. AI models can be connected with applications through APIs, backend services or other suitable integration methods depending on the existing system architecture.",
    },

    {
      question:
        "Do you provide AI automation and Agentic AI development?",
      answer:
        "Yes. AI automation and Agentic AI are part of our AI development direction, including intelligent workflows and AI agents that can interact with tools and systems.",
    },

    {
      question:
        "Do I need to know which AI technology my project requires?",
      answer:
        "No. You can share the problem, available data and expected outcome. We can then help identify an appropriate technical direction.",
    },

    {
      question:
        "Can I contact GenData Tech to discuss an early-stage AI idea?",
      answer:
        "Yes. You do not need to have a complete specification before contacting us. Early-stage requirements can be discussed to understand the most suitable next step.",
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

            <div className="grid min-w-0 min-h-[530px] items-center gap-10 sm:min-h-[530px] sm:gap-12 lg:min-h-[420px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">

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
                  AI / ML Development
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
                  Build intelligent systems

                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    around real requirements.
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
                  GenData Tech develops AI and machine learning
                  solutions designed around data, workflows and
                  practical application requirements.
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
                    className="group inline-flex items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                  >
                    Discuss Your AI Requirement

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
                    "AI Automation",
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



              {/* HERO VISUAL */}

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

                  <FiCpu className="text-2xl text-[#057CFA]" />

                  <span className="mt-3 font-heading text-sm font-semibold text-white">
                    AI / ML
                  </span>

                  <span className="mt-1 font-body text-[8px] uppercase tracking-[0.2em] text-slate-300">
                    Intelligence Layer
                  </span>

                </motion.div>


                {/* NODE */}

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
                  <p className="font-body text-[9px] font-semibold text-slate-200">
                    Models
                  </p>
                </motion.div>


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
                  <p className="font-body text-[9px] font-semibold text-slate-200">
                    Automation
                  </p>
                </motion.div>


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
                  <p className="font-body text-[9px] font-semibold text-slate-200">
                    Agents
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
                  AI development built around the problem first.
                </h2>

              </div>


              <div className="space-y-5">

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  AI development is most effective when it begins with
                  a clear understanding of the problem, available data
                  and expected outcome.
                </p>


                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  GenData Tech develops artificial intelligence and
                  machine learning solutions ranging from custom models
                  to intelligent automation and AI-powered applications.
                </p>


                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Our approach combines model development with the
                  software integration required to make AI usable within
                  real applications and workflows.
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
                AI capabilities designed for different requirements.
              </h2>


              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                Our AI development direction covers model development,
                automation, intelligent agents and custom AI applications.
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
        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="mx-auto max-w-[1400px]">

            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
              Use Cases
            </p>

            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              Practical applications of AI and machine learning.
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
                  Technologies we use to build AI solutions.
                </h2>


                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  The exact technology stack depends on the problem,
                  data, application architecture and deployment
                  requirements.
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

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[170px]" />


          <div className="relative mx-auto max-w-[1400px]">

            <div className="max-w-3xl">

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                Development Process
              </p>


              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                From requirement to deployed intelligence.
              </h2>


              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                AI development moves through multiple stages of
                understanding, experimentation, validation and
                integration.
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

        <section className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="mx-auto max-w-[1400px]">

            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">

              <div>

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Why GenData Tech
                </p>


                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  AI development connected with practical engineering.
                </h2>


                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  We approach AI as part of a complete technology
                  system rather than treating the model as an isolated
                  component.
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

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-32">

          <div className="mx-auto max-w-[1400px]">

            <div className="mx-auto max-w-3xl text-center">

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                Frequently Asked Questions
              </p>


              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Questions about AI & ML development.
              </h2>


              <p className="mt-5 font-body text-sm leading-7 text-slate-500 sm:text-base">
                Common questions about our artificial intelligence,
                machine learning and AI integration services.
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

        <section className="bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

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
                    Start an AI Project
                  </p>


                  <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    Have an AI idea or machine learning requirement?
                  </h2>


                  <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                    Share the problem, available data or expected
                    outcome. We can discuss the most suitable
                    technical direction.
                  </p>

                </div>


                <Link
                  to="/contact"
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                >
                  Discuss Your Requirement

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