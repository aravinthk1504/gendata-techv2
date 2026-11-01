"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { FiBookOpen, FiUsers, FiGrid, FiCreditCard } from "react-icons/fi";

const AUTO_SWITCH_MS = 5000;

// Demonstration-only software screens; all dashboard numbers are illustrative.
const products = [
  {
    id: "lms", label:"LMS", title:"Learning Management", titleDe:"Lernmanagement",
    category:"LMS / EDUCATION", categoryDe:"LMS / BILDUNG",
    metrics:[["Courses","08"],["Learning paths","04"]],
    metricsDe:["Kurse","Lernpfade"],
    chart:"Learning activity", chartDe:"Lernaktivität",
    features:["Course management","Student progress"],
    featuresDe:["Kursverwaltung","Lernfortschritt"],
    bars:[30,49,38,73,58,85,68,95], Icon:FiBookOpen,
  },
  {
    id: "crm", label:"CRM", title:"Customer Management", titleDe:"Kundenmanagement",
    category:"CRM / RELATIONSHIPS", categoryDe:"CRM / KUNDEN",
    metrics:[["Contacts","128"],["Lead pipelines","04"]],
    metricsDe:["Kontakte","Lead-Pipelines"],
    chart:"Lead activity", chartDe:"Lead-Aktivität",
    features:["Customer records","Follow-up tracking"],
    featuresDe:["Kundendaten","Nachverfolgung"],
    bars:[43,62,38,72,54,86,79,94], Icon:FiUsers,
  },
  {
    id: "erp", label:"ERP", title:"Business Operations", titleDe:"Geschäftsprozesse",
    category:"ERP / OPERATIONS", categoryDe:"ERP / PROZESSE",
    metrics:[["Business units","04"],["Workflows","12"]],
    metricsDe:["Geschäftsbereiche","Workflows"],
    chart:"Operational activity", chartDe:"Betriebsaktivität",
    features:["Inventory overview","Workflow management"],
    featuresDe:["Bestandsübersicht","Workflow-Verwaltung"],
    bars:[35,54,70,51,84,68,90,78], Icon:FiGrid,
  },
  {
    id: "billing", label:"Billing", title:"Billing & Invoicing", titleDe:"Rechnungsstellung",
    category:"BILLING / FINANCE", categoryDe:"BILLING / FINANZEN",
    metrics:[["Sample invoices","48"],["Example revenue","₹24K"]],
    metricsDe:["Beispielrechnungen","Beispielumsatz"],
    chart:"Billing activity", chartDe:"Rechnungsaktivität",
    features:["Invoice creation","Payment records"],
    featuresDe:["Rechnungen erstellen","Zahlungsübersicht"],
    bars:[25,58,36,73,55,89,74,96], Icon:FiCreditCard,
  },
];

export default function ProductWorkspaceHero({ active = true, lang = "en" }) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const rootRef = useRef(null);
  const visible = useInView(rootRef, { margin: "-10% 0px -10% 0px" });
  const reducedMotion = useReducedMotion();
  const play = active && visible && pageVisible && !reducedMotion && !hovered && !focused;
  const german = lang === "de";
  const current = products[selected];

  // Selecting a tab restarts the five-second countdown. Stop when hidden,
  // reduced motion is requested, or the visitor is interacting with the demo.
  useEffect(() => {
    if (!play) return;
    const timer = window.setTimeout(() => {
      if (document.visibilityState === "visible") {
        setSelected((previous) => (previous + 1) % products.length);
      }
    }, AUTO_SWITCH_MS);
    return () => window.clearTimeout(timer);
  }, [play, selected]);

  // A tab hidden before a pending tick becomes visible again should resume.
  useEffect(() => {
    const sync = () => setPageVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return (
    <div ref={rootRef} className="relative mx-auto w-full min-w-0 max-w-[520px]"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-body text-[9px] uppercase tracking-[0.11em] text-[#89b3d1]">
        <span>GenData / {german ? "Produkt-Workspace" : "Product Workspace"}</span>
        <span className="text-[#74e6c0]">{german ? "● Interaktive Demo" : "● Interactive demo"}</span>
      </div>
      <div className="relative h-[308px] w-full sm:h-[335px]">
        <div className="pointer-events-none absolute inset-[10%] rounded-full bg-[#087cfb]/[0.12] blur-[45px]" aria-hidden="true"/>
        <div aria-hidden="true" className="pointer-events-none absolute left-[10%] top-[44px] h-[237px] w-[84%] rotate-[8deg] rounded-xl border border-[#286b97]/70 bg-gradient-to-br from-[#103b5a]/70 to-[#09213a]/70 sm:top-[47px] sm:h-[260px]"/>
        <div aria-hidden="true" className="pointer-events-none absolute left-[6%] top-[41px] h-[237px] w-[86%] -rotate-[5deg] rounded-xl border border-[#286b97]/70 bg-gradient-to-br from-[#103b5a]/70 to-[#09213a]/70 sm:top-[43px] sm:h-[260px]"/>
        <motion.div
          animate={play ? { y: [0, -5, 0] } : { y: 0 }}
          transition={{ duration: 7, ease: "easeInOut", repeat: play ? Infinity : 0 }}
          className="absolute left-[3%] top-4 flex h-[278px] w-[94%] flex-col overflow-hidden rounded-xl border border-[#3b86ad] bg-[#0b1d33] shadow-[0_23px_55px_rgba(0,0,0,0.48)] sm:h-[299px]"
        >
          <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#284761] bg-[#102c47] px-3">
            <span className="flex gap-1" aria-hidden="true"><i className="h-[5px] w-[5px] rounded-full bg-slate-500"/><i className="h-[5px] w-[5px] rounded-full bg-slate-500"/><i className="h-[5px] w-[5px] rounded-full bg-slate-500"/></span>
            <span className="font-heading text-[11px] font-bold text-white">GenData <span className="text-cyan-300">Suite</span></span>
            <span className="font-body text-[9px] text-[#7fe9cb]">● {german ? "KONZEPT" : "CONCEPT"}</span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden px-3 py-3 sm:px-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={current.id}
                initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
              >
                <div className="flex min-w-0 items-center justify-between gap-2">
                  <h3 className="truncate font-heading text-[13px] font-semibold text-[#f2faff] sm:text-[15px]">{german ? current.titleDe : current.title}</h3>
                  <span className="shrink-0 font-body text-[8px] uppercase tracking-[0.04em] text-[#69d8f6]">{german ? current.categoryDe : current.category}</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {current.metrics.map(([label, value], index) => (
                    <div key={label} className="rounded-lg border border-[#2a526e] bg-[#14334f] p-2.5">
                      <p className="truncate font-body text-[9px] text-[#a3c3d8]">{german ? current.metricsDe[index] : label}</p>
                      <p className="mt-1 font-heading text-[18px] font-bold text-[#e3f7ff]">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-2.5 font-body text-[9px] text-[#9dbbd2]">{german ? current.chartDe : current.chart} / {german ? "Beispieldaten" : "Sample data"}</p>
                <div aria-hidden="true" className="mt-1 flex h-10 items-end gap-1.5 border-b border-[#34536b] px-1">
                  {current.bars.map((height,i)=>(
                    <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#1165b7] to-[#62d8fb]"
                      style={{ height: `${height}%` }}/>
                  ))}
                </div>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  {(german ? current.featuresDe : current.features).map((item,i) =>
                    <span key={i} className="truncate rounded-md border border-[#295371] bg-[#102f47] px-2 py-1.5 font-body text-[9px] text-[#c6e5f5]">{item}</span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2" role="group"
        aria-label={german ? "Produktkonzept auswählen" : "Select product concept preview"}>
        {products.map((item,index)=>(
          <button key={item.id} type="button" aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 font-body text-[10px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${selected === index
              ? "border-[#057cfa] bg-[#057cfa] text-white"
              : "border-[#345674] bg-[#10263d] text-[#c4daea] hover:border-cyan-400 hover:text-white"}`}>
            <item.Icon size={13} aria-hidden="true"/> {item.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center font-body text-[9px] uppercase tracking-[0.08em] text-[#85a7bc]">
        {german ? "Illustrative Softwarekonzepte · simulierte Daten" : "Illustrative software concepts · simulated data"}
      </p>
    </div>
  );
}
