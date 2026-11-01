"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FiBookOpen, FiCode, FiCpu, FiCheckCircle } from "react-icons/fi";
import useHeroAutoCycle from "../layout/useHeroAutoCycle";

// Conceptual examples demonstrate the learning approach, not real student records.
const tracks = [
  {
    id: "ai-ml",
    label: "AI & ML",
    learn: "Python fundamentals",
    practice: "Train an ML model",
    build: "Complete a project",
    outcome: "Image Classification Concept",
    de: {
      label: "KI & ML",
      learn: "Python-Grundlagen",
      practice: "ML-Modell trainieren",
      build: "Projekt umsetzen",
      outcome: "Bildklassifizierungs-Konzept",
    },
  },
  {
    id: "data-science",
    label: "Data Science",
    learn: "Data preparation",
    practice: "Explore visual insights",
    build: "Build a dashboard",
    outcome: "Interactive Data Dashboard",
    de: {
      label: "Data Science",
      learn: "Daten aufbereiten",
      practice: "Daten visualisieren",
      build: "Dashboard erstellen",
      outcome: "Interaktives Daten-Dashboard",
    },
  },
  {
    id: "iot",
    label: "IoT Development",
    learn: "Sensor fundamentals",
    practice: "Program a controller",
    build: "Connect a prototype",
    outcome: "Smart Monitoring System",
    de: {
      label: "IoT-Entwicklung",
      learn: "Sensor-Grundlagen",
      practice: "Controller programmieren",
      build: "Prototyp verbinden",
      outcome: "Intelligentes Monitoring-System",
    },
  },
];

const steps = [
  { number: "01", name: "Learn", nameDe: "Lernen", title: "Understand", titleDe: "Verstehen", field: "learn", Icon: FiBookOpen },
  { number: "02", name: "Practice", nameDe: "Üben", title: "Apply", titleDe: "Anwenden", field: "practice", Icon: FiCode },
  { number: "03", name: "Build", nameDe: "Bauen", title: "Create", titleDe: "Entwickeln", field: "build", Icon: FiCpu },
];

export default function TrainingHeroDashboard({ active = true, lang = "en" }) {
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const autoCycle = useHeroAutoCycle({
    active,
    index: selected,
    setIndex: setSelected,
    count: tracks.length,
    delay: 5000,
  });
  const german = lang === "de";
  const track = tracks[selected];
  const details = german ? track.de : track;

  return (
    <div
      {...autoCycle}
      className="relative mx-auto w-full min-w-0 max-w-[500px]"
      aria-label={german ? "Interaktive Lernreise" : "Interactive learning journey"}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-body text-[9px] font-medium uppercase tracking-[0.12em] text-[#80aeca]">
        <span>GenData / {german ? "Lernreise" : "Learning Journey"}</span>
        <span className="text-[#74eacb]">{german ? "● Konzept-Demo" : "● Concept demo"}</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[#325873] bg-[linear-gradient(145deg,rgba(11,39,65,0.98),rgba(7,26,47,0.98))] px-3 pb-4 pt-4 shadow-[0_24px_60px_rgba(0,0,0,0.3)] sm:px-4">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 h-52 w-64 -translate-x-1/2 rounded-full bg-[#057cfa]/[0.08] blur-[65px]" />

        <div
          className="relative flex flex-wrap gap-2"
          role="group"
          aria-label={german ? "Vorschau-Lernpfad wählen" : "Choose a sample learning track"}
        >
          {tracks.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={`rounded-lg border px-2.5 py-2 font-body text-[10px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:px-3 ${selected === index
                ? "border-[#258ffc] bg-[#057cfa] text-white"
                : "border-[#355975] bg-[#10283f] text-[#aec9dc] hover:border-cyan-400 hover:text-white"}`}
            >
              {german ? item.de.label : item.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={track.id}
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
            className="relative"
          >
            {/* Three connected learning stages with a gentle downward flow. */}
            <div className="relative mt-5 grid min-h-[195px] grid-cols-3 gap-2 sm:gap-2.5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[6%] right-[6%] top-[104px] h-px bg-gradient-to-r from-transparent via-[#1bcfff]/75 to-transparent"
              />
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative min-w-0 self-start rounded-xl border border-[#315573] bg-[linear-gradient(160deg,#103e5b,#0a2138)] px-2.5 py-3 shadow-[0_12px_27px_rgba(0,0,0,0.24)] sm:px-3 ${index === 1 ? "translate-y-3" : index === 2 ? "translate-y-6" : ""}`}
                >
                  <p className="font-body text-[9px] font-bold uppercase tracking-[0.07em] text-[#64d6fa]">
                    {step.number} / {german ? step.nameDe : step.name}
                  </p>
                  <div className="my-2.5 flex h-8 w-8 items-center justify-center rounded-lg border border-[#2986bd] bg-[#0b4a73] text-[#7cdbff]">
                    <step.Icon size={17} aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-[12px] font-semibold leading-snug text-[#f1faff]">
                    {german ? step.titleDe : step.title}
                  </h3>
                  <p className="mt-1.5 min-h-[45px] font-body text-[10px] leading-snug text-[#b0cada]">
                    {details[step.field]}
                  </p>
                  <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-[#244b64]" aria-hidden="true">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-[#087afa] to-[#67e7f7]"
                      initial={false}
                      animate={{ width: active ? "80%" : "56%" }}
                      transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : index * 0.18 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-4 flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[#286e97] bg-gradient-to-r from-[#123b59] to-[#0b2943] px-3 py-3">
              <div className="min-w-0">
                <p className="font-body text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8dc2dc]">
                  {german ? "Projekt-Ergebnis" : "Project outcome"}
                </p>
                <p className="mt-1.5 font-heading text-[12px] font-semibold leading-snug text-[#e0f6ff] sm:text-[13px]">
                  {details.outcome}
                </p>
              </div>
              <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2997b6] bg-[#174c6a] text-[#92f5e9]">
                <FiCheckCircle size={19} />
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-3 text-center font-body text-[9px] uppercase leading-relaxed tracking-[0.09em] text-[#829db5]">
        {german
          ? "Illustrativer Lernpfad · praxisorientierte Projektentwicklung"
          : "Illustrative learning path · hands-on project development"}
      </p>
    </div>
  );
}
