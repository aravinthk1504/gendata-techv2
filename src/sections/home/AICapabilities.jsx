"use client"

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { homeText, localizedHref } from "../../lib/homeText";

/* =========================================================
   AI MODEL VISUAL
========================================================= */

function ModelVisual() {
  const bars = [42, 65, 48, 82, 58, 92, 72, 54];

  return (
    <div className="relative mt-6 h-36 overflow-hidden rounded-2xl border border-white/8 bg-white/3 sm:mt-8 sm:h-40 lg:mt-10 lg:h-42">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* CSS animations run on physical devices even before Motion hydration. */}
      <div className="absolute inset-x-5 bottom-4 flex h-22 items-end justify-between gap-2 sm:inset-x-6 sm:bottom-5 sm:h-26 lg:h-28">
        {bars.map((height, index) => (
          <div
            key={index}
            style={{
              height: `${height}%`,
              transformOrigin: "bottom",
              animationDelay: `${index * -0.21}s`,
            }}
            className="gd-ai-model-bar w-full rounded-t-sm bg-linear-to-t from-brand-primary/40 to-brand-accent"
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="gd-ai-model-scan pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-transparent via-blue-300/10 to-transparent"
      />
    </div>
  );
}

/* =========================================================
   AGENTIC AI VISUAL
========================================================= */

function AgentVisual({ shouldAnimate }) {
  return (
    <div className="relative mt-6 flex h-36 items-center justify-center sm:mt-8 sm:h-40 lg:mt-10 lg:h-42">
      <motion.div
        animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
        transition={{
          duration: 18,
          repeat: shouldAnimate ? Infinity : 0,
          ease: "linear",
        }}
        className="absolute h-30 w-30 rounded-full border border-blue-300/12 sm:h-32 sm:w-32 lg:h-34 lg:w-34"
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent shadow-[0_0_18px_rgba(5,124,250,1)]" />
      </motion.div>

      <motion.div
        animate={shouldAnimate ? { rotate: -360 } : { rotate: 0 }}
        transition={{
          duration: 13,
          repeat: shouldAnimate ? Infinity : 0,
          ease: "linear",
        }}
        className="absolute h-22 w-22 rounded-full border border-blue-300/10 sm:h-24 sm:w-24"
      >
        <span className="absolute bottom-1 left-1 h-1.5 w-1.5 rounded-full bg-blue-300" />
      </motion.div>

      <motion.div
        animate={shouldAnimate ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 3, repeat: shouldAnimate ? Infinity : 0 }}
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-accent/30 bg-brand-accent/10 shadow-[0_0_45px_rgba(5,124,250,0.15)] sm:h-18 sm:w-18"
      >
        <span className="font-heading text-sm font-semibold text-white">
          AGENT
        </span>
      </motion.div>

      <div className="absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-blue-300/70" />
      <div className="absolute right-[12%] top-[32%] h-2 w-2 rounded-full bg-brand-accent" />
      <div className="absolute bottom-[15%] left-[25%] h-2 w-2 rounded-full bg-blue-200/60" />
    </div>
  );
}

/* =========================================================
   AUTOMATION VISUAL
========================================================= */

function AutomationVisual({ shouldAnimate, content }) {
  const t = (key, variables) => homeText(content, key, variables);
  const steps = t("aiCapabilities.automation.steps", { returnObjects: true });

  return (
    <div className="mt-6 flex h-28 items-center justify-between sm:mt-8 sm:h-30 lg:mt-10 lg:h-34">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-1 items-center">
          <motion.div
            whileHover={{ y: -4 }}
            className="relative z-10 flex h-14 min-w-14 items-center justify-center rounded-xl border border-white/10 bg-white/4 px-2 sm:h-16 sm:min-w-16 sm:px-3"
          >
            <span className="font-body text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-300 sm:text-[10px]">
              {step}
            </span>
          </motion.div>

          {index !== steps.length - 1 && (
            <div className="relative mx-2 h-px flex-1 overflow-hidden bg-white/10">
              <motion.span
                animate={
                  shouldAnimate ? { x: ["-100%", "200%"] } : { x: "-100%" }
                }
                transition={{
                  duration: 2,
                  delay: index * 0.5,
                  repeat: shouldAnimate ? Infinity : 0,
                  ease: "linear",
                }}
                className="absolute left-0 top-0 h-px w-1/2 bg-linear-to-r from-transparent via-brand-accent to-transparent"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   CUSTOM AI VISUAL
========================================================= */

function CustomAIVisual({ shouldAnimate }) {
  const nodes = [
    { x: "50%", y: "15%" },
    { x: "20%", y: "48%" },
    { x: "80%", y: "48%" },
    { x: "35%", y: "82%" },
    { x: "65%", y: "82%" },
  ];

  return (
    <div className="relative mt-6 h-34 sm:mt-8 sm:h-38 lg:h-40">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 150"
        preserveAspectRatio="none"
      >
        <line x1="200" y1="25" x2="80" y2="72" stroke="rgba(5,124,250,.20)" />
        <line x1="200" y1="25" x2="320" y2="72" stroke="rgba(5,124,250,.20)" />
        <line x1="80" y1="72" x2="140" y2="123" stroke="rgba(5,124,250,.15)" />
        <line x1="320" y1="72" x2="260" y2="123" stroke="rgba(5,124,250,.15)" />
        <line
          x1="140"
          y1="123"
          x2="260"
          y2="123"
          stroke="rgba(5,124,250,.12)"
        />
      </svg>

      {nodes.map((node, index) => (
        <motion.div
          key={index}
          animate={
            shouldAnimate
              ? { scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }
              : { scale: 1, opacity: 0.7 }
          }
          transition={{
            duration: 3,
            delay: index * 0.4,
            repeat: shouldAnimate ? Infinity : 0,
          }}
          style={{ left: node.x, top: node.y }}
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/50 bg-brand-accent shadow-[0_0_20px_rgba(5,124,250,0.45)]"
        />
      ))}
    </div>
  );
}

/* =========================================================
   MAIN AI CAPABILITIES SECTION
========================================================= */

function AICapabilities({ content, lang }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const shouldAnimate = isInView && !reduceMotion;
  const t = (key, variables) => homeText(content, key, variables);

  return (
    <section
      id="ai-capabilities"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-36"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-100 w-200 -translate-x-1/2 rounded-full bg-brand-primary/8 blur-[160px]" />

      <div className="relative mx-auto max-w-350">
        <div className="mb-12 grid gap-7 sm:mb-14 lg:mb-16 lg:grid-cols-2 lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-brand-accent"
            >
              {t("aiCapabilities.eyebrow")}
            </motion.p>

            <motion.h2
              initial={{ opacity: 1, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-5 max-w-3xl font-heading text-4xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl"
            >
              {t("aiCapabilities.titleLine1")}
              <span className="block text-slate-400">
                {t("aiCapabilities.titleLine2")}
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl font-body text-sm leading-7 text-slate-200 lg:justify-self-end lg:text-base"
          >
            {t("aiCapabilities.description")}
          </motion.p>
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          <motion.article
            initial={{ opacity: 1, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/3 p-6 sm:p-7 lg:col-span-7 lg:p-9"
          >
            <div className="absolute right-0 top-0 h-50 w-50 rounded-full bg-brand-accent/8 blur-[90px] transition duration-500 group-hover:bg-brand-accent/12" />
            <div className="relative">
              <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-accent">
                {t("aiCapabilities.models.label")}
              </span>
              <h3 className="mt-5 font-heading text-2xl font-semibold text-white sm:text-3xl">
                {t("aiCapabilities.models.title")}
              </h3>
              <p className="mt-4 max-w-xl font-body text-sm leading-7 text-slate-300">
                {t("aiCapabilities.models.description")}
              </p>
              <ModelVisual />
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 1, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/3 p-6 sm:p-7 lg:col-span-5 lg:p-9"
          >
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {t("aiCapabilities.agents.label")}
            </span>
            <h3 className="mt-5 font-heading text-2xl font-semibold text-white sm:text-3xl">
              {t("aiCapabilities.agents.title")}
            </h3>
            <p className="mt-4 font-body text-sm leading-7 text-slate-300">
              {t("aiCapabilities.agents.description")}
            </p>
            <AgentVisual shouldAnimate={shouldAnimate} />
          </motion.article>

          <motion.article
            initial={{ opacity: 1, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/3 p-6 sm:p-7 lg:col-span-5 lg:p-9"
          >
            <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {t("aiCapabilities.automation.label")}
            </span>
            <h3 className="mt-5 font-heading text-2xl font-semibold text-white sm:text-3xl">
              {t("aiCapabilities.automation.title")}
            </h3>
            <p className="mt-4 font-body text-sm leading-7 text-slate-300">
              {t("aiCapabilities.automation.description")}
            </p>
            <AutomationVisual shouldAnimate={shouldAnimate} content={content} />
          </motion.article>

          <motion.article
            initial={{ opacity: 1, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl border border-white/8 bg-linear-to-br from-brand-primary/12 to-white/3 p-6 sm:p-7 lg:col-span-7 lg:p-9"
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:items-center lg:gap-5">
              <div>
                <span className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-accent">
                  {t("aiCapabilities.custom.label")}
                </span>
                <h3 className="mt-5 font-heading text-2xl font-semibold text-white sm:text-3xl">
                  {t("aiCapabilities.custom.title")}
                </h3>
                <p className="mt-4 font-body text-sm leading-7 text-slate-300">
                  {t("aiCapabilities.custom.description")}
                </p>
              </div>
              <CustomAIVisual shouldAnimate={shouldAnimate} />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default AICapabilities;
