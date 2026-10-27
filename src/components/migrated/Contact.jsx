"use client"

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

const translationsDE = {"Service Overview":"Leistungsüberblick","What We Offer":"Unsere Leistungen","Use Cases":"Anwendungsfälle","Technology Stack":"Technologie-Stack","Development Process":"Entwicklungsprozess","Why GenData Tech":"Warum GenData Tech","Frequently Asked Questions":"Häufig gestellte Fragen","Requirement":"Anforderungen","Planning":"Planung","Architecture":"Architektur","Development":"Entwicklung","Integration":"Integration","Testing":"Testen","Deployment":"Bereitstellung","Delivery":"Auslieferung","Understand":"Verstehen","Design":"Konzeption","Build":"Entwickeln","Evaluate":"Evaluierung","Evaluation":"Evaluierung","Training":"Training","Structure":"Struktur","Connect":"Verbinden","Improve":"Verbessern","Start a Project":"Projekt starten","Discuss Your Requirement":"Anforderung besprechen","AI / ML Development":"KI- und ML-Entwicklung","Full Stack Development":"Full-Stack-Entwicklung","Web Development":"Webentwicklung","Software Development":"Softwareentwicklung","App Development":"App-Entwicklung","IoT Solutions":"IoT-Lösungen","AI Automation":"KI-Automatisierung","Custom AI Solutions":"Individuelle KI-Lösungen","Machine Learning Solutions":"Lösungen für maschinelles Lernen","Model Design":"Modellkonzeption","Data Understanding":"Datenverständnis","AI Model Development":"KI-Modellentwicklung","Frontend Development":"Frontend-Entwicklung","Backend Development":"Backend-Entwicklung","API Development":"API-Entwicklung","Database Integration":"Datenbankintegration","Authentication & Security":"Authentifizierung und Sicherheit","Corporate Websites":"Unternehmenswebsites","Startup Websites":"Websites für Start-ups","Product Websites":"Produktwebsites","Responsive Development":"Responsive Entwicklung","Performance-focused Development":"Performanceorientierte Entwicklung","SEO-ready Structure":"SEO-gerechte Struktur","Custom Business Software":"Individuelle Unternehmenssoftware","Internal Tools":"Interne Tools","Management Systems":"Managementsysteme","Workflow Applications":"Workflow-Anwendungen","API & System Integration":"API- und Systemintegration","Software Modernization":"Softwaremodernisierung","Android App Development":"Android-App-Entwicklung","iOS App Development":"iOS-App-Entwicklung","Cross-platform Applications":"Plattformübergreifende Anwendungen","Backend & API Integration":"Backend- und API-Integration","Notifications & User Features":"Benachrichtigungen und Nutzerfunktionen","Business Mobile Apps":"Mobile Business-Apps","Sensor Monitoring":"Sensorüberwachung","Device Automation":"Geräteautomatisierung","Remote Monitoring":"Fernüberwachung","IoT Dashboards":"IoT-Dashboards","Alerts & Notifications":"Warnmeldungen und Benachrichtigungen","AI-enabled IoT":"KI-gestütztes IoT","Our Services":"Unsere Leistungen","Technology Services":"Technologiedienstleistungen","Product Portfolio":"Produktportfolio","Our Products":"Unsere Produkte","GenData Tech Products":"GenData Tech Produkte","Training Programs":"Schulungsprogramme","Learning Experience":"Lernerfahrung","Learning Process":"Lernprozess","Learning Approach":"Lernkonzept","Contact GenData Tech":"Kontakt zu GenData Tech","Quick Contact":"Direkter Kontakt","Start Your Enquiry":"Anfrage senden","Full Name *":"Vollständiger Name *","Email Address *":"E-Mail-Adresse *","Phone Number":"Telefonnummer","What are you interested in? *":"Wofür interessieren Sie sich? *","Select a category":"Kategorie auswählen","Other Enquiry":"Sonstige Anfrage","What are you looking for? *":"Was suchen Sie? *","Tell us about your requirement *":"Beschreiben Sie Ihr Anliegen *","Locations":"Standorte","Before You Get in Touch":"Bevor Sie Kontakt aufnehmen","Your Requirement":"Ihre Anforderung","The Problem":"Die Herausforderung","The Next Step":"Der nächste Schritt","Our Response Promise":"Unser Antwortversprechen","Within 24 hrs":"Innerhalb von 24 Std.","Response":"Antwort","Availability":"Erreichbarkeit","Insights":"Einblicke","Explore":"Entdecken","Learn":"Lernen","Students":"Studierende","Beginners":"Einsteiger","Skill Builders":"Weiterbildungsinteressierte","Data Science":"Data Science","Data Analytics":"Datenanalyse","IoT Development":"IoT-Entwicklung","Mobile App Development":"Mobile-App-Entwicklung","Python":"Python","Let&apos;s build something":"Lassen Sie uns gemeinsam","intelligent together.":"intelligente Lösungen entwickeln.","Tell us what you&apos;re looking for.":"Beschreiben Sie uns Ihr Vorhaben.","Questions before you contact us.":"Fragen vor der Kontaktaufnahme.","A few answers that may help before starting your enquiry.":"Antworten auf häufige Fragen vor Ihrer Anfrage.","Find GenData Tech.":"Hier finden Sie GenData Tech.","You don&apos;t need every detail figured out.":"Sie müssen noch nicht alle Details kennen.","A simple process from your first message to the next step.":"Von Ihrer ersten Nachricht bis zum nächsten Schritt.","Please check the required fields and try again.":"Bitte überprüfen Sie die Pflichtfelder und versuchen Sie es erneut.","You send your enquiry":"Sie senden Ihre Anfrage","We review your requirement":"Wir prüfen Ihr Anliegen","We respond with the next step":"Wir melden uns mit dem nächsten Schritt","Deep Learning":"Deep Learning","Build Intelligent Products":"Intelligente Produkte entwickeln","Interface":"Benutzeroberfläche","Optimization":"Optimierung","System Design":"Systemplanung","Device Setup":"Geräteeinrichtung","Programming":"Programmierung","Practice":"Üben","Review":"Überprüfen","Apply":"Anwenden","Plan":"Planen","What You'll Learn":"Das lernen Sie","Tools & Technologies":"Tools und Technologien","Learning Outcome":"Lernergebnis","General Enquiry":"Allgemeine Anfrage","Partnership":"Partnerschaft","Business Enquiry":"Geschäftsanfrage","Other":"Sonstiges","Schedule a Call":"Gespräch vereinbaren","Tell us what you are looking to build, explore or improve.":"Beschreiben Sie, was Sie entwickeln, erkunden oder verbessern möchten.","Our team reviews the requirement and understands the appropriate direction.":"Unser Team prüft Ihre Anforderungen und ermittelt die passende Vorgehensweise.","We get back to you with the next discussion or action required.":"Wir melden uns bei Ihnen, um die nächsten Schritte zu besprechen.","How quickly will GenData Tech respond to my enquiry?":"Wie schnell beantwortet GenData Tech meine Anfrage?","We aim to review enquiries and respond within 24 hours during our normal working days.":"Wir bemühen uns, Anfragen an regulären Arbeitstagen innerhalb von 24 Stunden zu beantworten.","Can I contact GenData Tech if I am not sure which service I need?":"Kann ich GenData Tech kontaktieren, wenn ich noch nicht weiß, welche Leistung ich brauche?","Yes. You can choose Other Enquiry or select the category that appears closest to your requirement. You can also explain the problem in the message field and we can help identify the appropriate direction.":"Ja. Wählen Sie „Sonstige Anfrage“ oder die passendste Kategorie und beschreiben Sie Ihr Anliegen im Nachrichtenfeld. Wir unterstützen Sie bei der Auswahl.","Can I discuss an early-stage idea?":"Kann ich eine Idee in einer frühen Phase besprechen?","Yes. You do not need to have a complete technical specification before contacting us. You can share the idea, problem, users and expected outcome.":"Ja. Eine vollständige technische Spezifikation ist nicht erforderlich. Beschreiben Sie einfach Ihre Idee, das Problem, die Zielgruppe und das gewünschte Ergebnis.","Do I need a complete project specification before contacting you?":"Benötige ich vor der Kontaktaufnahme eine vollständige Projektspezifikation?","No. A basic explanation of the requirement is enough to begin the conversation. More detailed technical requirements can be discussed later.":"Nein. Eine kurze Beschreibung Ihrer Anforderungen reicht für ein erstes Gespräch. Technische Details können wir anschließend klären.","Can I contact GenData Tech about products?":"Kann ich GenData Tech zu seinen Produkten kontaktieren?","Yes. Select Products in the enquiry category and then choose the product you are interested in.":"Ja. Wählen Sie die Kategorie „Produkte“ und anschließend das gewünschte Produkt.","Can I contact GenData Tech about training programs?":"Kann ich mich zu Schulungsprogrammen erkundigen?","Yes. Select Training and choose the program you are interested in. You can include any additional questions in the message field.":"Ja. Wählen Sie die Kategorie „Schulungen“ und Ihr gewünschtes Programm. Weitere Fragen können Sie im Nachrichtenfeld angeben.","Can businesses contact GenData Tech for partnerships?":"Können Unternehmen GenData Tech für Partnerschaften kontaktieren?","Yes. Select Other Enquiry and then Partnership or Business Enquiry to send the relevant details.":"Ja. Wählen Sie „Sonstige Anfrage“ und anschließend „Partnerschaft“ oder „Geschäftsanfrage“.","How can I contact GenData Tech directly?":"Wie kann ich GenData Tech direkt erreichen?","You can contact us through WhatsApp, phone or email using the quick contact options on this page.":"Nutzen Sie die Kontaktmöglichkeiten per WhatsApp, Telefon oder E-Mail auf dieser Seite.","Full Name":"Vollständiger Name","Tell us what you are trying to solve, improve or create.":"Beschreiben Sie, was Sie lösen, verbessern oder entwickeln möchten.","Your name":"Ihr Name","Select an option":"Option auswählen","Select a category first":"Bitte zuerst eine Kategorie auswählen","Describe what you would like to build, improve, learn or discuss...":"Beschreiben Sie, was Sie entwickeln, verbessern, lernen oder besprechen möchten ...","Your enquiry was sent, but receipt cannot be verified. Please contact us by email or WhatsApp if you do not receive a reply.":"Ihre Anfrage wurde gesendet, der Eingang konnte jedoch nicht bestätigt werden. Falls Sie keine Antwort erhalten, kontaktieren Sie uns bitte per E-Mail oder WhatsApp.","Sending...":"Wird gesendet ...","Send Enquiry":"Anfrage senden","Mon – Sat":"Mo. – Sa.","Presence":"Standorte","Services":"Dienstleistungen","Products":"Produkte","AI & Machine Learning":"KI und maschinelles Lernen"};

function Contact() {
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
      tr("AI / ML Development"),
      tr("Full Stack Development"),
      tr("Web Development"),
      tr("Software Development"),
      tr("App Development"),
      tr("IoT Solutions"),
    ],

    Products: ["GenData LMS", "GenData CRM", "GenData ERP", "GenData Billing"],

    Training: [
      tr("AI & Machine Learning"),
      tr("Data Science"),
      tr("Data Analytics"),
      tr("IoT Development"),
      "MERN Stack",
      "DevOps",
      tr("Python"),
      tr("Mobile App Development"),
    ],

    "Other Enquiry": [
      tr("General Enquiry"),
      tr("Partnership"),
      tr("Business Enquiry"),
      tr("Other"),
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

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const category = query.get("category") || "";
    const offering = query.get("offering") || "";
    const options = offeringOptions[category];
    if (!options) return;
    setFormData((previous) => ({
      ...previous,
      category,
      offering: options.includes(offering) ? offering : "",
    }));
  }, []);

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

      // no-cors returns an opaque response: delivery is not verifiable.
      setSubmitStatus("unverified");

      // Keep input values available because the server receipt is opaque.
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
      label: tr("Schedule a Call"),
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
      title: tr("You send your enquiry"),
      description: tr("Tell us what you are looking to build, explore or improve."),
    },

    {
      number: "02",
      title: tr("We review your requirement"),
      description:
        tr("Our team reviews the requirement and understands the appropriate direction."),
    },

    {
      number: "03",
      title: tr("We respond with the next step"),
      description:
        tr("We get back to you with the next discussion or action required."),
    },
  ];

  /* ======================================================
      FAQ
  ====================================================== */

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: tr("How quickly will GenData Tech respond to my enquiry?"),
      answer:
        tr("We aim to review enquiries and respond within 24 hours during our normal working days."),
    },

    {
      question:
        tr("Can I contact GenData Tech if I am not sure which service I need?"),
      answer:
        tr("Yes. You can choose Other Enquiry or select the category that appears closest to your requirement. You can also explain the problem in the message field and we can help identify the appropriate direction."),
    },

    {
      question: tr("Can I discuss an early-stage idea?"),
      answer:
        tr("Yes. You do not need to have a complete technical specification before contacting us. You can share the idea, problem, users and expected outcome."),
    },

    {
      question:
        tr("Do I need a complete project specification before contacting you?"),
      answer:
        tr("No. A basic explanation of the requirement is enough to begin the conversation. More detailed technical requirements can be discussed later."),
    },

    {
      question: tr("Can I contact GenData Tech about products?"),
      answer:
        tr("Yes. Select Products in the enquiry category and then choose the product you are interested in."),
    },

    {
      question: tr("Can I contact GenData Tech about training programs?"),
      answer:
        tr("Yes. Select Training and choose the program you are interested in. You can include any additional questions in the message field."),
    },

    {
      question: tr("Can businesses contact GenData Tech for partnerships?"),
      answer:
        tr("Yes. Select Other Enquiry and then Partnership or Business Enquiry to send the relevant details."),
    },

    {
      question: tr("How can I contact GenData Tech directly?"),
      answer:
        tr("You can contact us through WhatsApp, phone or email using the quick contact options on this page."),
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
          className="relative overflow-hidden bg-[#030b18] px-6 pt-32 pb-[106px] sm:pt-36 sm:pb-28 lg:px-10 lg:pt-32 lg:pb-20"
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

          <div className="relative mx-auto flex w-full max-w-[1400px] items-center py-6 sm:py-8 lg:min-h-[475px] lg:py-8">
            <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
              {/* HERO COPY */}

              <div>
                <motion.p
                  initial={{
                    opacity: 1,
                    y: 12,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 1,
                          y: 12,
                        }
                  }
                  transition={{
                    duration: 0.5,
                  }}
                  className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-[#057CFA]"
                >
                  {tr("Contact GenData Tech")}
                </motion.p>

                <motion.h1
                  initial={{
                    opacity: 1,
                    y: 20,
                  }}
                  animate={
                    heroInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 1,
                          y: 20,
                        }
                  }
                  transition={{
                    duration: 0.65,
                    delay: 0.08,
                  }}
                  className="mt-5 max-w-4xl font-heading text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
                >
                  {tr("Let&apos;s build something")}
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    {tr("intelligent together.")}
                  </span>
                </motion.h1>

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
                    duration: 0.55,
                    delay: 0.15,
                  }}
                  className="mt-7 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base sm:leading-8"
                >
                  Tell us what you are looking to build, improve or explore.
                  We&apos;ll review your requirement and help identify the right
                  next step.
                </motion.p>

                {/* INFO */}

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
                    duration: 0.55,
                    delay: 0.22,
                  }}
                  className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-body text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-300">
                      {tr("Availability")}
                    </p>

                    <p className="mt-2 font-heading text-sm font-semibold text-white">
                      Mon – Sat
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-body text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-300">
                      {tr("Response")}
                    </p>

                    <p className="mt-2 font-heading text-sm font-semibold text-white">
                      {tr("Within 24 hrs")}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-body text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-300">
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
                    {tr("Connect")}
                  </span>

                  <span className="mt-1 font-body text-[7px] uppercase tracking-[0.18em] text-slate-300">
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
                  <p className="font-body text-[9px] font-semibold text-slate-200">
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
                  <p className="font-body text-[9px] font-semibold text-slate-200">
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
                  <p className="font-body text-[9px] font-semibold text-slate-200">
                    {tr("Training")}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            CONTACT WORKSPACE
        ====================================================== */}

        <section className="bg-[#F4F7FB] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
              {/* ==================================================
                  LEFT SIDE
              ================================================== */}

              <div className="space-y-6">
                {/* QUICK CONTACT */}

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-7">
                  <h2 className="font-body text-xs font-bold uppercase tracking-[0.16em] text-slate-900">
                    {tr("Quick Contact")}
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
                              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.15em] text-slate-400">
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
                    {tr("Our Response Promise")}
                  </h2>

                  <p className="mt-3 font-body text-sm leading-7 text-slate-500">
                    {tr("A simple process from your first message to the next step.")}
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
                  <p className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-[#002DCC]">
                    {tr("Start Your Enquiry")}
                  </p>

                  <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    {tr("Tell us what you&apos;re looking for.")}
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
                        {tr("Full Name *")}
                      </label>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        autoComplete="name"
                        placeholder={tr("Your name")}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-body text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#057CFA] focus:ring-4 focus:ring-blue-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="font-body text-xs font-semibold text-slate-700"
                      >
                        {tr("Email Address *")}
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
                      {tr("Phone Number")}
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
                        {tr("What are you interested in? *")}
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
                          <option value="">{tr("Select a category")}</option>

                          <option value="Services">{tr("Services")}</option>

                          <option value="Products">{tr("Products")}</option>

                          <option value="Training">{tr("Training")}</option>

                          <option value="Other Enquiry">{tr("Other Enquiry")}</option>
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
                        {tr("What are you looking for? *")}
                      </label>

                      <div className="relative mt-2">
                        <select
                          id="offering"
                          name="offering"
                          value={formData.offering}
                          onChange={handleInputChange}
                          disabled={!formData.category}
                          required
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-11 font-body text-sm text-slate-700 outline-none transition focus:border-[#057CFA] focus:ring-4 focus:ring-blue-50"
                        >
                          <option value="">
                            {formData.category
                              ? tr("Select an option")
                              : tr("Select a category first")}
                          </option>

                          {(offeringOptions[formData.category] || []).map((item) => (
                            <option key={item} value={item}>
                              {tr(item)}
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
                      {tr("Tell us about your requirement *")}
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder={tr("Describe what you would like to build, improve, learn or discuss...")}
                      className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 font-body text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#057CFA] focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  {/* FORM STATUS */}

                  <AnimatePresence>
                    {submitStatus === "unverified" && (
                      <motion.div
                        initial={{
                          opacity: 1,
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
                        className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3"
                      >
                        <p className="font-body text-xs font-medium leading-6 text-blue-800">
                          {tr("Your enquiry was sent, but receipt cannot be verified. Please contact us by email or WhatsApp if you do not receive a reply.")}
                        </p>
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{
                          opacity: 1,
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
                          {tr("Please check the required fields and try again.")}
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
                    {isSubmitting ? tr("Sending...") : tr("Send Enquiry")}

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

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.23em] text-[#002DCC]">
                  {tr("Locations")}
                </p>

                <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                  {tr("Find GenData Tech.")}
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

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[160px]" />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.23em] text-[#057CFA]">
                  {tr("Before You Get in Touch")}
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                  {tr("You don&apos;t need every detail figured out.")}
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                  <FiTarget className="text-[#057CFA]" />

                  <h3 className="mt-4 font-heading text-sm font-semibold text-white">
                    {tr("The Problem")}
                  </h3>

                  <p className="mt-2 font-body text-xs leading-6 text-slate-200">
                    Tell us what you are trying to solve, improve or create.
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                  <FiClock className="text-[#057CFA]" />

                  <h3 className="mt-4 font-heading text-sm font-semibold text-white">
                    {tr("Your Requirement")}
                  </h3>

                  <p className="mt-2 font-body text-xs leading-6 text-slate-200">
                    Share the functionality, users or expected outcome you
                    currently know.
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
                  <FiArrowRight className="text-[#057CFA]" />

                  <h3 className="mt-4 font-heading text-sm font-semibold text-white">
                    {tr("The Next Step")}
                  </h3>

                  <p className="mt-2 font-body text-xs leading-6 text-slate-200">
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

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.23em] text-[#002DCC]">
                {tr("Frequently Asked Questions")}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {tr("Questions before you contact us.")}
              </h2>

              <p className="mt-5 font-body text-sm leading-7 text-slate-500 sm:text-base">
                {tr("A few answers that may help before starting your enquiry.")}
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
      </main>

      
    </>
  );
}

export default Contact;
