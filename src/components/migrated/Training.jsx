"use client"

import { useParams } from "next/navigation";
import ProcessFlowGlow from "../layout/ProcessFlowGlow"

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
  FiCheck,
  FiChevronDown,
  FiCode,
  FiCpu,
  FiDatabase,
  FiLayers,
  FiMonitor,
  FiTarget,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import {
  SiArduino,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiJenkins,
  SiJupyter,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostman,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiTensorflow,
} from "react-icons/si";

import CommonCTA from "../layout/CommonCTA"
const translationsDE = {"Service Overview":"Leistungsüberblick","What We Offer":"Unsere Leistungen","Use Cases":"Anwendungsfälle","Technology Stack":"Technologie-Stack","Development Process":"Entwicklungsprozess","Why GenData Tech":"Warum GenData Tech","Frequently Asked Questions":"Häufig gestellte Fragen","Requirement":"Anforderungen","Planning":"Planung","Architecture":"Architektur","Development":"Entwicklung","Integration":"Integration","Testing":"Tests","Deployment":"Bereitstellung","Delivery":"Auslieferung","Understand":"Verstehen","Design":"Konzeption","Build":"Entwicklung","Evaluate":"Evaluierung","Evaluation":"Bewertung","Training":"Training","Structure":"Struktur","Connect":"Verbinden","Improve":"Verbessern","Start a Project":"Projekt starten","Discuss Your Requirement":"Anforderung besprechen","AI / ML Development":"KI- und ML-Entwicklung","Full Stack Development":"Full-Stack-Entwicklung","Web Development":"Webentwicklung","Software Development":"Softwareentwicklung","App Development":"App-Entwicklung","IoT Solutions":"IoT-Lösungen","AI Automation":"KI-Automatisierung","Custom AI Solutions":"Individuelle KI-Lösungen","Machine Learning Solutions":"Lösungen für maschinelles Lernen","Model Design":"Modellkonzeption","Data Understanding":"Datenverständnis","AI Model Development":"KI-Modellentwicklung","Frontend Development":"Frontend-Entwicklung","Backend Development":"Backend-Entwicklung","API Development":"API-Entwicklung","Database Integration":"Datenbankintegration","Authentication & Security":"Authentifizierung und Sicherheit","Corporate Websites":"Unternehmenswebsites","Startup Websites":"Websites für Start-ups","Product Websites":"Produktwebsites","Responsive Development":"Responsive Entwicklung","Performance-focused Development":"Performanceorientierte Entwicklung","SEO-ready Structure":"SEO-gerechte Struktur","Custom Business Software":"Individuelle Unternehmenssoftware","Internal Tools":"Interne Tools","Management Systems":"Managementsysteme","Workflow Applications":"Workflow-Anwendungen","API & System Integration":"API- und Systemintegration","Software Modernization":"Softwaremodernisierung","Android App Development":"Android-App-Entwicklung","iOS App Development":"iOS-App-Entwicklung","Cross-platform Applications":"Plattformübergreifende Anwendungen","Backend & API Integration":"Backend- und API-Integration","Notifications & User Features":"Benachrichtigungen und Nutzerfunktionen","Business Mobile Apps":"Mobile Business-Apps","Sensor Monitoring":"Sensorüberwachung","Device Automation":"Geräteautomatisierung","Remote Monitoring":"Fernüberwachung","IoT Dashboards":"IoT-Dashboards","Alerts & Notifications":"Warnmeldungen und Benachrichtigungen","AI-enabled IoT":"KI-gestütztes IoT","Our Services":"Unsere Leistungen","Technology Services":"Technologiedienstleistungen","Product Portfolio":"Produktportfolio","Our Products":"Unsere Produkte","GenData Tech Products":"GenData Tech Produkte","Training Programs":"Schulungsprogramme","Learning Experience":"Lernerfahrung","Learning Process":"Lernprozess","Learning Approach":"Lernkonzept","Contact GenData Tech":"Kontakt zu GenData Tech","Quick Contact":"Direkter Kontakt","Start Your Enquiry":"Anfrage senden","Full Name *":"Vollständiger Name *","Email Address *":"E-Mail-Adresse *","Phone Number":"Telefonnummer","What are you interested in? *":"Wofür interessieren Sie sich? *","Select a category":"Kategorie auswählen","Other Enquiry":"Sonstige Anfrage","What are you looking for? *":"Was suchen Sie? *","Tell us about your requirement *":"Beschreiben Sie Ihr Anliegen *","Locations":"Standorte","Before You Get in Touch":"Bevor Sie Kontakt aufnehmen","Your Requirement":"Ihre Anforderung","The Problem":"Die Herausforderung","The Next Step":"Der nächste Schritt","Our Response Promise":"Unser Antwortversprechen","Within 24 hrs":"Innerhalb von 24 Std.","Response":"Antwort","Availability":"Erreichbarkeit","Insights":"Einblicke","Explore":"Entdecken","Learn":"Lernen","Students":"Studierende","Beginners":"Einsteiger","Skill Builders":"Weiterbildungsinteressierte","Data Science":"Data Science","Data Analytics":"Datenanalyse","IoT Development":"IoT-Entwicklung","Mobile App Development":"Mobile-App-Entwicklung","Python":"Python","Learn the technology.":"Technologie verstehen.","Build with it.":"Mit Technologie gestalten.","Choose a learning track.":"Wählen Sie Ihren Lernpfad.","Learning designed around understanding and practice.":"Praxisnahes Lernen mit fundiertem Verständnis.","Understand. Practice. Build. Apply.":"Verstehen. Üben. Entwickeln. Anwenden.","Questions about training.":"Fragen zu unseren Schulungen.","Explore Training":"Schulungen entdecken","What You'll Learn":"Das lernen Sie","Tools & Technologies":"Tools und Technologien","Learning Outcome":"Lernergebnis","Training Tracks":"Lernbereiche","Students Trained":"Geschulte Teilnehmende","Build a practical foundation in artificial intelligence and machine learning while learning how data is prepared, models are trained and solutions are evaluated.":"Lernen Sie die Grundlagen der künstlichen Intelligenz und des maschinellen Lernens sowie Datenaufbereitung, Modelltraining und Bewertung von Lösungen.","Learn how data is collected, explored, prepared and transformed into useful insights through programming, statistics and machine learning.":"Lernen Sie, Daten zu sammeln, zu untersuchen, aufzubereiten und mithilfe von Programmierung, Statistik und maschinellem Lernen auszuwerten.","Learn how raw data can be cleaned, analyzed and transformed into understandable information that supports better decisions.":"Lernen Sie, Rohdaten zu bereinigen, zu analysieren und in verständliche Informationen für bessere Entscheidungen umzuwandeln.","Learn how sensors, microcontrollers, connectivity and software work together to create connected Internet of Things systems.":"Lernen Sie, wie Sensoren, Mikrocontroller, Konnektivität und Software zu vernetzten IoT-Systemen zusammenwirken.","Learn full-stack JavaScript development by building modern web applications using MongoDB, Express, React and Node.js.":"Erlernen Sie die Full-Stack-JavaScript-Entwicklung mit modernen Webanwendungen auf Basis von MongoDB, Express, React und Node.js.","Learn the foundations of development operations, version control, automation, deployment workflows and modern software delivery practices.":"Lernen Sie die Grundlagen von DevOps, Versionsverwaltung, Automatisierung, Bereitstellungsprozessen und moderner Softwareauslieferung.","Build a strong programming foundation with Python through concepts, problem solving and practical application development.":"Erwerben Sie solide Python-Kenntnisse durch Grundlagen, Problemlösung und praktische Anwendungsentwicklung.","Learn the fundamentals of building mobile applications with a focus on interfaces, application logic, APIs and practical development workflows.":"Lernen Sie die Grundlagen mobiler Anwendungen mit Fokus auf Oberflächen, Anwendungslogik, APIs und praktische Entwicklung.","Structured Learning":"Strukturiertes Lernen","Concepts are organized progressively so learners can build knowledge step by step.":"Die Inhalte bauen schrittweise aufeinander auf und fördern systematisches Lernen.","Hands-On Practice":"Praxisübungen","Learning includes practical implementation rather than focusing only on theory.":"Praktische Umsetzung ergänzt die theoretischen Grundlagen.","Project Thinking":"Projektorientiertes Denken","Learners understand how individual concepts connect to practical project development.":"Die Teilnehmenden lernen, wie einzelne Konzepte in Projekten zusammenwirken.","Technology Exposure":"Einblick in Technologien","Training introduces tools and technologies relevant to each learning track.":"Die Schulungen stellen passende Werkzeuge und Technologien für jeden Lernpfad vor."};

function Training() {
  const { lang } = useParams();
  const tr = (key) => lang === "de" ? (translationsDE[key] ?? key) : key;
  /* ======================================================
      HERO
  ====================================================== */

  const heroRef = useRef(null);
  const trainingProgramsRef = useRef(null);

  const heroInView = useInView(heroRef, {
    margin: "-10% 0px -10% 0px",
    once: true,
  });

  const reduceMotion = useReducedMotion();

  const heroShouldAnimate = heroInView && !reduceMotion;

  /* ======================================================
      STUDENT COUNT
      Replace XX+ with your real student count
  ====================================================== */

  const studentsTrained = "XX+";

  /* ======================================================
      TRAINING STATE
  ====================================================== */

  const [activeTrack, setActiveTrack] = useState("ai-ml");

  const [activeDetail, setActiveDetail] = useState("learn");

  const [openFaq, setOpenFaq] = useState(null);

  /* ======================================================
      TRAINING TRACKS
  ====================================================== */

  const trainingTracks = [
    {
      id: "ai-ml",

      number: "01",

      title: "AI & Machine Learning",

      shortTitle: "AI & ML",

      icon: FiZap,

      description:
        tr("Build a practical foundation in artificial intelligence and machine learning while learning how data is prepared, models are trained and solutions are evaluated."),

      learn: [
        "Python for Machine Learning",
        "Data Preprocessing",
        "Exploratory Data Analysis",
        "Supervised Learning",
        "Unsupervised Learning",
        "Model Evaluation",
        "Machine Learning Projects",
        "Introduction to Model Deployment",
      ],

      tools: [
        {
          name: tr("Python"),
          icon: SiPython,
        },
        {
          name: "NumPy",
          icon: SiNumpy,
        },
        {
          name: "Pandas",
          icon: SiPandas,
        },
        {
          name: "Scikit-learn",
          icon: SiScikitlearn,
        },
        {
          name: "TensorFlow",
          icon: SiTensorflow,
        },
        {
          name: "PyTorch",
          icon: SiPytorch,
        },
        {
          name: "Jupyter",
          icon: SiJupyter,
        },
        {
          name: "Git",
          icon: SiGit,
        },
      ],

      outcome:
        "Develop the practical foundation needed to prepare data, train machine learning models, evaluate their performance and build project-based AI solutions.",
    },

    {
      id: "data-science",

      number: "02",

      title: tr("Data Science"),

      shortTitle: tr("Data Science"),

      icon: FiDatabase,

      description:
        tr("Learn how data is collected, explored, prepared and transformed into useful insights through programming, statistics and machine learning."),

      learn: [
        "Python for Data Science",
        "Data Collection and Preparation",
        "Data Cleaning",
        "Exploratory Data Analysis",
        "Statistics Fundamentals",
        "Data Visualization",
        "Machine Learning Fundamentals",
        "Data Science Projects",
      ],

      tools: [
        {
          name: tr("Python"),
          icon: SiPython,
        },
        {
          name: "Pandas",
          icon: SiPandas,
        },
        {
          name: "NumPy",
          icon: SiNumpy,
        },
        {
          name: "Jupyter",
          icon: SiJupyter,
        },
        {
          name: "Scikit-learn",
          icon: SiScikitlearn,
        },
        {
          name: "MySQL",
          icon: SiMysql,
        },
        {
          name: "Git",
          icon: SiGit,
        },
      ],

      outcome:
        "Develop the ability to explore datasets, identify patterns, communicate insights and build data-driven solutions using practical data science workflows.",
    },

    {
      id: "data-analytics",

      number: "03",

      title: tr("Data Analytics"),

      shortTitle: tr("Data Analytics"),

      icon: FiTarget,

      description:
        tr("Learn how raw data can be cleaned, analyzed and transformed into understandable information that supports better decisions."),

      learn: [
        "Understanding Data",
        "Data Cleaning",
        "Data Transformation",
        "Exploratory Analysis",
        "SQL Fundamentals",
        "Data Visualization",
        "Dashboard Thinking",
        "Communicating Insights",
      ],

      tools: [
        {
          name: tr("Python"),
          icon: SiPython,
        },
        {
          name: "Pandas",
          icon: SiPandas,
        },
        {
          name: "NumPy",
          icon: SiNumpy,
        },
        {
          name: "MySQL",
          icon: SiMysql,
        },
        {
          name: "Jupyter",
          icon: SiJupyter,
        },
      ],

      outcome:
        "Build the skills needed to clean, explore and interpret datasets and present meaningful insights through structured analysis and visual communication.",
    },

    {
      id: "iot",

      number: "04",

      title: tr("IoT Development"),

      shortTitle: "IoT",

      icon: FiCpu,

      description:
        tr("Learn how sensors, microcontrollers, connectivity and software work together to create connected Internet of Things systems."),

      learn: [
        "IoT Fundamentals",
        "Microcontroller Basics",
        "Sensor Integration",
        "Input and Output Devices",
        "ESP32 Development",
        "Device Connectivity",
        "Data Monitoring",
        "Practical IoT Projects",
      ],

      tools: [
        {
          name: "Arduino",
          icon: SiArduino,
        },
        {
          name: "C++",
          icon: SiCplusplus,
        },
        {
          name: tr("Python"),
          icon: SiPython,
        },
        {
          name: "Git",
          icon: SiGit,
        },
        {
          name: "VS Code",
          icon: FiCode,
        },
      ],

      outcome:
        "Understand how to connect sensors and devices, collect real-world data and build practical connected systems using microcontrollers and software.",
    },

    {
      id: "mern",

      number: "05",

      title: "MERN Stack",

      shortTitle: "MERN",

      icon: FiCode,

      description:
        tr("Learn full-stack JavaScript development by building modern web applications using MongoDB, Express, React and Node.js."),

      learn: [
        "HTML, CSS and JavaScript Foundations",
        "React Fundamentals",
        "Component-Based Development",
        "Node.js Fundamentals",
        "Express APIs",
        "MongoDB",
        "Frontend and Backend Integration",
        "Full Stack Projects",
      ],

      tools: [
        {
          name: "JavaScript",
          icon: SiJavascript,
        },
        {
          name: "React",
          icon: SiReact,
        },
        {
          name: "Node.js",
          icon: SiNodedotjs,
        },
        {
          name: "Express",
          icon: SiExpress,
        },
        {
          name: "MongoDB",
          icon: SiMongodb,
        },
        {
          name: "Postman",
          icon: SiPostman,
        },
        {
          name: "Git",
          icon: SiGit,
        },
        {
          name: "VS Code",
          icon: FiCode,
        },
      ],

      outcome:
        "Develop the ability to build complete web applications by connecting responsive frontend interfaces with APIs, backend logic and databases.",
    },

    {
      id: "devops",

      number: "06",

      title: "DevOps",

      shortTitle: "DevOps",

      icon: FiLayers,

      description:
        tr("Learn the foundations of development operations, version control, automation, deployment workflows and modern software delivery practices."),

      learn: [
        "DevOps Fundamentals",
        "Version Control with Git",
        "GitHub Workflows",
        "Continuous Integration",
        "Continuous Delivery Concepts",
        "Container Fundamentals",
        "Deployment Workflows",
        "Introduction to Infrastructure Tools",
      ],

      tools: [
        {
          name: "Git",
          icon: SiGit,
        },
        {
          name: "GitHub",
          icon: SiGithub,
        },
        {
          name: "Docker",
          icon: SiDocker,
        },
        {
          name: "Jenkins",
          icon: SiJenkins,
        },
        {
          name: "Kubernetes",
          icon: SiKubernetes,
        },
      ],

      outcome:
        "Understand modern software delivery workflows and develop practical knowledge of version control, automation, containers and deployment processes.",
    },

    {
      id: "python",

      number: "07",

      title: tr("Python"),

      shortTitle: tr("Python"),

      icon: FiCode,

      description:
        tr("Build a strong programming foundation with Python through concepts, problem solving and practical application development."),

      learn: [
        "Python Fundamentals",
        "Variables and Data Types",
        "Conditions and Loops",
        "Functions",
        "Data Structures",
        "Object-Oriented Programming",
        "File Handling",
        "Python Projects",
      ],

      tools: [
        {
          name: tr("Python"),
          icon: SiPython,
        },
        {
          name: "Jupyter",
          icon: SiJupyter,
        },
        {
          name: "VS Code",
          icon: FiCode,
        },
        {
          name: "Git",
          icon: SiGit,
        },
      ],

      outcome:
        "Develop a strong Python programming foundation and gain confidence in writing structured programs, solving problems and building practical projects.",
    },

    {
      id: "mobile-app",

      number: "08",

      title: tr("Mobile App Development"),

      shortTitle: "Mobile App",

      icon: FiMonitor,

      description:
        tr("Learn the fundamentals of building mobile applications with a focus on interfaces, application logic, APIs and practical development workflows."),

      learn: [
        "Mobile Application Fundamentals",
        "User Interface Development",
        "Application Components",
        "State and Application Logic",
        "Working with APIs",
        "Data Handling",
        "Testing Fundamentals",
        "Mobile App Projects",
      ],

      tools: [
        {
          name: "JavaScript",
          icon: SiJavascript,
        },
        {
          name: "React",
          icon: SiReact,
        },
        {
          name: "Postman",
          icon: SiPostman,
        },
        {
          name: "VS Code",
          icon: FiCode,
        },
        {
          name: "Git",
          icon: SiGit,
        },
      ],

      outcome:
        "Understand the structure of mobile applications and develop practical skills for creating interfaces, application logic and API-connected mobile experiences.",
    },
  ];

  /* ======================================================
      ACTIVE TRACK
  ====================================================== */

  const selectedTrack =
    trainingTracks.find((track) => track.id === activeTrack) ||
    trainingTracks[0];

  /* ======================================================
      DETAIL TABS
  ====================================================== */

  const detailTabs = [
    {
      id: "learn",
      label: tr("What You'll Learn"),
      icon: FiBookOpen,
    },

    {
      id: "tools",
      label: tr("Tools & Technologies"),
      icon: FiCpu,
    },

    {
      id: "outcome",
      label: tr("Learning Outcome"),
      icon: FiTarget,
    },
  ];

  /* ======================================================
      LEARNER BENEFITS
  ====================================================== */

  const learnerBenefits = [
    {
      icon: FiBookOpen,
      title: tr("Structured Learning"),
      description:
        tr("Concepts are organized progressively so learners can build knowledge step by step."),
    },

    {
      icon: FiCode,
      title: tr("Hands-On Practice"),
      description:
        tr("Learning includes practical implementation rather than focusing only on theory."),
    },

    {
      icon: FiTarget,
      title: tr("Project Thinking"),
      description:
        tr("Learners understand how individual concepts connect to practical project development."),
    },

    {
      icon: FiZap,
      title: tr("Technology Exposure"),
      description:
        tr("Training introduces tools and technologies relevant to each learning track."),
    },
  ];

  /* ======================================================
      TRAINING PROCESS
  ====================================================== */

  const trainingProcess = [
    {
      number: "01",
      title: tr("Understand"),
      description:
        "Start with the fundamentals and understand the purpose behind each concept.",
    },

    {
      number: "02",
      title: "Practice",
      description:
        "Apply concepts through guided exercises and practical implementation.",
    },

    {
      number: "03",
      title: tr("Build"),
      description:
        "Connect individual skills by working on project-oriented activities.",
    },

    {
      number: "04",
      title: "Review",
      description:
        "Evaluate the implementation and understand how the solution can be improved.",
    },

    {
      number: "05",
      title: "Apply",
      description:
        "Use the learned concepts to approach practical problems independently.",
    },
  ];

  /* ======================================================
      FAQ
  ====================================================== */

  const faqs = [
    {
      question: "What training programs does GenData Tech offer?",
      answer:
        "GenData Tech offers training in AI & Machine Learning, Data Science, Data Analytics, IoT Development, MERN Stack, DevOps, Python and Mobile App Development.",
    },

    {
      question: "Are the training programs practical?",
      answer:
        "The training approach combines conceptual understanding with exercises, implementation and project-oriented learning.",
    },

    {
      question: "Who can join the training programs?",
      answer:
        "The programs are designed for learners who want to build technical knowledge and practical skills. The appropriate track depends on the learner's background and learning goals.",
    },

    {
      question: "Do I need programming knowledge before joining?",
      answer:
        "Requirements depend on the selected training track. Foundational programs can begin with basic concepts, while some advanced areas may benefit from prior programming knowledge.",
    },

    {
      question: "Are tools and technologies included in the training?",
      answer:
        "Yes. Each training track introduces relevant tools and technologies as part of the learning workflow.",
    },

    {
      question: "Does the training include projects?",
      answer:
        "Project-oriented learning is included where appropriate so learners can understand how individual concepts connect within practical applications.",
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
          className="relative overflow-hidden bg-[#030b18] px-6 pt-32 pb-[256px] sm:pt-36 sm:pb-[142px] lg:px-10 lg:pt-32 lg:pb-20"
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
            className="pointer-events-none absolute -right-24 top-20 h-[320px] w-[320px] rounded-full bg-[#057CFA]/10 blur-[110px]"
            animate={
              heroShouldAnimate
                ? {
                    y: [0, 16, 0],
                    opacity: [0.4, 0.75, 0.4],
                  }
                : {
                    y: 0,
                    opacity: 0.5,
                  }
            }
            transition={{
              duration: 8,
              repeat: heroShouldAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
          />

          {/* GRID BACKGROUND */}

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

          {/* HERO CONTENT AREA */}

          <div className="relative mx-auto flex w-full max-w-[1400px] items-center py-6 sm:py-8 lg:min-h-[475px] lg:py-8">
            <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
              {/* ==================================================
                      LEFT CONTENT
                ================================================== */}

              <div className="max-w-[690px]">
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
                      : {}
                  }
                  transition={{
                    duration: 0.5,
                  }}
                  className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-[#057CFA]"
                >
                  GenData Tech Training
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
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.08,
                  }}
                  className="mt-5 max-w-4xl font-heading text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
                >
                  {tr("Learn the technology.")}
                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    {tr("Build with it.")}
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
                      : {}
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.15,
                  }}
                  className="mt-5 max-w-[650px] font-body text-sm leading-7 text-slate-200 sm:text-base"
                >
                  Practical technology training designed to help learners
                  understand concepts, work with modern tools and apply their
                  skills through hands-on learning.
                </motion.p>

                <motion.button
                  type="button"
                  aria-controls="training-programs"
                  onClick={() =>
                    trainingProgramsRef.current?.scrollIntoView({
                      behavior: reduceMotion ? "instant" : "smooth",
                      block: "start",
                    })
                  }
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
                      : {}
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.23,
                  }}
                  className="gd-hero-button gd-hero-button--primary group mt-7"
                >
                  {tr("Explore Training")}
                  <FiArrowRight className="transition group-hover:translate-x-1" />
                </motion.button>
              </div>

              {/* ==================================================
                     RIGHT HERO VISUAL
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
                    : {}
                }
                transition={{
                  duration: 0.65,
                  delay: 0.15,
                }}
                className="relative hidden h-[340px] w-full max-w-[430px] items-center justify-center lg:flex lg:justify-self-center"
              >
                <motion.div
                  className="absolute h-[295px] w-[295px] rounded-full border border-white/[0.06]"
                  animate={
                    heroShouldAnimate
                      ? {
                          rotate: 360,
                        }
                      : {}
                  }
                  transition={{
                    duration: 35,
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <div className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#057CFA] shadow-[0_0_18px_rgba(5,124,250,0.9)]" />
                </motion.div>

                <motion.div
                  className="absolute h-[205px] w-[205px] rounded-full border border-[#057CFA]/15"
                  animate={
                    heroShouldAnimate
                      ? {
                          rotate: -360,
                        }
                      : {}
                  }
                  transition={{
                    duration: 26,
                    repeat: heroShouldAnimate ? Infinity : 0,
                    ease: "linear",
                  }}
                />

                <div className="relative z-10 flex h-[130px] w-[130px] flex-col items-center justify-center rounded-full border border-[#057CFA]/25 bg-[#06152C] shadow-[0_0_60px_rgba(5,124,250,0.15)]">
                  <FiBookOpen className="text-2xl text-[#057CFA]" />

                  <span className="mt-2 font-heading text-sm font-semibold text-white">
                    {tr("Learn")}
                  </span>

                  <span className="mt-1 font-body text-[7px] uppercase tracking-[0.18em] text-slate-300">
                    Build • Apply
                  </span>
                </div>

                {[
                  {
                    label: "AI & ML",
                    className: "right-1 top-8",
                  },
                  {
                    label: "Data",
                    className: "bottom-12 left-1",
                  },
                  {
                    label: tr("Development"),
                    className: "bottom-3 right-4",
                  },
                  {
                    label: "IoT",
                    className: "left-4 top-12",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`absolute ${item.className} rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm`}
                  >
                    <span className="font-body text-[9px] font-semibold text-slate-200">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            TRAINING SNAPSHOT
        ====================================================== */}

        <section className="border-b border-slate-100 bg-white px-6 lg:px-10">
          <div className="mx-auto grid max-w-[1400px] divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="py-8 text-center">
              <p className="font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                8
              </p>

              <p className="mt-2 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {tr("Training Tracks")}
              </p>
            </div>

            <div className="py-8 text-center">
              <p className="font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                {studentsTrained}
              </p>

              <p className="mt-2 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {tr("Students Trained")}
              </p>
            </div>

            <div className="py-8 text-center">
              <p className="font-heading text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                Practical
              </p>

              <p className="mt-2 font-body text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {tr("Learning Approach")}
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================
            TRAINING EXPLORER
        ====================================================== */}

        <section
          ref={trainingProgramsRef}
          id="training-programs"
          className="bg-[#F7F9FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                {tr("Training Programs")}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {tr("Choose a learning track.")}
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                Explore what you&apos;ll learn, the technologies you&apos;ll
                work with and the learning outcome for each track.
              </p>
            </div>

            {/* ==================================================
                COURSE SELECTOR
            ================================================== */}

            <div className="mt-10 overflow-x-auto pb-2">
              <div className="flex min-w-max gap-2">
                {trainingTracks.map((track) => {
                  const Icon = track.icon;

                  const isActive = activeTrack === track.id;

                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => {
                        setActiveTrack(track.id);

                        setActiveDetail("learn");
                      }}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2.5 font-body text-[11px] font-semibold transition duration-300 ${
                        isActive
                          ? "border-[#057CFA] bg-[#057CFA] text-white shadow-[0_10px_25px_rgba(5,124,250,0.18)]"
                          : "border-slate-200 bg-white text-slate-600 hover:border-[#057CFA]/40 hover:text-[#002DCC]"
                      }`}
                    >
                      <Icon className="text-sm" />

                      {track.shortTitle}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ==================================================
                ACTIVE COURSE PANEL
            ================================================== */}

            <motion.div
              layout
              className="mt-7 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.05)]"
            >
              {/* COURSE HEADER */}

              <div className="border-b border-slate-100 px-6 py-7 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-[#057CFA]">
                      Track {selectedTrack.number}
                    </p>

                    <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                      {selectedTrack.title}
                    </h3>

                    <p className="mt-3 max-w-3xl font-body text-sm leading-7 text-slate-500">
                      {selectedTrack.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  DETAILS
              ================================================== */}

              <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
                {/* LEFT SELECTOR */}

                <div className="border-b border-slate-100 bg-[#F9FAFC] p-4 lg:border-b-0 lg:border-r lg:p-6">
                  <div className="flex gap-2 overflow-x-auto lg:flex-col">
                    {detailTabs.map((tab) => {
                      const Icon = tab.icon;

                      const isActive = activeDetail === tab.id;

                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveDetail(tab.id)}
                          className={`group flex min-w-max items-center justify-between gap-5 rounded-xl px-4 py-3.5 text-left transition duration-300 lg:w-full ${
                            isActive
                              ? "bg-[#06152C] text-white shadow-[0_12px_30px_rgba(3,11,24,0.12)]"
                              : "text-slate-600 hover:bg-white hover:text-slate-950"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <Icon
                              className={
                                isActive ? "text-[#057CFA]" : "text-slate-400"
                              }
                            />

                            <span className="font-body text-xs font-semibold">
                              {tab.label}
                            </span>
                          </span>

                          <FiArrowRight
                            className={`hidden transition lg:block ${
                              isActive
                                ? "translate-x-0 text-[#057CFA]"
                                : "-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ==================================================
                    RIGHT CONTENT
                ================================================== */}

                <div className="min-h-[390px] p-6 sm:p-8 lg:p-10">
                  <AnimatePresence mode="wait">
                    {/* WHAT YOU'LL LEARN */}

                    {activeDetail === "learn" && (
                      <motion.div
                        key={`${selectedTrack.id}-learn`}
                        initial={{
                          opacity: 1,
                          x: 18,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -12,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-[#057CFA]">
                          What You&apos;ll Learn
                        </p>

                        <h4 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                          Skills you&apos;ll build.
                        </h4>

                        <div className="mt-7 grid gap-3 sm:grid-cols-2">
                          {selectedTrack.learn.map((item, index) => (
                            <motion.div
                              key={item}
                              initial={{
                                opacity: 1,
                                y: 8,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                delay: index * 0.035,
                              }}
                              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-[#F9FAFC] p-4"
                            >
                              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#002DCC]">
                                <FiCheck size={11} />
                              </div>

                              <span className="font-body text-xs font-medium leading-5 text-slate-700">
                                {item}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* TOOLS */}

                    {activeDetail === "tools" && (
                      <motion.div
                        key={`${selectedTrack.id}-tools`}
                        initial={{
                          opacity: 1,
                          x: 18,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -12,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-[#057CFA]">
                          {tr("Tools & Technologies")}
                        </p>

                        <h4 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                          Technologies you&apos;ll work with.
                        </h4>

                        <p className="mt-3 max-w-xl font-body text-sm leading-7 text-slate-500">
                          Explore the tools used throughout this learning track.
                        </p>

                        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {selectedTrack.tools.map((tool, index) => {
                            const Icon = tool.icon;

                            return (
                              <motion.div
                                key={tool.name}
                                initial={{
                                  opacity: 1,
                                  y: 8,
                                }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                }}
                                transition={{
                                  delay: index * 0.04,
                                }}
                                className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-[#057CFA]/30 hover:shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F9FC] text-xl text-slate-700 transition group-hover:text-[#002DCC]">
                                  <Icon />
                                </div>

                                <span className="font-body text-[11px] font-semibold text-slate-700">
                                  {tool.name}
                                </span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* OUTCOME */}

                    {activeDetail === "outcome" && (
                      <motion.div
                        key={`${selectedTrack.id}-outcome`}
                        initial={{
                          opacity: 1,
                          x: 18,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: -12,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      >
                        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-[#057CFA]">
                          {tr("Learning Outcome")}
                        </p>

                        <h4 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                          What you&apos;ll take forward.
                        </h4>

                        <div className="relative mt-8 overflow-hidden rounded-[22px] bg-[#06152C] p-6 sm:p-8">
                          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#057CFA]/10 blur-[60px]" />

                          <div className="relative">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#057CFA]/20 bg-[#057CFA]/10 text-[#057CFA]">
                              <FiTarget />
                            </div>

                            <p className="mt-6 max-w-2xl font-heading text-lg font-medium leading-8 text-white sm:text-xl">
                              {selectedTrack.outcome}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ======================================================
            WHAT LEARNERS GAIN
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  {tr("Learning Experience")}
                </p>

                <h2 className="mt-5 max-w-lg font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  {tr("Learning designed around understanding and practice.")}
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  Training combines foundational understanding with practical
                  implementation so learners can connect concepts with real
                  development workflows.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {learnerBenefits.map((benefit, index) => {
                  const Icon = benefit.icon;

                  return (
                    <motion.div
                      key={benefit.title}
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
                      className="rounded-[22px] border border-slate-200 bg-[#F9FAFC] p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#002DCC]">
                          <Icon />
                        </div>

                        <div>
                          <h3 className="font-heading text-sm font-semibold text-slate-950">
                            {benefit.title}
                          </h3>

                          <p className="mt-2 font-body text-xs leading-6 text-slate-500">
                            {benefit.description}
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
            WHO IT'S FOR
        ====================================================== */}

        <section className="bg-[#F7F9FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                Who It&apos;s For
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Build skills for your next learning step.
              </h2>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: FiUsers,
                  title: tr("Students"),
                  description:
                    "Learners looking to strengthen technical knowledge alongside academic learning.",
                },

                {
                  icon: FiBookOpen,
                  title: tr("Beginners"),
                  description:
                    "People beginning their journey in programming, data, AI or modern development technologies.",
                },

                {
                  icon: FiZap,
                  title: tr("Skill Builders"),
                  description:
                    "Learners looking to expand their practical exposure to a new technology or development area.",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
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
                    className="rounded-[24px] border border-slate-200 bg-white p-6 text-center"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#002DCC]">
                      <Icon />
                    </div>

                    <h3 className="mt-5 font-heading text-lg font-semibold text-slate-950">
                      {item.title}
                    </h3>

                    <p className="mt-3 font-body text-sm leading-7 text-slate-500">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ======================================================
            TRAINING PROCESS
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#030b18] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-[#002DCC]/10 blur-[170px]" />

          <div className="relative mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#057CFA]">
                {tr("Learning Process")}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                {tr("Understand. Practice. Build. Apply.")}
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                Our training approach follows a progressive path from
                understanding concepts to applying them practically.
              </p>
            </div>

            <div className="relative mt-14">
              <ProcessFlowGlow />

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {trainingProcess.map((step, index) => (
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
            FAQ
        ====================================================== */}

        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1400px]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                {tr("Frequently Asked Questions")}
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                {tr("Questions about training.")}
              </h2>
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

        {/* ======================================================
            COMMON CTA
        ====================================================== */}

        <CommonCTA
          eyebrow="Start Learning"
          title="Ready to build practical technology skills?"
          description="Explore the right training track for your learning goals and connect with GenData Tech to learn more."
          buttonText="Training Enquiry"
          buttonLink="/contact"
        />
      </main>

      
    </>
  );
}

export default Training;
