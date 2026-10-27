"use client"

import { useParams } from "next/navigation";
import ProcessFlowGlow from "../../layout/ProcessFlowGlow"

import { useRef, useState } from "react"

import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "motion/react"

import {
  FiActivity,
  FiArrowRight,
  FiChevronDown,
  FiCloud,
  FiCpu,
  FiDatabase,
  FiGitBranch,
  FiLayers,
  FiRepeat,
  FiSettings,
  FiTarget,
  FiWifi,
} from "react-icons/fi"

import Link from "../../layout/LocalizedLink"

const translationsDE = {"IoT Solutions":"IoT-Lösungen","Service Overview":"Leistungsüberblick","What We Offer":"Unsere Leistungen","Use Cases":"Anwendungsfälle","Technology Stack":"Technologie-Stack","Development Process":"Entwicklungsprozess","Why GenData Tech":"Warum GenData Tech","Frequently Asked Questions":"Häufig gestellte Fragen","Sensor Monitoring":"Sensorüberwachung","Device Automation":"Geräteautomatisierung","Remote Monitoring":"Fernüberwachung","IoT Dashboards":"IoT-Dashboards","Alerts & Notifications":"Warnmeldungen und Benachrichtigungen","AI-enabled IoT":"KI-gestütztes IoT","Connect devices, data":"Geräte und Daten verbinden","and intelligent automation.":"mit intelligenter Automatisierung.","Discuss Your IoT Requirement":"IoT-Projekt besprechen","Requirement":"Anforderungen","System Design":"Systemdesign","Device Setup":"Geräteeinrichtung","Programming":"Programmierung","Integration":"Integration","Testing":"Tests","Deployment":"Bereitstellung","Questions about IoT development.":"Fragen zur IoT-Entwicklung.","IoT systems designed to collect and monitor data from connected sensors and devices.":"IoT-Systeme zur Erfassung und Überwachung von Daten vernetzter Sensoren und Geräte.","Connected systems that automate actions using sensor inputs, control logic and defined operating conditions.":"Vernetzte Systeme, die Aktionen anhand von Sensordaten, Steuerlogik und definierten Betriebsbedingungen automatisieren.","Monitoring solutions that provide access to device and sensor information through connected dashboards or applications.":"Überwachungslösungen, die Geräte- und Sensordaten über vernetzte Dashboards oder Anwendungen zugänglich machen.","Interfaces for visualizing sensor values, device status, alerts and operational information.":"Oberflächen zur Darstellung von Sensorwerten, Gerätestatus, Warnmeldungen und Betriebsinformationen.","Notification systems designed to respond when sensor values or device conditions meet defined thresholds.":"Benachrichtigungssysteme, die auf festgelegte Grenzwerte oder Gerätezustände reagieren.","IoT systems that can combine connected devices with AI or machine learning for intelligent monitoring and automation.":"IoT-Systeme, die vernetzte Geräte mit KI oder maschinellem Lernen für intelligente Überwachung und Automatisierung verbinden.","Understand the environment, devices, sensors and expected system outcome.":"Umgebung, Geräte, Sensoren und gewünschtes Systemergebnis verstehen.","Plan hardware, connectivity, monitoring and control architecture.":"Hardware, Vernetzung, Überwachung und Steuerungsarchitektur planen.","Configure controllers, sensors and required electronic components.":"Controller, Sensoren und benötigte elektronische Bauteile konfigurieren.","Develop the logic required for monitoring, control and automation.":"Die Logik für Überwachung, Steuerung und Automatisierung entwickeln.","Connect devices with dashboards, APIs, applications or cloud services.":"Geräte mit Dashboards, APIs, Anwendungen oder Cloud-Diensten verbinden.","Validate sensor readings, connectivity, automation and system behavior.":"Sensorwerte, Verbindungen, Automatisierung und Systemverhalten prüfen.","Prepare the connected system for practical operation and future refinement.":"Das vernetzte System für den praktischen Einsatz und spätere Verbesserungen vorbereiten.","Problem-led IoT Design":"Problemorientiertes IoT-Design","We begin by understanding what needs to be monitored, controlled or automated before selecting devices and technology.":"Zuerst klären wir, was überwacht, gesteuert oder automatisiert werden soll, bevor wir Geräte und Technologien auswählen.","Hardware + Software":"Hardware und Software","We consider sensors, controllers, connectivity, dashboards and applications as one connected system.":"Wir betrachten Sensoren, Controller, Vernetzung, Dashboards und Anwendungen als zusammenhängendes System.","Automation-focused":"Automatisierung im Fokus","IoT functionality can be structured around monitoring, control rules and practical automation requirements.":"IoT-Funktionen werden auf Überwachung, Steuerungsregeln und konkrete Automatisierungsanforderungen abgestimmt.","Expandable Architecture":"Erweiterbare Architektur","Connected systems can be planned so additional devices, sensors and software integrations can be added later.":"Vernetzte Systeme lassen sich so planen, dass später weitere Geräte, Sensoren und Softwareintegrationen ergänzt werden können.","What IoT solutions does GenData Tech provide?":"Welche IoT-Lösungen bietet GenData Tech an?","GenData Tech provides IoT development around sensor monitoring, device automation, connected dashboards, alerts and integration with software applications.":"GenData Tech entwickelt IoT-Lösungen für Sensorüberwachung, Geräteautomatisierung, vernetzte Dashboards, Warnmeldungen und die Integration in Softwareanwendungen.","Which controllers do you use for IoT development?":"Welche Controller verwenden Sie für die IoT-Entwicklung?","We can work with controllers such as ESP32 depending on the device, sensor, connectivity and project requirements.":"Je nach Geräte-, Sensor-, Verbindungs- und Projektanforderungen setzen wir Controller wie den ESP32 ein.","Can IoT systems monitor sensor data remotely?":"Können IoT-Systeme Sensordaten aus der Ferne überwachen?","Yes. Sensor information can be connected to dashboards or applications so device values and system status can be monitored remotely when suitable connectivity is available.":"Ja. Bei geeigneter Verbindung lassen sich Sensorwerte und Systemstatus über Dashboards oder Anwendungen aus der Ferne überwachen.","Can IoT devices automatically control equipment?":"Können IoT-Geräte Anlagen automatisch steuern?","Yes. Devices can be programmed to trigger actions based on sensor values, thresholds, operating modes or other defined conditions.":"Ja. Geräte können abhängig von Sensorwerten, Schwellenwerten, Betriebsmodi oder anderen festgelegten Bedingungen Aktionen auslösen.","Can you build an IoT dashboard?":"Können Sie ein IoT-Dashboard entwickeln?","Yes. IoT systems can include dashboards for displaying sensor values, device status, alerts and related operational information.":"Ja. IoT-Systeme können Dashboards zur Anzeige von Sensorwerten, Gerätestatus, Warnmeldungen und Betriebsinformationen enthalten.","Can notifications be added to an IoT system?":"Können Benachrichtigungen in ein IoT-System integriert werden?","Yes. Alerts or notifications can be configured when sensor values or device conditions meet defined criteria.":"Ja. Warnungen und Benachrichtigungen können ausgelöst werden, sobald Sensorwerte oder Gerätezustände bestimmte Kriterien erfüllen.","Can AI or machine learning be integrated with IoT?":"Lassen sich KI oder maschinelles Lernen in IoT integrieren?","Yes. IoT data can be connected with AI or machine learning systems when intelligent monitoring, prediction or automation provides a useful outcome.":"Ja. IoT-Daten können mit KI- oder Machine-Learning-Systemen verknüpft werden, wenn intelligente Überwachung, Vorhersagen oder Automatisierung einen Mehrwert bieten.","Can I discuss an IoT idea before choosing the hardware?":"Kann ich eine IoT-Idee besprechen, bevor ich die Hardware auswähle?","Yes. You can share what needs to be monitored or automated first. The suitable sensors, controllers and technical structure can then be identified.":"Ja. Beschreiben Sie zunächst, was überwacht oder automatisiert werden soll. Anschließend können wir geeignete Sensoren, Controller und die technische Architektur auswählen.","Connected Layer":"Vernetzte Ebene","Sensors":"Sensoren","Automation":"Automatisierung","Monitoring":"Überwachung","Connected systems built around real-world environments.":"Vernetzte Systeme für reale Einsatzumgebungen.","IoT capabilities from sensing to automation.":"IoT-Kompetenzen von der Sensorik bis zur Automatisierung.","Future real IoT project showcase goes here.":"Hier werden künftig reale IoT-Projekte vorgestellt.","Technologies for connected device systems.":"Technologien für vernetzte Gerätesysteme.","From physical environment to connected system.":"Von der physischen Umgebung zum vernetzten System.","IoT development that connects the physical and digital layers.":"IoT-Entwicklung, die physische und digitale Systeme verbindet.","Build a Connected System":"Vernetztes System entwickeln","Have an IoT monitoring or automation requirement?":"Sie benötigen eine Lösung für IoT-Überwachung oder Automatisierung?","Discuss Your IoT Project":"IoT-Projekt besprechen"};
function IoTSolutions() {
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
      title: tr("Sensor Monitoring"),
      description: tr("IoT systems designed to collect and monitor data from connected sensors and devices."),
    },

    {
      number: "02",
      title: tr("Device Automation"),
      description: tr("Connected systems that automate actions using sensor inputs, control logic and defined operating conditions."),
    },

    {
      number: "03",
      title: tr("Remote Monitoring"),
      description: tr("Monitoring solutions that provide access to device and sensor information through connected dashboards or applications."),
    },

    {
      number: "04",
      title: tr("IoT Dashboards"),
      description: tr("Interfaces for visualizing sensor values, device status, alerts and operational information."),
    },

    {
      number: "05",
      title: tr("Alerts & Notifications"),
      description: tr("Notification systems designed to respond when sensor values or device conditions meet defined thresholds."),
    },

    {
      number: "06",
      title: tr("AI-enabled IoT"),
      description: tr("IoT systems that can combine connected devices with AI or machine learning for intelligent monitoring and automation."),
    },
  ]


  /* ======================================================
      TECHNOLOGY STACK
  ====================================================== */

  const technologyStack = [
    {
      icon: FiCpu,
      category: "Hardware & Controllers",
      technologies: [
        "ESP32",
        tr("Sensors"),
        "Relay Modules",
      ],
    },

    {
      icon: FiWifi,
      category: "Connectivity",
      technologies: [
        "Wi-Fi",
        "HTTP",
        "IoT Connectivity",
      ],
    },

    {
      icon: FiActivity,
      category: tr("Monitoring"),
      technologies: [
        "Sensor Data",
        "Device Status",
        "Real-time Values",
      ],
    },

    {
      icon: FiCloud,
      category: "IoT Platforms",
      technologies: [
        "Blynk",
        "Cloud Dashboards",
      ],
    },

    {
      icon: FiDatabase,
      category: "Data & Integration",
      technologies: [
        "APIs",
        "Data Storage",
        "Application Integration",
      ],
    },

    {
      icon: FiGitBranch,
      category: "Development Tools",
      technologies: [
        "Arduino IDE",
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
      title: tr("Requirement"),
      description:
        tr("Understand the environment, devices, sensors and expected system outcome."),
    },

    {
      number: "02",
      title: tr("System Design"),
      description:
        tr("Plan hardware, connectivity, monitoring and control architecture."),
    },

    {
      number: "03",
      title: tr("Device Setup"),
      description:
        tr("Configure controllers, sensors and required electronic components."),
    },

    {
      number: "04",
      title: tr("Programming"),
      description:
        tr("Develop the logic required for monitoring, control and automation."),
    },

    {
      number: "05",
      title: tr("Integration"),
      description:
        tr("Connect devices with dashboards, APIs, applications or cloud services."),
    },

    {
      number: "06",
      title: tr("Testing"),
      description:
        tr("Validate sensor readings, connectivity, automation and system behavior."),
    },

    {
      number: "07",
      title: tr("Deployment"),
      description:
        tr("Prepare the connected system for practical operation and future refinement."),
    },
  ]


  /* ======================================================
      WHY GENDATA TECH
  ====================================================== */

  const reasons = [
    {
      icon: FiTarget,
      title: tr("Problem-led IoT Design"),
      description:
        tr("We begin by understanding what needs to be monitored, controlled or automated before selecting devices and technology."),
    },

    {
      icon: FiLayers,
      title: tr("Hardware + Software"),
      description:
        tr("We consider sensors, controllers, connectivity, dashboards and applications as one connected system."),
    },

    {
      icon: FiSettings,
      title: tr("Automation-focused"),
      description:
        tr("IoT functionality can be structured around monitoring, control rules and practical automation requirements."),
    },

    {
      icon: FiRepeat,
      title: tr("Expandable Architecture"),
      description:
        tr("Connected systems can be planned so additional devices, sensors and software integrations can be added later."),
    },
  ]


  /* ======================================================
      FAQ
  ====================================================== */

  const faqs = [
    {
      question:
        tr("What IoT solutions does GenData Tech provide?"),
      answer:
        tr("GenData Tech provides IoT development around sensor monitoring, device automation, connected dashboards, alerts and integration with software applications."),
    },

    {
      question:
        tr("Which controllers do you use for IoT development?"),
      answer:
        tr("We can work with controllers such as ESP32 depending on the device, sensor, connectivity and project requirements."),
    },

    {
      question:
        tr("Can IoT systems monitor sensor data remotely?"),
      answer:
        tr("Yes. Sensor information can be connected to dashboards or applications so device values and system status can be monitored remotely when suitable connectivity is available."),
    },

    {
      question:
        tr("Can IoT devices automatically control equipment?"),
      answer:
        tr("Yes. Devices can be programmed to trigger actions based on sensor values, thresholds, operating modes or other defined conditions."),
    },

    {
      question:
        tr("Can you build an IoT dashboard?"),
      answer:
        tr("Yes. IoT systems can include dashboards for displaying sensor values, device status, alerts and related operational information."),
    },

    {
      question:
        tr("Can notifications be added to an IoT system?"),
      answer:
        tr("Yes. Alerts or notifications can be configured when sensor values or device conditions meet defined criteria."),
    },

    {
      question:
        tr("Can AI or machine learning be integrated with IoT?"),
      answer:
        tr("Yes. IoT data can be connected with AI or machine learning systems when intelligent monitoring, prediction or automation provides a useful outcome."),
    },

    {
      question:
        tr("Can I discuss an IoT idea before choosing the hardware?"),
      answer:
        tr("Yes. You can share what needs to be monitored or automated first. The suitable sensors, controllers and technical structure can then be identified."),
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

            <div className="grid min-w-0 min-h-[530px] items-center gap-10 sm:min-h-[530px] sm:gap-12 lg:min-h-[465px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-10" >

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
                  {tr("IoT Solutions")}
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
                    duration: 0.6,
                    delay: 0.08,
                  }}
                  className="mt-5 max-w-4xl font-heading text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
                >
                  {tr("Connect devices, data")}

                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    {tr("and intelligent automation.")}
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
                  className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base sm:leading-8"
                >
                  GenData Tech develops connected IoT systems that
                  combine sensors, controllers, monitoring,
                  automation and software integration.
                </motion.p>


                <motion.div
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
                    duration: 0.55,
                    delay: 0.28,
                  }}
                  className="mt-6"
                >

                  <Link
                    to="/contact"
                    className="gd-hero-button gd-hero-button--primary group "
                  >
                    {tr("Discuss Your IoT Requirement")}

                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </Link>

                </motion.div>


                <motion.div
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
                    duration: 0.55,
                    delay: 0.22,
                  }}
                  className="mt-6 flex flex-wrap gap-2.5"
                >

                  {[
                    tr("Sensors"),
                    tr("Monitoring"),
                    tr("Automation"),
                    "Connected Systems",
                  ].map((item) => (

                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 font-body text-[9px] font-semibold uppercase tracking-[0.13em] text-slate-200"
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
                    repeat:
                      heroShouldAnimate
                        ? Infinity
                        : 0,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 flex h-[125px] w-[125px] flex-col items-center justify-center rounded-full border border-[#057CFA]/25 bg-[#06152C] shadow-[0_0_60px_rgba(5,124,250,0.14)]"
                >

                  <FiWifi className="text-xl text-[#057CFA]" />

                  <span className="mt-2 font-heading text-sm font-semibold text-white">
                    IoT
                  </span>

                  <span className="mt-1 font-body text-[7px] uppercase tracking-[0.18em] text-slate-300">
                    {tr("Connected Layer")}
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
                    repeat:
                      heroShouldAnimate
                        ? Infinity
                        : 0,
                    ease: "easeInOut",
                  }}
                  className="absolute right-2 top-8 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm"
                >
                  <p className="font-body text-[9px] font-semibold text-slate-200">
                    {tr("Sensors")}
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
                  <p className="font-body text-[9px] font-semibold text-slate-200">
                    {tr("Automation")}
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
                  <p className="font-body text-[9px] font-semibold text-slate-200">
                    {tr("Monitoring")}
                  </p>
                </motion.div>

              </motion.div>

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
                  {tr("Connected systems built around real-world environments.")}
                </h2>

              </div>


              <div className="space-y-5">

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  IoT systems connect physical devices with digital
                  software so information can be monitored, controlled
                  and automated.
                </p>

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  GenData Tech develops IoT solutions around sensors,
                  controllers, connectivity and practical monitoring
                  requirements.
                </p>

                <p className="font-body text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Our approach combines device-level development with
                  dashboards, software integration and automation to
                  create connected systems.
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
                {tr("IoT capabilities from sensing to automation.")}
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                We connect hardware, data and software to support
                monitoring, device control and intelligent automation.
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
            USE CASES / PROJECTS

            Enable later when approved real IoT project examples
            are available.
        ====================================================== */}

        {/*
        <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

          <div className="mx-auto max-w-[1400px]">

            {tr("Future real IoT project showcase goes here.")}

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
                  {tr("Technologies for connected device systems.")}
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  The exact hardware and software stack depends on
                  sensor requirements, connectivity, monitoring,
                  automation and the operating environment.
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
                {tr("From physical environment to connected system.")}
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                IoT development combines device planning, sensor
                integration, programming, connectivity and software
                integration through one connected process.
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
                  {tr("IoT development that connects the physical and digital layers.")}
                </h2>

                <p className="mt-5 max-w-md font-body text-sm leading-7 text-slate-500">
                  We approach IoT as a complete connected system,
                  combining hardware, software, data and automation
                  around a practical requirement.
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
                {tr("Questions about IoT development.")}
              </h2>

              <p className="mt-5 font-body text-sm leading-7 text-slate-500 sm:text-base">
                Common questions about sensors, connected devices,
                monitoring, automation and IoT integration.
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
                    {tr("Build a Connected System")}
                  </p>

                  <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    {tr("Have an IoT monitoring or automation requirement?")}
                  </h2>

                  <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base">
                    Share what needs to be monitored, connected or
                    automated. We can discuss the suitable device,
                    sensor and software direction.
                  </p>

                </div>


                <Link
                  to="/contact"
                  className="group inline-flex w-fit items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                >
                  {tr("Discuss Your IoT Project")}

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


export default IoTSolutions