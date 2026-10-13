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
  FiCalendar,
  FiChevronDown,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiTarget,
} from "react-icons/fi";

function Contact() {
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

  /* ======================================================
      GOOGLE APPS SCRIPT
  ====================================================== */

  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxVozSQGWXBAMzhbqT2VGp5rvZWv4TpIusnQohWwT2XzaN_y8LVUiuEiem5Q8GVdbwgwQ/exec";

  /* ======================================================
      OFFERING OPTIONS
  ====================================================== */

  const offeringOptions = {
    Services: [
      "AI / ML Development",
      "Full Stack Development",
      "Web Development",
      "Software Development",
      "App Development",
      "IoT Solutions",
    ],

    Products: ["GenData LMS", "CRM", "ERP", "Billing"],

    Training: [
      "AI & Machine Learning",
      "Data Science",
      "Data Analytics",
      "IoT Development",
      "MERN Stack",
      "DevOps",
      "Python",
      "Mobile App Development",
    ],

    "Other Enquiry": [
      "General Enquiry",
      "Partnership",
      "Business Enquiry",
      "Other",
    ],
  };

  /* ======================================================
      FORM STATE
  ====================================================== */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    offering: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState(null);

  /* ======================================================
      FORM HANDLERS
  ====================================================== */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;

    setFormData((previous) => ({
      ...previous,
      category,
      offering: "",
    }));

    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.category ||
      !formData.offering ||
      !formData.message
    ) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    /*
      "service" is also sent so your existing
      Google Apps Script can continue working.

      Later we can update Google Sheets to store:
      category
      offering

      as separate columns.
    */

    const submissionData = {
      ...formData,

      service: `${formData.category} - ${formData.offering}`,
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",

        mode: "no-cors",

        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },

        body: JSON.stringify(submissionData),
      });

      setSubmitStatus("success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        offering: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ======================================================
      QUICK CONTACT
  ====================================================== */

  const quickContacts = [
    {
      icon: FiMessageCircle,
      label: "WhatsApp",
      value: "Chat with us",
      href: "https://wa.me/918428683895",
    },

    {
      icon: FiPhone,
      label: "Call",
      value: "+91 84286 83895",
      href: "tel:+918428683895",
    },

    {
      icon: FiMail,
      label: "Email",
      value: "gendatatechies@gmail.com",
      href: "mailto:gendatatechies@gmail.com",
    },

    {
      icon: FiCalendar,
      label: "Schedule a Call",
      value: "Request a suitable time",
      href: "mailto:gendatatechies@gmail.com?subject=Schedule%20a%20Call%20with%20GenData%20Tech",
    },
  ];

  /* ======================================================
      RESPONSE PROCESS
  ====================================================== */

  const responseSteps = [
    {
      number: "01",
      title: "You send your enquiry",
      description: "Tell us what you are looking to build, explore or improve.",
    },

    {
      number: "02",
      title: "We review your requirement",
      description:
        "Our team reviews the requirement and understands the appropriate direction.",
    },

    {
      number: "03",
      title: "We respond with the next step",
      description:
        "We get back to you with the next discussion or action required.",
    },
  ];

  /* ======================================================
      FAQ
  ====================================================== */

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How quickly will GenData Tech respond to my enquiry?",
      answer:
        "We aim to review enquiries and respond within 24 hours during our normal working days.",
    },

    {
      question:
        "Can I contact GenData Tech if I am not sure which service I need?",
      answer:
        "Yes. You can choose Other Enquiry or select the category that appears closest to your requirement. You can also explain the problem in the message field and we can help identify the appropriate direction.",
    },

    {
      question: "Can I discuss an early-stage idea?",
      answer:
        "Yes. You do not need to have a complete technical specification before contacting us. You can share the idea, problem, users and expected outcome.",
    },

    {
      question:
        "Do I need a complete project specification before contacting you?",
      answer:
        "No. A basic explanation of the requirement is enough to begin the conversation. More detailed technical requirements can be discussed later.",
    },

    {
      question: "Can I contact GenData Tech about products?",
      answer:
        "Yes. Select Products in the enquiry category and then choose the product you are interested in.",
    },

    {
      question: "Can I contact GenData Tech about training programs?",
      answer:
        "Yes. Select Training and choose the program you are interested in. You can include any additional questions in the message field.",
    },

    {
      question: "Can businesses contact GenData Tech for partnerships?",
      answer:
        "Yes. Select Other Enquiry and then Partnership or Business Enquiry to send the relevant details.",
    },

    {
      question: "How can I contact GenData Tech directly?",
      answer:
        "You can contact us through WhatsApp, phone or email using the quick contact options on this page.",
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
          className="relative overflow-hidden bg-[#030b18] px-6 pb-20 pt-32 sm:pb-24 sm:pt-36 lg:px-10 lg:pb-28 lg:pt-40"
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
            <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
              {/* HERO COPY */}

              <div>
                <motion.p
                  initial={{
                    opacity: 0,
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
                  className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-[#057CFA]"
                >
                  Contact GenData Tech
                </motion.p>

                <motion.h1
                  initial={{
                    opacity: 0,
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
                    duration: 0.65,
                    delay: 0.08,
                  }}
                  className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-[1.07] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl"
                >
                  Let&apos;s build something
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    intelligent together.
                  </span>
                </motion.h1>

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
                    duration: 0.55,
                    delay: 0.15,
                  }}
                  className="mt-7 max-w-2xl font-body text-sm leading-7 text-slate-300 sm:text-base sm:leading-8"
                >
                  Tell us what you are looking to build, improve or explore.
                  We&apos;ll review your requirement and help identify the right
                  next step.
                </motion.p>

                {/* INFO */}

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
                    duration: 0.55,
                    delay: 0.22,
                  }}
                  className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-body text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">
                      Availability
                    </p>

                    <p className="mt-2 font-heading text-sm font-semibold text-white">
                      Mon – Sat
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-body text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">
                      Response
                    </p>

                    <p className="mt-2 font-heading text-sm font-semibold text-white">
                      Within 24 hrs
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-body text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">
                      Presence
                    </p>

                    <p className="mt-2 font-heading text-sm font-semibold text-white">
                      2 Locations
                    </p>
                  </div>
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
                  duration: 0.65,
                  delay: 0.15,
                }}
                className="relative mx-auto hidden h-[340px] w-full max-w-[430px] items-center justify-center lg:flex"
              >
                {/* OUTER */}

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
                          duration: 35,
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

                {/* INNER */}

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
                  <FiMessageCircle className="text-xl text-[#057CFA]" />

                  <span className="mt-2 font-heading text-sm font-semibold text-white">
                    Connect
                  </span>

                  <span className="mt-1 font-body text-[7px] uppercase tracking-[0.18em] text-slate-500">
                    GenData Tech
                  </span>
                </motion.div>

                {/* NODES */}

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
                    Services
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
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-12 left-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[9px] font-semibold text-slate-300">
                    Products
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
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-2 right-8 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[9px] font-semibold text-slate-300">
                    Training
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            CONTACT WORKSPACE
        ====================================================== */}

        <section className="bg-[#F4F7FB] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
              {/* ==================================================
                  LEFT SIDE
              ================================================== */}

              <div className="space-y-6">
                {/* QUICK CONTACT */}

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-7">
                  <h2 className="font-body text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
                    Quick Contact
                  </h2>

                  <p className="mt-3 font-body text-sm leading-7 text-slate-500">
                    Choose the most convenient way to reach GenData Tech
                    directly.
                  </p>

                  <div className="mt-6 space-y-3">
                    {quickContacts.map((item) => {
                      const Icon = item.icon;

                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target={
                            item.label === "WhatsApp" ? "_blank" : undefined
                          }
                          rel={
                            item.label === "WhatsApp" ? "noreferrer" : undefined
                          }
                          className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-[#F9FAFC] p-4 transition duration-300 hover:border-[#057CFA]/25 hover:bg-white hover:shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#002DCC] transition group-hover:bg-[#057CFA] group-hover:text-white">
                              <Icon />
                            </div>

                            <div>
                              <p className="font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                                {item.label}
                              </p>

                              <p className="mt-1 font-heading text-sm font-semibold text-slate-900">
                                {item.value}
                              </p>
                            </div>
                          </div>

                          <FiArrowRight className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#057CFA]" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* RESPONSE PROMISE */}

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-7">
                  <h2 className="font-body text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
                    Our Response Promise
                  </h2>

                  <p className="mt-3 font-body text-sm leading-7 text-slate-500">
                    A simple process from your first message to the next step.
                  </p>

                  <div className="mt-7 space-y-6">
                    {responseSteps.map((step) => (
                      <div key={step.number} className="flex gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 font-heading text-[9px] font-semibold text-[#002DCC]">
                          {step.number}
                        </div>

                        <div>
                          <h3 className="font-heading text-sm font-semibold text-slate-950">
                            {step.title}
                          </h3>

                          <p className="mt-2 font-body text-xs leading-6 text-slate-500">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ==================================================
                  ENQUIRY FORM
              ================================================== */}

              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.04)] sm:p-8 lg:p-10">
                <div>
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#002DCC]">
                    Start Your Enquiry
                  </p>

                  <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    Tell us what you&apos;re looking for.
                  </h2>

                  <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-slate-500">
                    Select the area you&apos;re interested in and provide a few
                    details about your requirement.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* NAME + EMAIL */}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="font-body text-xs font-semibold text-slate-700"
                      >
                        Full Name *
                      </label>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-body text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#057CFA] focus:ring-4 focus:ring-blue-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="font-body text-xs font-semibold text-slate-700"
                      >
                        Email Address *
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-body text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#057CFA] focus:ring-4 focus:ring-blue-50"
                      />
                    </div>
                  </div>

                  {/* PHONE */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="font-body text-xs font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      autoComplete="tel"
                      placeholder="+91"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-body text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#057CFA] focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  {/* ==================================================
                      DEPENDENT DROPDOWNS
                  ================================================== */}

                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* CATEGORY */}

                    <div>
                      <label
                        htmlFor="category"
                        className="font-body text-xs font-semibold text-slate-700"
                      >
                        What are you interested in? *
                      </label>

                      <div className="relative mt-2">
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleCategoryChange}
                          required
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-11 font-body text-sm text-slate-700 outline-none transition focus:border-[#057CFA] focus:ring-4 focus:ring-blue-50"
                        >
                          <option value="">Select a category</option>

                          <option value="Services">Services</option>

                          <option value="Products">Products</option>

                          <option value="Training">Training</option>

                          <option value="Other Enquiry">Other Enquiry</option>
                        </select>

                        <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>

                    {/* OFFERING */}

                    <div>
                      <label
                        htmlFor="offering"
                        className="font-body text-xs font-semibold text-slate-700"
                      >
                        What are you looking for? *
                      </label>

                      <div className="relative mt-2">
                        <select
                          id="offering"
                          name="offering"
                          value={formData.offering}
                          onChange={handleInputChange}
                          disabled={!formData.category}
                          required
                          className={`w-full appearance-none rounded-xl border px-4 py-3.5 pr-11 font-body text-sm outline-none transition ${
                            formData.category
                              ? "border-slate-200 bg-white text-slate-700 focus:border-[#057CFA] focus:ring-4 focus:ring-blue-50"
                              : "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400"
                          }`}
                        >
                          <option value="">
                            {formData.category
                              ? "Select an option"
                              : "Select a category first"}
                          </option>

                          {formData.category &&
                            offeringOptions[formData.category]?.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                        </select>

                        <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* MESSAGE */}

                  <div>
                    <label
                      htmlFor="message"
                      className="font-body text-xs font-semibold text-slate-700"
                    >
                      Tell us about your requirement *
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder="Describe what you would like to build, improve, learn or discuss..."
                      className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-body text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#057CFA] focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  {/* FORM STATUS */}

                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -5,
                        }}
                        className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
                      >
                        <p className="font-body text-xs font-medium leading-6 text-emerald-700">
                          Your enquiry has been submitted. Our team will review
                          it and get back to you.
                        </p>
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -5,
                        }}
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                      >
                        <p className="font-body text-xs font-medium leading-6 text-red-700">
                          Please check the required fields and try again.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : "Send Enquiry"}

                    {!isSubmitting && (
                      <FiSend className="transition group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            LOCATIONS
        ====================================================== */}

        <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.23em] text-[#002DCC]">
                  Locations
                </p>

                <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Find GenData Tech.
                </h2>
              </div>

              <div>
                <p className="max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                  Our presence supports direct communication and collaboration
                  across our technology, product and training activities.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {/* KOVILPATTI */}

              <motion.div
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
                }}
                className="rounded-[26px] border border-slate-200 bg-[#F7F9FC] p-6 sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#002DCC]">
                  <FiMapPin />
                </div>

                <h3 className="mt-6 font-heading text-xl font-semibold text-slate-950">
                  Kovilpatti
                </h3>

                <p className="mt-4 max-w-md font-body text-sm leading-7 text-slate-500">
                  Annai Abirami Nagar,
                  <br />
                  Subha Nagar Area,
                  <br />
                  Kovilpatti – 628502
                </p>
              </motion.div>

              {/* COIMBATORE */}

              <motion.div
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
                  delay: 0.08,
                }}
                className="rounded-[26px] border border-slate-200 bg-[#F7F9FC] p-6 sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#002DCC]">
                  <FiMapPin />
                </div>

                <h3 className="mt-6 font-heading text-xl font-semibold text-slate-950">
                  Coimbatore
                </h3>

                <p className="mt-4 max-w-md font-body text-sm leading-7 text-slate-500">
                  Coimbatore,
                  <br />
                  Tamil Nadu,
                  <br />
                  India
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            BEFORE YOU GET IN TOUCH
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[160px]" />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="font-body text-[11px] font-semibold uppercase tracking-[0.23em] text-[#057CFA]">
                  Before You Get in Touch
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                  You don&apos;t need every detail figured out.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                  <FiTarget className="text-[#057CFA]" />

                  <h3 className="mt-4 font-heading text-sm font-semibold text-white">
                    The Problem
                  </h3>

                  <p className="mt-2 font-body text-xs leading-6 text-slate-400">
                    Tell us what you are trying to solve, improve or create.
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                  <FiClock className="text-[#057CFA]" />

                  <h3 className="mt-4 font-heading text-sm font-semibold text-white">
                    Your Requirement
                  </h3>

                  <p className="mt-2 font-body text-xs leading-6 text-slate-400">
                    Share the functionality, users or expected outcome you
                    currently know.
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                  <FiArrowRight className="text-[#057CFA]" />

                  <h3 className="mt-4 font-heading text-sm font-semibold text-white">
                    The Next Step
                  </h3>

                  <p className="mt-2 font-body text-xs leading-6 text-slate-400">
                    We can help identify an appropriate technology or direction
                    from there.
                  </p>
                </div>
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
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.23em] text-[#002DCC]">
                Frequently Asked Questions
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Questions before you contact us.
              </h2>

              <p className="mt-5 font-body text-sm leading-7 text-slate-500 sm:text-base">
                A few answers that may help before starting your enquiry.
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
      </main>

      
    </>
  );
}

export default Contact;
