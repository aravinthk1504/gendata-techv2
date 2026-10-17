"use client"

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

function Services() {
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
      title: "AI / ML Development",
      description:
        "Custom AI models, machine learning solutions, intelligent automation and Agentic AI systems designed around real business requirements.",
      useCases: [
        "AI Models",
        "Machine Learning",
        "AI Automation",
        "Agentic AI",
      ],
      path: "/services/ai-ml-development",
    },

    {
      icon: FiLayers,
      title: "Full Stack Development",
      description:
        "Complete application development covering frontend, backend, databases, APIs and system integration.",
      useCases: ["Web Applications", "Dashboards", "Business Platforms"],
      path: "/services/full-stack-development",
    },

    {
      icon: FiMonitor,
      title: "Web Development",
      description:
        "Modern, responsive and performance-focused websites designed for companies, startups, products and digital brands.",
      useCases: ["Corporate Websites", "Startup Websites", "Product Websites"],
      path: "/services/web-development",
    },

    {
      icon: FiCode,
      title: "Software Development",
      description:
        "Custom software systems designed around business processes, internal operations and digital workflows.",
      useCases: ["Business Software", "Internal Tools", "Management Systems"],
      path: "/services/software-development",
    },

    {
      icon: FiSmartphone,
      title: "App Development",
      description:
        "Mobile applications designed around practical functionality, modern user experiences and connected services.",
      useCases: ["Android Apps", "iOS Apps", "Business Apps"],
      path: "/services/app-development",
    },

    {
      icon: FiCpu,
      title: "IoT Solutions",
      description:
        "Connected IoT systems combining sensors, devices, monitoring, automation and intelligent software.",
      useCases: ["Sensor Monitoring", "Automation", "Connected Systems"],
      path: "/services/iot-solutions",
    },
  ];

  /* ======================================================
      OUTCOMES
  ====================================================== */

  const outcomes = [
    {
      title: "Automate Repetitive Processes",
      description:
        "Reduce manual effort through intelligent workflows and connected automation systems.",
    },

    {
      title: "Build Intelligent Products",
      description:
        "Add AI capabilities to software products, digital platforms and applications.",
    },

    {
      title: "Modernize Workflows",
      description:
        "Transform fragmented manual processes into connected digital systems.",
    },

    {
      title: "Create Scalable Applications",
      description:
        "Build applications designed to evolve as users, requirements and operations grow.",
    },

    {
      title: "Connect Devices & Software",
      description:
        "Bring sensors, IoT devices, monitoring platforms and software together.",
    },

    {
      title: "Turn Ideas Into Solutions",
      description:
        "Move from an early concept or requirement into a practical working product.",
    },
  ];

  /* ======================================================
      SERVICE APPROACH
  ====================================================== */

  const approach = [
    {
      number: "01",
      title: "Understand",
      description: "Understand the problem, users and expected outcome.",
    },

    {
      number: "02",
      title: "Plan",
      description: "Define the right technical direction and architecture.",
    },

    {
      number: "03",
      title: "Build",
      description: "Develop the solution using suitable technologies.",
    },

    {
      number: "04",
      title: "Integrate",
      description: "Connect platforms, APIs, services and required workflows.",
    },

    {
      number: "05",
      title: "Test",
      description: "Validate functionality, usability and technical behavior.",
    },

    {
      number: "06",
      title: "Deliver",
      description: "Prepare the solution for deployment and real-world use.",
    },
  ];

  /* ======================================================
      WHY GENDATA TECH
  ====================================================== */

  const reasons = [
    {
      icon: FiCpu,
      title: "AI-focused Thinking",
      description:
        "Artificial intelligence remains at the center of our technology direction.",
    },

    {
      icon: FiTarget,
      title: "Problem-led Solutions",
      description:
        "We start with the actual requirement before deciding which technologies to use.",
    },

    {
      icon: FiLayers,
      title: "AI + Engineering",
      description:
        "We combine intelligent systems with web, software, mobile and IoT engineering.",
    },

    {
      icon: FiCode,
      title: "Custom Development",
      description:
        "Solutions are designed around specific workflows, users and technical needs.",
    },

    {
      icon: FiRepeat,
      title: "Scalable Direction",
      description:
        "We consider maintainability and future growth while designing technical systems.",
    },

    {
      icon: FiZap,
      title: "Direct Communication",
      description:
        "Clear communication keeps requirements, expectations and technical direction aligned.",
    },
  ];

  /* ======================================================
    INSIGHTS
====================================================== */

  const insights = [
    {
      category: "AI & Automation",
      title: "How AI Automation Can Improve Business Workflows",
      description:
        "Explore how intelligent automation can reduce repetitive work, improve process efficiency and connect business operations.",
    },

    {
      category: "Artificial Intelligence",
      title: "When Should a Business Choose a Custom AI Solution?",
      description:
        "Understand when a custom AI or machine learning solution may be more suitable than a generic software tool.",
    },

    {
      category: "Software Engineering",
      title: "Web Application vs Custom Software: What Should You Build?",
      description:
        "A practical overview of the differences between web applications and custom software systems when planning a digital product.",
    },
  ];

  /* ======================================================
    FAQ
====================================================== */

  const faqs = [
    {
      question: "What technology services does GenData Tech provide?",
      answer:
        "GenData Tech provides AI and machine learning development, full stack development, web development, software development, mobile app development and IoT solutions.",
    },

    {
      question: "Do you build custom AI and machine learning solutions?",
      answer:
        "Yes. We build AI and machine learning solutions around specific requirements, including predictive models, classification systems, intelligent automation, Agentic AI and custom AI applications.",
    },

    {
      question: "Can you develop both websites and full web applications?",
      answer:
        "Yes. We develop corporate and startup websites as well as full web applications that may include frontend interfaces, backend systems, APIs, authentication and databases.",
    },

    {
      question: "Do you provide Android and iOS app development?",
      answer:
        "Yes. We provide mobile application development for business and product requirements, including applications that connect with backend services and APIs.",
    },

    {
      question: "Can AI be integrated into an existing software system?",
      answer:
        "Yes. AI capabilities can be integrated into existing applications or workflows when the current architecture and technical requirements support the integration.",
    },

    {
      question: "Does GenData Tech provide IoT development?",
      answer:
        "Yes. Our IoT solutions can combine sensors, connected devices, monitoring systems, automation and software platforms for practical real-world applications.",
    },

    {
      question: "How do you choose the right technology for a project?",
      answer:
        "We begin by understanding the problem, users, expected outcome and technical requirements. The technology stack is selected based on what best fits the project rather than using the same stack for every solution.",
    },

    {
      question:
        "Can I contact GenData Tech if I am not sure which service I need?",
      answer:
        "Yes. You can share the problem or idea without knowing the exact technology. We can review the requirement and help identify an appropriate technical direction.",
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
          className="relative overflow-hidden bg-[#030b18] px-6 pt-32 pb-[106px] sm:pt-36 sm:pb-[122px] lg:px-10 lg:pt-32 lg:pb-20"
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

          <div className="relative mx-auto flex w-full max-w-[1400px] items-center py-6 sm:py-8 lg:min-h-[410px] lg:py-8">
            <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
              {/* HERO LEFT */}

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
                  Our Services
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
                  AI-focused services built around
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    real business problems.
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

              {/* ==================================================
                  HERO VISUAL
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
                className="relative mx-auto hidden h-[340px] w-full max-w-[430px] items-center justify-center lg:flex lg:justify-self-center"
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
                  className="relative z-10 flex h-[145px] w-[145px] flex-col items-center justify-center rounded-full border border-[#057CFA]/25 bg-[#06152C] shadow-[0_0_70px_rgba(5,124,250,0.14)]"
                >
                  <FiCpu className="text-xl text-[#057CFA]" />

                  <span className="mt-3 font-heading text-sm font-semibold text-white">
                    AI Core
                  </span>

                  <span className="mt-1 font-body text-[10px] uppercase tracking-[0.2em] text-slate-200">
                    GenData Tech
                  </span>
                </motion.div>

                {/* AI NODE */}

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
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute right-0 top-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[12px] font-semibold text-slate-200">
                    AI / ML
                  </p>
                </motion.div>

                {/* SOFTWARE NODE */}

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
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-16 left-0 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[12px] font-semibold text-slate-200">
                    Software
                  </p>
                </motion.div>

                {/* IOT NODE */}

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
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-6 right-10 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[12px] font-semibold text-slate-200">
                    IoT
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            TECHNOLOGY SERVICES
        ====================================================== */}

        <section className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1400px]">
            {/* SECTION INTRO */}

            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Technology Services
                </p>

                <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  One technology partner. Multiple engineering capabilities.
                </h2>
              </div>

              <div className="lg:pb-1">
                <p className="max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
                  Our services combine AI with software, applications and
                  connected systems to turn ideas and business requirements into
                  practical working technology.
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
                          Capabilities
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
                        Explore Service
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

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[170px]" />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                  How We Help
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                  Technology should create a useful outcome.
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

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                Our Service Approach
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                A clear path from requirement to delivery.
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

        <section className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Why GenData Tech
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Built around intelligence, engineering and practical thinking.
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

        <section className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1400px]">
            {/* SECTION HEADER */}

            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Insights
                </p>

                <h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Ideas and perspectives around modern technology.
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
                      Read Insight
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

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-[1400px]">
            {/* FAQ HEADER */}

            <div className="mx-auto max-w-3xl text-center">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                Frequently Asked Questions
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Questions about our technology services.
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

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
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
                    Not Sure What You Need?
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
                      Start a Project
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
