"use client"

import { motion } from "motion/react";
import Link from "next/link";
import { homeText, localizedHref } from "../../lib/homeText";



function FullStackVisual() {
  const layers = [
    { name: "Frontend", sub: "UI / Web" },
    { name: "API", sub: "Integration" },
    { name: "Backend", sub: "Logic" },
    { name: "Database", sub: "Data" },
  ];

  return (
    <div className="relative mt-8 overflow-hidden lg:mt-2 lg:flex lg:min-h-70 lg:items-center lg:justify-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/60 blur-[70px] lg:h-60 lg:w-60 lg:bg-blue-100/70 lg:blur-[80px]" />

      {/* Mobile / tablet: vertical architecture flow */}
      <div className="relative z-10 mx-auto flex max-w-sm flex-col items-stretch gap-0 lg:hidden">
        {layers.map((layer, index) => (
          <div key={layer.name} className="relative">
            <motion.div
              initial={{ opacity: 0.28, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              className={`relative flex items-center justify-between rounded-2xl border bg-white px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] ${
                index === 0 ? "border-brand-accent/30" : "border-slate-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-heading text-[10px] font-semibold ${
                    index === 0
                      ? "bg-brand-accent text-white"
                      : "bg-slate-50 text-slate-500"
                  }`}
                >
                  0{index + 1}
                </span>

                <div>
                  <p
                    className={`font-heading text-sm font-semibold ${
                      index === 0 ? "text-brand-primary" : "text-slate-900"
                    }`}
                  >
                    {layer.name}
                  </p>
                  <p className="mt-0.5 font-body text-[9px] text-slate-400">
                    {layer.sub}
                  </p>
                </div>
              </div>

              <span className="font-body text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-300">
                {index === layers.length - 1 ? "Store" : "Next"}
              </span>
            </motion.div>

            {index !== layers.length - 1 && (
              <div className="relative mx-auto h-6 w-px overflow-hidden bg-slate-200">
                <motion.span
                  animate={{ y: ["-100%", "250%"] }}
                  transition={{
                    duration: 1.6,
                    delay: index * 0.25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-0 h-1/2 w-px bg-brand-accent"
                />
              </div>
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
              <div className="relative h-px w-8 overflow-hidden bg-slate-200">
                <motion.span
                  animate={{ x: ["-100%", "250%"] }}
                  transition={{
                    duration: 2,
                    delay: index * 0.4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-px w-1/2 bg-brand-accent"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SoftwareVisual() {
  const modules = ["Module A", "Module B", "Module C"];

  return (
    <div className="relative mt-7 flex h-48 items-center justify-center sm:mt-8 sm:h-44">
      <div className="absolute left-0 flex flex-col gap-3 sm:left-1">
        {modules.map((module, index) => (
          <motion.div
            key={module}
            animate={{ x: [0, 4, 0] }}
            transition={{
              duration: 3,
              delay: index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-10 w-22 items-center justify-center rounded-lg border border-slate-200 bg-white font-body text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-500 shadow-sm sm:h-9 sm:w-20"
          >
            {module}
          </motion.div>
        ))}
      </div>

      <div className="absolute left-[29%] h-px w-[17%] bg-slate-200 sm:left-[32%] sm:w-[16%]" />

      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="relative z-10 flex h-22 w-22 items-center justify-center rounded-2xl bg-brand-primary shadow-[0_15px_40px_rgba(0,45,204,0.18)] sm:h-20 sm:w-20"
      >
        <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
          Core
        </span>
      </motion.div>

      <div className="absolute right-[20%] h-px w-[17%] overflow-hidden bg-slate-200 sm:right-[22%] sm:w-[16%]">
        <motion.span
          animate={{ x: ["-100%", "250%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          className="absolute h-px w-1/2 bg-brand-accent"
        />
      </div>

      <div className="absolute right-0 flex h-18 w-18 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 sm:h-16 sm:w-16">
        <span className="font-heading text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-primary">
          Data
        </span>
      </div>
    </div>
  );
}

function AppVisual() {
  return (
    <div className="relative mt-7 flex h-48 items-center justify-center sm:mt-8 sm:h-44">
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[4%] flex h-30 w-20 items-center justify-center rounded-[20px] border-2 border-slate-800 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:left-[12%] sm:h-27 sm:w-17"
      >
        <div className="text-center">
          <div className="mx-auto h-8 w-8 rounded-lg bg-blue-50 sm:h-7 sm:w-7" />
          <p className="mt-2 font-body text-[7px] font-semibold uppercase tracking-[0.1em] text-slate-500">
            Android
          </p>
        </div>
      </motion.div>

      <div className="absolute left-[27%] h-px w-[16%] bg-slate-200 sm:left-[31%] sm:w-[15%]" />

      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 rgba(5,124,250,0)",
            "0 0 30px rgba(5,124,250,0.18)",
            "0 0 0 rgba(5,124,250,0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="relative z-10 flex h-22 w-22 items-center justify-center rounded-2xl bg-linear-to-br from-brand-primary to-brand-accent sm:h-20 sm:w-20"
      >
        <span className="text-center font-heading text-[9px] font-semibold uppercase tracking-[0.1em] text-white">
          App
          <br />
          Core
        </span>
      </motion.div>

      <div className="absolute right-[27%] h-px w-[16%] bg-slate-200 sm:right-[31%] sm:w-[15%]" />

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[4%] flex h-30 w-20 items-center justify-center rounded-[20px] border-2 border-slate-800 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:right-[12%] sm:h-27 sm:w-17"
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
  const items = [
    { title: "Sensor", label: "Input" },
    { title: "Device", label: "Edge" },
    { title: "Cloud", label: "Connect" },
    { title: "AI", label: "Intelligence" },
  ];

  return (
    <div className="relative mt-2 flex min-h-64 items-center justify-center overflow-hidden sm:min-h-65">
      <div className="absolute h-55 w-55 rounded-full bg-blue-100/60 blur-[80px]" />

      <div className="relative z-10 grid w-full max-w-sm grid-cols-2 gap-4 px-1 sm:flex sm:max-w-lg sm:items-center sm:justify-center sm:gap-0 sm:px-0">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="relative flex items-center justify-center sm:justify-start"
          >
            <motion.div
              animate={index === 3 ? { scale: [1, 1.07, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity }}
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
              <div className="relative hidden h-px w-5 overflow-hidden bg-slate-200 sm:block sm:w-9">
                <motion.span
                  animate={{ x: ["-100%", "250%"] }}
                  transition={{
                    duration: 1.8,
                    delay: index * 0.35,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-px w-1/2 bg-brand-accent"
                />
              </div>
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
    <section className="relative overflow-hidden bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
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
              initial={{ opacity: 0.28, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-brand-primary"
            >
              {t("technology.eyebrow")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0.28, y: 30 }}
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
            initial={{ opacity: 0.28, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md font-body text-sm leading-7 text-slate-600 lg:col-span-4 lg:justify-self-end lg:text-base"
          >
            {t("technology.description")}
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 sm:mt-16 lg:mt-20 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0.28, y: 35 }}
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
                  className="mt-8 inline-flex items-center gap-3 font-body text-xs font-semibold text-brand-primary"
                >
                  {t("technology.explore")}{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
              <FullStackVisual />
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0.28, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="group rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.035)] transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_70px_rgba(15,23,42,0.07)] sm:p-7 lg:p-9"
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
              className="inline-flex items-center gap-3 font-body text-xs font-semibold text-brand-primary"
            >
              {t("technology.explore")}{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.article>

          <motion.article
            initial={{ opacity: 0.28, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.14 }}
            className="group rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.035)] transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_70px_rgba(15,23,42,0.07)] sm:p-7 lg:p-9"
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
              className="inline-flex items-center gap-3 font-body text-xs font-semibold text-brand-primary"
            >
              {t("technology.explore")}{" "}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.article>

          <motion.article
            initial={{ opacity: 0.28, y: 35 }}
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
                  className="mt-8 inline-flex items-center gap-3 font-body text-xs font-semibold text-brand-primary"
                >
                  {t("technology.explore")}{" "}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
              <IoTVisual />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default TechnologyServices;
