"use client"

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import { homeText, localizedHref } from "../../lib/homeText";




/**
 * Each diagram animates only while its own card is in view. Reduced-motion
 * visitors see the complete, static diagram, including every connector.
 */
function useCardMotion() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "0px 0px -5% 0px" });
  const reduceMotion = useReducedMotion();
  return { ref, active: inView && !reduceMotion };
}

/**
 * Keep the existing gray connector geometry at every breakpoint.
 * Only its small cyan highlight moves, and only when the card is in view.
 */
function FlowLine({ vertical = false, className = "", active = false }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative shrink-0 overflow-hidden bg-slate-300 ${vertical ? "w-[2px]" : "h-[2px]"} ${className}`}
    >
      {active && (
        <motion.span
          className={`absolute left-0 top-0 rounded-full bg-brand-accent ${vertical ? "h-1/2 w-full" : "h-full w-1/2"}`}
          initial={false}
          animate={vertical ? { y: ["-100%", "200%"] } : { x: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

function FullStackVisual() {
  const { ref, active } = useCardMotion();
  const layers = [
    { name: "Frontend", sub: "UI / Web" },
    { name: "API", sub: "Integration" },
    { name: "Backend", sub: "Logic" },
    { name: "Database", sub: "Data" },
  ];

  return (
    <div ref={ref} className="relative mt-8 w-full min-w-0 overflow-visible pb-3 lg:mt-2 lg:flex lg:min-h-70 lg:items-center lg:justify-center lg:overflow-hidden lg:pb-0">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/60 blur-[70px] lg:h-60 lg:w-60 lg:bg-blue-100/70 lg:blur-[80px]" />

      {/* Mobile/tablet: aligned gray connectors between each pair of cards. */}
      <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col px-1 pb-2 lg:hidden">
        {layers.map((layer, index) => (
          <div key={layer.name} className="flex w-full min-w-0 flex-col items-center">
            <div
              className={`relative flex w-full min-w-0 items-center justify-between rounded-2xl border bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ${index === 0 ? "border-brand-accent/30" : "border-slate-200"}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-heading text-[10px] font-semibold ${index === 0 ? "bg-brand-accent text-white" : "bg-slate-50 text-slate-500"}`}
                >
                  0{index + 1}
                </span>
                <div className="min-w-0">
                  <p className={`font-heading text-sm font-semibold ${index === 0 ? "text-brand-primary" : "text-slate-900"}`}>
                    {layer.name}
                  </p>
                  <p className="mt-0.5 font-body text-[9px] text-slate-400">
                    {layer.sub}
                  </p>
                </div>
              </div>
              <span className="ml-2 shrink-0 font-body text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-300">
                {index === layers.length - 1 ? "Store" : "Next"}
              </span>
            </div>
            {index < layers.length - 1 && (
              <FlowLine vertical className="h-7" active={active} />
            )}
          </div>
        ))}
      </div>

      {/* Desktop: horizontal architecture flow */}
      <div className="relative z-10 hidden w-full max-w-xl items-center justify-center lg:flex">
        {layers.map((layer, index) => (
          <div key={layer.name} className="flex items-center">
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className={`relative flex h-22 w-28 flex-col items-center justify-center rounded-2xl border bg-white shadow-[0_10px_35px_rgba(15,23,42,0.05)] ${
                index === 0 ? "border-brand-accent/30" : "border-slate-200"
              }`}
            >
              <span
                className={`font-heading text-xs font-semibold ${
                  index === 0 ? "text-brand-primary" : "text-slate-800"
                }`}
              >
                {layer.name}
              </span>
              <span className="mt-1 font-body text-[9px] text-slate-400">
                {layer.sub}
              </span>
              {index === 0 && (
                <span className="absolute -top-1 h-2 w-2 rounded-full bg-brand-accent shadow-[0_0_15px_rgba(5,124,250,0.8)]" />
              )}
            </motion.div>

            {index !== layers.length - 1 && (
              <FlowLine className="w-8" active={active} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SoftwareVisual() {
  const { ref, active } = useCardMotion();
  const modules = ["Module A", "Module B", "Module C"];

  return (
    <div ref={ref} className="relative mt-auto flex h-52 w-full min-w-0 shrink-0 items-center justify-between gap-0 pt-6 sm:h-48 lg:mt-6 lg:h-40 lg:pt-0">
      <div className="relative z-10 flex w-16 shrink-0 flex-col gap-3 sm:w-20">
        {modules.map((module, index) => (
          <motion.div
            key={module}
            animate={active ? { x: [0, 4, 0] } : { x: 0 }}
            transition={{
              duration: 3,
              delay: index * 0.35,
              repeat: active ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="flex h-10 w-full items-center justify-center rounded-lg border border-slate-200 bg-white font-body text-[7px] font-semibold uppercase tracking-[0.06em] text-slate-500 shadow-sm sm:h-9 sm:text-[8px]"
          >
            {module}
          </motion.div>
        ))}
      </div>

      <FlowLine className="min-w-0 flex-1" active={active} />

      <motion.div
        animate={active ? { scale: [1, 1.04, 1] } : { scale: 1 }}
        transition={{ duration: 3, repeat: active ? Infinity : 0 }}
        className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-primary shadow-[0_15px_40px_rgba(0,45,204,0.18)] sm:h-20 sm:w-20"
      >
        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
          Core
        </span>
      </motion.div>

      <FlowLine className="min-w-0 flex-1" active={active} />

      <div className="relative z-10 flex h-16 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 sm:h-16 sm:w-16">
        <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-primary">
          Data
        </span>
      </div>
    </div>
  );
}

function AppVisual() {
  const { ref, active } = useCardMotion();
  return (
    <div ref={ref} className="relative mt-auto flex h-52 w-full min-w-0 shrink-0 items-center justify-between gap-0 pt-6 sm:h-48 lg:mt-6 lg:h-40 lg:pt-0">
      <motion.div
        animate={active ? { y: [0, 5, 0] } : { y: 0 }}
        transition={{ duration: 4, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        className="relative z-10 flex h-28 w-14 shrink-0 items-center justify-center rounded-[20px] border-2 border-slate-800 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:h-27 sm:w-17"
      >
        <div className="text-center">
          <div className="mx-auto h-8 w-8 rounded-lg bg-blue-50 sm:h-7 sm:w-7" />
          <p className="mt-2 font-body text-[7px] font-semibold uppercase tracking-[0.1em] text-slate-500">
            Android
          </p>
        </div>
      </motion.div>

      <FlowLine className="min-w-0 flex-1" active={active} />

      <motion.div
        animate={active ? { scale: [1, 1.035, 1] } : { scale: 1 }}
        transition={{ duration: 3, repeat: active ? Infinity : 0 }}
        className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-primary to-brand-accent sm:h-20 sm:w-20"
      >
        <span className="text-center font-heading text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
          App
          <br />
          Core
        </span>
      </motion.div>

      <FlowLine className="min-w-0 flex-1" active={active} />

      <motion.div
        animate={active ? { y: [0, -5, 0] } : { y: 0 }}
        transition={{
          duration: 4,
          delay: 0.5,
          repeat: active ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="relative z-10 flex h-28 w-14 shrink-0 items-center justify-center rounded-[20px] border-2 border-slate-800 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:h-27 sm:w-17"
      >
        <div className="text-center">
          <div className="mx-auto h-8 w-8 rounded-full bg-slate-100 sm:h-7 sm:w-7" />
          <p className="mt-2 font-body text-[7px] font-semibold uppercase tracking-[0.1em] text-slate-500">
            iOS
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function IoTVisual() {
  const { ref, active } = useCardMotion();
  const items = [
    { title: "Sensor", label: "Input" },
    { title: "Device", label: "Edge" },
    { title: "Cloud", label: "Connect" },
    { title: "AI", label: "Intelligence" },
  ];

  return (
    <div ref={ref} className="relative mt-8 flex min-h-64 items-center justify-center overflow-hidden sm:mt-2 sm:min-h-65">
      <div className="absolute h-55 w-55 rounded-full bg-blue-100/60 blur-[80px]" />

      <div className="relative z-10 grid w-full max-w-sm grid-cols-2 gap-x-4 gap-y-10 px-1 sm:flex sm:max-w-lg sm:items-center sm:justify-center sm:gap-0 sm:px-0">
        {/* Mobile: one continuous connector path behind the four nodes. */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full sm:hidden"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M 25 25 H 75 V 50 H 25 V 75 H 75"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          {active && (
            <motion.path
              d="M 25 25 H 75 V 50 H 25 V 75 H 75"
              fill="none"
              stroke="#057CFA"
              strokeWidth="2.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              pathLength={100}
              strokeDasharray="10 90"
              initial={false}
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          )}
        </svg>
        {items.map((item, index) => (
          <div
            key={item.title}
            className="relative flex items-center justify-center sm:justify-start"
          >
            <motion.div
              animate={index === 3 && active ? { scale: [1, 1.07, 1] } : { scale: 1 }}
              transition={{ duration: 3, repeat: active && index === 3 ? Infinity : 0 }}
              className={`flex h-24 w-24 flex-col items-center justify-center rounded-full border sm:h-20 sm:w-20 ${
                index === 3
                  ? "border-brand-accent bg-brand-primary text-white shadow-[0_12px_35px_rgba(0,45,204,0.2)]"
                  : "border-slate-200 bg-white text-slate-700 shadow-sm"
              }`}
            >
              <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.08em]">
                {item.title}
              </span>
              <span
                className={`mt-1 font-body text-[7px] ${index === 3 ? "text-blue-100" : "text-slate-400"}`}
              >
                {item.label}
              </span>
            </motion.div>

            {index !== items.length - 1 && (
              <FlowLine className="hidden sm:block sm:w-9" active={active} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TechnologyServices({ content, lang }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);

  return (
    <section className="relative overflow-hidden bg-[#F7F9FC] px-6 py-16 sm:py-20 lg:px-10 lg:py-24">
      <div className="pointer-events-none absolute -right-60 top-0 h-150 w-150 rounded-full bg-blue-100/50 blur-[160px]" />
      <div className="pointer-events-none absolute -left-60 bottom-0 h-130 w-130 rounded-full bg-indigo-50/50 blur-[150px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#002dcc 1px, transparent 1px), linear-gradient(90deg, #002dcc 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto max-w-350">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-brand-primary"
            >
              {t("technology.eyebrow")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 1, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl"
            >
              {t("technology.titleLine1")}
              <span className="block text-slate-400">
                {t("technology.titleLine2")}
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md font-body text-sm leading-7 text-slate-600 lg:col-span-4 lg:justify-self-end lg:text-base"
          >
            {t("technology.description")}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:mt-16 lg:mt-20 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 1, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.035)] transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_70px_rgba(15,23,42,0.07)] sm:p-7 lg:col-span-2 lg:p-10"
          >
            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-8">
              <div>
                <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {t("technology.fullStack.label")}
                </span>
                <h3 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.03em] text-slate-950 lg:text-4xl">
                  {t("technology.fullStack.title")}
                </h3>
                <p className="mt-5 max-w-xl font-body text-sm leading-7 text-slate-500">
                  {t("technology.fullStack.description")}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {t("technology.fullStack.tags", { returnObjects: true }).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-body text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-500"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  href={localizedPath("/services")}
                  className="mt-8 hidden items-center gap-3 font-body text-xs font-semibold text-brand-primary lg:inline-flex"
                >
                  {t("technology.explore")}{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
              <FullStackVisual />
              <Link
                href={localizedPath("/services")}
                className="mt-3 inline-flex w-fit items-center gap-3 font-body text-xs font-semibold text-brand-primary lg:hidden"
              >
                {t("technology.explore")}{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 1, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.035)] transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_70px_rgba(15,23,42,0.07)] sm:p-7 lg:p-9"
          >
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {t("technology.software.label")}
            </span>
            <h3 className="mt-5 font-heading text-2xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-3xl">
              {t("technology.software.title")}
            </h3>
            <p className="mt-4 font-body text-sm leading-7 text-slate-500">
              {t("technology.software.description")}
            </p>
            <SoftwareVisual />
            <Link
              href={localizedPath("/services")}
              className="mt-4 inline-flex items-center gap-3 font-body text-xs font-semibold text-brand-primary"
            >
              {t("technology.explore")}{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.article>

          <motion.article
            initial={{ opacity: 1, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="group flex h-full flex-col rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.035)] transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_70px_rgba(15,23,42,0.07)] sm:p-7 lg:p-9"
          >
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {t("technology.app.label")}
            </span>
            <h3 className="mt-5 font-heading text-2xl font-semibold tracking-[-0.025em] text-slate-950 sm:text-3xl">
              {t("technology.app.title")}
            </h3>
            <p className="mt-4 font-body text-sm leading-7 text-slate-500">
              {t("technology.app.description")}
            </p>
            <AppVisual />
            <Link
              href={localizedPath("/services")}
              className="mt-4 inline-flex items-center gap-3 font-body text-xs font-semibold text-brand-primary"
            >
              {t("technology.explore")}{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.article>

          <motion.article
            initial={{ opacity: 1, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.18 }}
            className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.035)] transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_70px_rgba(15,23,42,0.07)] sm:p-7 lg:col-span-2 lg:p-10"
          >
            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-8">
              <div>
                <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-primary">
                  {t("technology.iot.label")}
                </span>
                <h3 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.03em] text-slate-950 lg:text-4xl">
                  {t("technology.iot.title")}
                </h3>
                <p className="mt-5 max-w-xl font-body text-sm leading-7 text-slate-500">
                  {t("technology.iot.description")}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {t("technology.iot.tags", { returnObjects: true }).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 font-body text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-500"
                      >
                        {item}
                      </span>
                    ))}
                </div>
                <Link
                  href={localizedPath("/services")}
                  className="mt-8 hidden items-center gap-3 font-body text-xs font-semibold text-brand-primary lg:inline-flex"
                >
                  {t("technology.explore")}{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
              <IoTVisual />
              <Link
                href={localizedPath("/services")}
                className="mt-3 inline-flex w-fit items-center gap-3 font-body text-xs font-semibold text-brand-primary lg:hidden"
              >
                {t("technology.explore")}{" "}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default TechnologyServices;
