"use client"

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
  FiGitBranch,
  FiLayout,
  FiMonitor,
  FiRepeat,
  FiSearch,
  FiSmartphone,
  FiTarget,
  FiZap,
} from "react-icons/fi"

import Link from "../../layout/LocalizedLink"

function WebDevelopment() {
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
      title: "Corporate Websites",
      description:
        "Professional websites designed to clearly communicate a company's services, identity and digital presence.",
    },

    {
      number: "02",
      title: "Startup Websites",
      description:
        "Modern websites designed for startups that need to explain their product, technology and value proposition clearly.",
    },

    {
      number: "03",
      title: "Product Websites",
      description:
        "Focused digital experiences for presenting software products, platforms, applications and technology solutions.",
    },

    {
      number: "04",
      title: "Responsive Development",
      description:
        "Interfaces designed to work smoothly across desktop, tablet and mobile screen sizes.",
    },

    {
      number: "05",
      title: "Performance-focused Development",
      description:
        "Websites structured with attention to loading performance, responsive behavior and efficient frontend delivery.",
    },

    {
      number: "06",
      title: "SEO-ready Structure",
      description:
        "Websites developed with semantic structure, accessible content and technical foundations that support search visibility.",
    },
  ]


  /* ======================================================
      TECHNOLOGY STACK
  ====================================================== */

  const technologyStack = [
    {
      icon: FiCode,
      category: "Frontend",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
      ],
    },

    {
      icon: FiLayout,
      category: "UI Styling",
      technologies: [
        "Tailwind CSS",
        "Responsive Design",
      ],
    },

    {
      icon: FiZap,
      category: "Development",
      technologies: [
        "Vite",
        "Component Architecture",
      ],
    },

    {
      icon: FiSearch,
      category: "SEO Foundation",
      technologies: [
        "Semantic HTML",
        "Metadata",
        "Structured Content",
      ],
    },

    {
      icon: FiMonitor,
      category: "Web Experience",
      technologies: [
        "Responsive UI",
        "Performance",
        "Accessibility",
      ],
    },

    {
      icon: FiGitBranch,
      category: "Development Tools",
      technologies: [
        "Git",
        "GitHub",
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
        "Understand the company, audience, website goal and required pages.",
    },

    {
      number: "02",
      title: "Structure",
      description:
        "Plan page hierarchy, navigation and content organization.",
    },

    {
      number: "03",
      title: "Interface",
      description:
        "Create a modern responsive interface aligned with the brand.",
    },

    {
      number: "04",
      title: "Development",
      description:
        "Build the website using suitable frontend technologies.",
    },

    {
      number: "05",
      title: "Optimization",
      description:
        "Review responsiveness, performance and technical SEO foundations.",
    },

    {
      number: "06",
      title: "Testing",
      description:
        "Test pages, navigation, forms and behavior across screen sizes.",
    },

    {
      number: "07",
      title: "Deployment",
      description:
        "Prepare the completed website for production publishing.",
    },
  ]


  /* ======================================================
      WHY GENDATA TECH
  ====================================================== */

  const reasons = [
    {
      icon: FiTarget,
      title: "Purpose-led Structure",
      description:
        "We design the website around what visitors need to understand and what the business needs the website to achieve.",
    },

    {
      icon: FiSmartphone,
      title: "Responsive by Design",
      description:
        "Layouts are developed for desktop, tablet and mobile rather than treating mobile responsiveness as an afterthought.",
    },

    {
      icon: FiZap,
      title: "Performance Awareness",
      description:
        "We consider loading performance, layout stability and efficient frontend behavior during development.",
    },

    {
      icon: FiRepeat,
      title: "Built to Evolve",
      description:
        "Website architecture is planned so pages and content can be expanded as the business grows.",
    },
  ]


  /* ======================================================
      FAQ
  ====================================================== */

  const faqs = [
    {
      question:
        "What types of websites does GenData Tech develop?",
      answer:
        "We develop websites for companies, startups, products and digital brands based on their content, business requirements and target audience.",
    },

    {
      question:
        "Do you create responsive websites?",
      answer:
        "Yes. Responsive development is part of our web development approach so the website can adapt to desktop, tablet and mobile screen sizes.",
    },

    {
      question:
        "Do you build websites using React?",
      answer:
        "Yes. React can be used for websites and frontend experiences where component-based development and interactive functionality are suitable.",
    },

    {
      question:
        "Can you redesign an existing website?",
      answer:
        "Yes. An existing website can be reviewed and redesigned depending on its current technology, content and the required changes.",
    },

    {
      question:
        "Will the website be SEO friendly?",
      answer:
        "We can build the website with technical SEO foundations such as semantic structure, page metadata, responsive design and performance-conscious development. Search rankings also depend on content, authority, competition and ongoing SEO work.",
    },

    {
      question:
        "Can you add contact forms and enquiry functionality?",
      answer:
        "Yes. Contact forms and enquiry workflows can be integrated depending on the website requirements and selected backend or form-processing method.",
    },

    {
      question:
        "Can the website be expanded with additional pages later?",
      answer:
        "Yes. We can structure the website so additional service pages, products, blogs or other content can be added as the business grows.",
    },

    {
      question:
        "Can I contact GenData Tech if I only have a basic website idea?",
      answer:
        "Yes. You can share the purpose of the website, your company information and the result you want to achieve. The structure can then be planned from those requirements.",
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
          className="relative overflow-hidden bg-[#030b18] px-6 pb-16 pt-28 sm:pb-18 sm:pt-30 lg:px-10 lg:pb-28 lg:pt-28"
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

            <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">

              {/* HERO COPY */}

              <div>

                <motion.p
                  initial={{
                    opacity: 0.96,
                    y: 12,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  transition={{
                    duration: 0.5,
                  }}
                  className="font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-[#057CFA]"
                >
                  Web Development
                </motion.p>


                <motion.h1
                  initial={{
                    opacity: 0.96,
                    y: 20,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.08,
                  }}
                  className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl"
                >
                  Build a digital presence

                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    designed to perform.
                  </span>
                </motion.h1>


                <motion.p
                  initial={{
                    opacity: 0.96,
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
                    duration: 0.55,
                    delay: 0.15,
                  }}
                  className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-300 sm:text-base"
                >
                  GenData Tech develops modern, responsive and
                  performance-focused websites for businesses,
                  startups, products and digital brands.
                </motion.p>


                <motion.div
                  initial={{
                    opacity: 0.96,
                    y: 12,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.28,
                  }}
                  className="mt-6"
                >

                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                  >
                    Discuss Your Website

                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </Link>

                </motion.div>


                <motion.div
                  initial={{
                    opacity: 0.96,
                    y: 12,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.22,
                  }}
                  className="mt-6 flex flex-wrap gap-2"
                >

                  {[
                    "Responsive",
                    "Modern UI",
                    "Performance",
                    "SEO-ready",
                  ].map((item) => (

                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 font-body text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-300"
                    >
                      {item}
                    </span>

                  ))}

                </motion.div>

              </div>



              {/* ==================================================
                  COMPACT HERO VISUAL
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0.96,
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
                  duration: 0.65,
                  delay: 0.15,
                }}
                className="relative mx-auto hidden h-[420px] w-full max-w-[430px] items-center justify-center lg:flex"
              >

                <motion.div
                  className="absolute h-[290px] w-[290px] rounded-full border border-white/[0.06]"
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
                          duration: 34,
                          repeat: Infinity,
                          ease: "linear",
                        }
                      : {
                          duration: 0.2,
                        }
                  }
                >
                  <div className="absolute left-1/2 top-[-4px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#057CFA] shadow-[0_0_18px_rgba(5,124,250,0.9)]" />
                </motion.div>


                <motion.div
                  className="absolute h-[205px] w-[205px] rounded-full border border-[#057CFA]/15"
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
                          duration: 25,
                          repeat: Infinity,
                          ease: "linear",
                        }
                      : {
                          duration: 0.2,
                        }
                  }
                >
                  <div className="absolute bottom-[18px] right-[14px] h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_14px_rgba(147,197,253,0.8)]" />
                </motion.div>


                <motion.div
                  animate={
                    heroShouldAnimate
                      ? {
                          scale: [1, 1.035, 1],
                        }
                      : {
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 3,
                    repeat:
                      heroShouldAnimate
                        ? Infinity
                        : 0,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 flex h-[125px] w-[125px] flex-col items-center justify-center rounded-full border border-[#057CFA]/25 bg-[#06152C] shadow-[0_0_60px_rgba(5,124,250,0.14)]"
                >

                  <FiMonitor className="text-xl text-[#057CFA]" />

                  <span className="mt-2 font-heading text-sm font-semibold text-white">
                    Web
                  </span>

                  <span className="mt-1 font-body text-[7px] uppercase tracking-[0.18em] text-slate-500">
                    Digital Layer
                  </span>

                </motion.div>


                <motion.div
                  animate={
                    heroShouldAnimate
                      ? {
                          y: [0, -6, 0],
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
                  className="absolute right-2 top-8 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[9px] font-semibold text-slate-300">
                    Responsive
                  </p>
                </motion.div>


                <motion.div
                  animate={
                    heroShouldAnimate
                      ? {
                          x: [0, 5, 0],
                        }
                      : {
                          x: 0,
                        }
                  }
                  transition={{
                    duration: 4.5,
                    repeat:
                      heroShouldAnimate
                        ? Infinity
                        : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-12 left-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[9px] font-semibold text-slate-300">
                    Performance
                  </p>
                </motion.div>


                <motion.div
                  animate={
                    heroShouldAnimate
                      ? {
                          y: [0, 6, 0],
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
                  className="absolute bottom-2 right-8 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[9px] font-semibold text-slate-300">
                    SEO
                  </p>
                </motion.div>

              </motion.div>

            </div>

          </div>

        </section>



        {/* ======================================================
            SERVICE OVERVIEW
        ====================================================== */}

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-[1400px]">

            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">

              <div>

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Service Overview
                </p>

                <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Your website should communicate clearly and work reliably.
                </h2>

              </div>


              <div className="space-y-5">

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  A website is often the first digital interaction
                  people have with a company, product or service.
                </p>

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  GenData Tech develops websites that combine clear
                  information architecture, responsive interfaces and
                  practical frontend engineering.
                </p>

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  We focus on building websites that can communicate
                  effectively today while remaining structured for
                  future expansion.
                </p>

              </div>

            </div>

          </div>

        </section>



        {/* ======================================================
            WHAT WE OFFER
        ====================================================== */}

        <section className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-[1400px]">

            <div className="max-w-3xl">

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                What We Offer
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Website development for modern digital businesses.
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                Our web development approach combines interface design,
                responsive engineering, performance and a structured
                content foundation.
              </p>

            </div>


            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {offerings.map((item, index) => (

                <motion.div
                  key={item.number}
                  initial={{
                    opacity: 0.96,
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
            USE CASES / PROJECTS

            Keep disabled until approved real project examples
            are available.
        ====================================================== */}

        {/*
        <section className="bg-white px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1400px]">

            Future real website/project showcase section.

          </div>
        </section>
        */}



        {/* ======================================================
            TECHNOLOGY STACK
        ====================================================== */}

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-[1400px]">

            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">

              <div>

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Technology Stack
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Technologies behind modern web experiences.
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  The exact stack depends on the website's content,
                  interaction requirements, future expansion and
                  deployment environment.
                </p>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                {technologyStack.map((stack, index) => {

                  const Icon = stack.icon

                  return (

                    <motion.div
                      key={stack.category}
                      initial={{
                        opacity: 0.96,
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

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[170px]" />


          <div className="relative mx-auto max-w-[1400px]">

            <div className="max-w-3xl">

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                Development Process
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                From website requirement to production.
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-400 sm:text-base">
                We move through structure, interface development,
                testing and optimization before preparing the website
                for deployment.
              </p>

            </div>


            <div className="relative mt-14">

              <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-[#057CFA]/25 to-transparent xl:block" />


              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">

                {process.map((step, index) => (

                  <motion.div
                    key={step.number}
                    initial={{
                      opacity: 0.96,
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

        <section className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-[1400px]">

            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">

              <div>

                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Why GenData Tech
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Web development with design and engineering aligned.
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  We focus on creating websites that communicate
                  clearly while maintaining a strong technical
                  foundation.
                </p>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                {reasons.map((reason, index) => {

                  const Icon = reason.icon

                  return (

                    <motion.div
                      key={reason.title}
                      initial={{
                        opacity: 0.96,
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

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

          <div className="mx-auto max-w-[1400px]">

            <div className="mx-auto max-w-3xl text-center">

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                Frequently Asked Questions
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Questions about web development.
              </h2>

              <p className="mt-5 font-body text-sm leading-7 text-slate-500 sm:text-base">
                Common questions about website development,
                responsive design, performance and technical structure.
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

        <section className="bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-[1400px]">

            <motion.div
              initial={{
                opacity: 0.96,
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
                    Build Your Website
                  </p>

                  <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    Need a modern website for your company or product?
                  </h2>

                  <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-400 sm:text-base">
                    Share your website requirement, audience and
                    business goals. We can discuss the right structure
                    and development direction.
                  </p>

                </div>


                <Link
                  to="/contact"
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                >
                  Discuss Your Website

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


export default WebDevelopment