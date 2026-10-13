"use client"

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
function Products() {
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
        "A learning management platform designed to organize courses, learners, training content and learning activities in one connected system.",
      capabilities: [
        "Course Management",
        "Learner Management",
        "Training Content",
        "Learning Tracking",
      ],
      Link: "/contact?category=Products&offering=GenData%20LMS",
    },

    {
      icon: FiUsers,
      name: "GenData CRM",
      shortName: "CRM",
      description:
        "A customer relationship platform designed to organize customer information, interactions, follow-ups and business relationships.",
      capabilities: [
        "Customer Records",
        "Lead Management",
        "Follow-ups",
        "Interaction Tracking",
      ],
      Link: "/contact?category=Products&offering=GenData%20CRM",
    },

    {
      icon: FiGrid,
      name: "GenData ERP",
      shortName: "ERP",
      description:
        "A centralized business platform designed to connect operational information, workflows and management activities.",
      capabilities: [
        "Operations",
        "Business Records",
        "Workflow Management",
        "Centralized Data",
      ],
      Link: "/contact?category=Products&offering=GenData%20ERP",
    },

    {
      icon: FiCreditCard,
      name: "GenData Billing",
      shortName: "Billing",
      description:
        "A billing and business transaction platform designed to simplify invoice creation, records and billing-related workflows.",
      capabilities: [
        "Invoices",
        "Billing Records",
        "Customer Details",
        "Transaction Management",
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
      title: "Built Around the Workflow",
      description:
        "Products should support the process users actually need rather than adding unnecessary complexity.",
    },

    {
      icon: FiLayers,
      title: "Connected Information",
      description:
        "Data, users and workflows are structured so important information can work together within one platform.",
    },

    {
      icon: FiZap,
      title: "Practical Experience",
      description:
        "Interfaces and functionality are designed around useful everyday actions and clear user journeys.",
    },

    {
      icon: FiRepeat,
      title: "Designed to Evolve",
      description:
        "Product architecture considers future features, integrations and changing operational requirements.",
    },
  ];

  /* ======================================================
      PRODUCT APPROACH
  ====================================================== */

  const approach = [
    {
      number: "01",
      title: "Understand",
      description:
        "Understand the user, workflow and problem the product needs to support.",
    },

    {
      number: "02",
      title: "Structure",
      description:
        "Define the modules, information flow and product architecture.",
    },

    {
      number: "03",
      title: "Design",
      description:
        "Plan interfaces and user journeys around important actions.",
    },

    {
      number: "04",
      title: "Build",
      description:
        "Develop the required product functionality and supporting systems.",
    },

    {
      number: "05",
      title: "Connect",
      description: "Integrate data, APIs and other services where required.",
    },

    {
      number: "06",
      title: "Improve",
      description:
        "Continue refining functionality as product requirements evolve.",
    },
  ];

  /* ======================================================
      FAQ
  ====================================================== */

  const faqs = [
    {
      question: "What products does GenData Tech provide?",
      answer:
        "GenData Tech's product portfolio includes GenData LMS, GenData CRM, GenData ERP and GenData Billing.",
    },

    {
      question: "What is GenData LMS?",
      answer:
        "GenData LMS is a learning management platform designed around course organization, learner management, training content and learning activities.",
    },

    {
      question: "What is GenData CRM?",
      answer:
        "GenData CRM is designed to help organize customer information, leads, interactions and follow-up activities within one system.",
    },

    {
      question: "What is GenData ERP?",
      answer:
        "GenData ERP is designed as a centralized platform for connecting business information, operational workflows and management activities.",
    },

    {
      question: "What is GenData Billing?",
      answer:
        "GenData Billing is designed to support billing workflows including invoice creation, customer records and transaction-related information.",
    },

    {
      question: "Can I contact GenData Tech to learn more about a product?",
      answer:
        "Yes. You can use the Contact page, select Products as the enquiry category and choose the product you are interested in.",
    },

    {
      question: "Can GenData Tech products connect with other systems?",
      answer:
        "Integration possibilities depend on the product requirement and the external system involved. APIs and connected services can be considered where technically suitable.",
    },

    {
      question: "Can I request a product demonstration?",
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
  className="relative flex min-h-[610px] items-center overflow-hidden bg-[#030b18] px-6 pb-20 pt-32 sm:min-h-[650px] sm:pb-20 sm:pt-36 lg:min-h-[660px] lg:px-10 lg:pb-20 lg:pt-36"
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

        <div className="relative mx-auto w-full max-w-[1400px]">
            <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
              {/* HERO COPY */}

              <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
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
                  GenData Tech Products
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
                  className="mt-4 max-w-4xl font-heading text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
                >
                  Digital products built
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    around practical workflows.
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
                  className="mx-auto mt-5 max-w-2xl font-body text-sm leading-7 text-slate-300 sm:text-base lg:mx-0"
                >
                  GenData Tech develops digital products that bring information,
                  users and workflows together through structured software
                  platforms.
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
                    delay: 0.22,
                  }}
                  className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
                >
                  {["LMS", "CRM", "ERP", "Billing"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 font-body text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
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
                    delay: 0.28,
                  }}
                  className="mt-6 flex justify-center lg:justify-start"
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
                    className="group inline-flex items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                  >
                    Explore Our Products
                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </div>

              {/* ==================================================
                  PRODUCT HERO VISUAL
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
                className="relative mx-auto hidden h-[340px] w-full max-w-[430px] items-center justify-center lg:flex"
              >
                {/* OUTER RING */}

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

                {/* INNER RING */}

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

                {/* CENTER */}

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
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 flex h-[125px] w-[125px] flex-col items-center justify-center rounded-full border border-[#057CFA]/25 bg-[#06152C] shadow-[0_0_60px_rgba(5,124,250,0.14)]"
                >
                  <FiGrid className="text-xl text-[#057CFA]" />

                  <span className="mt-2 font-heading text-sm font-semibold text-white">
                    Products
                  </span>

                  <span className="mt-1 font-body text-[7px] uppercase tracking-[0.18em] text-slate-500">
                    GenData Tech
                  </span>
                </motion.div>

                {/* LMS */}

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
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute right-2 top-8 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[9px] font-semibold text-slate-300">
                    LMS
                  </p>
                </motion.div>

                {/* CRM */}

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
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-12 left-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[9px] font-semibold text-slate-300">
                    CRM
                  </p>
                </motion.div>

                {/* ERP */}

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
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-2 right-8 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[9px] font-semibold text-slate-300">
                    ERP
                  </p>
                </motion.div>

                {/* BILLING */}

                <motion.div
                  animate={
                    heroShouldAnimate
                      ? {
                          x: [0, -5, 0],
                        }
                      : {
                          x: 0,
                        }
                  }
                  transition={{
                    duration: 4.8,
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute left-5 top-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[9px] font-semibold text-slate-300">
                    Billing
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            PRODUCT INTRODUCTION
        ====================================================== */}

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Product Portfolio
                </p>

                <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Software products for learning and business operations.
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

        <section ref={productsRef} id="products" className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                Our Products
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                A growing product ecosystem from GenData Tech.
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
                      opacity: 0.96,
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
                        <p className="font-body text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Core Capabilities
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
                        Enquire About Product
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

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Product Thinking
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Products shaped around useful everyday workflows.
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

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[170px]" />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                Product Approach
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                From user need to structured digital product.
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-400 sm:text-base">
                Product development connects requirements, architecture, user
                experience and engineering through one continuous process.
              </p>
            </div>

            <div className="relative mt-14">
              <div className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-[#057CFA]/25 to-transparent lg:block" />

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
                {approach.map((step, index) => (
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
                      delay: index * 0.06,
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
            CONNECTED PRODUCT ECOSYSTEM
        ====================================================== */}

        <section className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Product Ecosystem
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Different products. One technology direction.
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  Our product portfolio addresses different areas while
                  following a consistent approach to usable software, structured
                  data and connected workflows.
                </p>
              </div>

              <motion.div
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
                      label: "Operations",
                      product: "GenData ERP",
                    },

                    {
                      label: "Billing",
                      product: "GenData Billing",
                    },
                  ].map((item) => (
                    <div
                      key={item.product}
                      className="rounded-2xl border border-slate-100 bg-[#F9FAFC] p-5"
                    >
                      <p className="font-body text-[9px] font-semibold uppercase tracking-[0.17em] text-[#057CFA]">
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

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                Frequently Asked Questions
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Questions about GenData Tech products.
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
