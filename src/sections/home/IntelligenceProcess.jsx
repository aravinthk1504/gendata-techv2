"use client"

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { homeText, localizedHref } from "../../lib/homeText";

const getStages = (t) => t("process.stages", { returnObjects: true });

function PipelineNode({ stage, index, shouldAnimate, totalStages }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      className="group relative"
    >
      <div className="relative z-10 mb-5 flex items-center sm:mb-6 lg:mb-10">
        <motion.div
          whileHover={{ scale: 1.08 }}
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-accent/30 bg-[#06152c]"
        >
          <div className="absolute inset-0 rounded-full bg-brand-accent/10 blur-xl opacity-0 transition duration-500 group-hover:opacity-100" />

          <span className="relative font-heading text-xs font-semibold text-blue-100">
            {stage.number}
          </span>

          <motion.span
            animate={
              shouldAnimate
                ? { scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }
                : { scale: 1, opacity: 0.35 }
            }
            transition={{
              duration: 3,
              delay: index * 0.35,
              repeat: shouldAnimate ? Infinity : 0,
            }}
            className="absolute h-3 w-3 rounded-full border border-brand-accent/50"
          />
        </motion.div>

        {index !== totalStages - 1 && (
          <div className="relative ml-4 h-px flex-1 overflow-hidden bg-white/8 lg:hidden">
            <motion.span
              animate={
                shouldAnimate ? { x: ["-100%", "250%"] } : { x: "-100%" }
              }
              transition={{
                duration: 2.5,
                delay: index * 0.3,
                repeat: shouldAnimate ? Infinity : 0,
                ease: "linear",
              }}
              className="absolute h-px w-1/3 bg-linear-to-r from-transparent via-brand-accent to-transparent"
            />
          </div>
        )}
      </div>

      <div>
        <p className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-accent">
          {stage.label}
        </p>

        <h3 className="mt-3 font-heading text-xl font-semibold text-white">
          {stage.title}
        </h3>

        <p className="mt-3 font-body text-sm leading-7 text-slate-300 sm:mt-4">
          {stage.description}
        </p>
      </div>
    </motion.article>
  );
}

function IntelligenceProcess({ content, lang }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const shouldAnimate = isInView && !reduceMotion;
  const t = (key, variables) => homeText(content, key, variables);
  const stages = getStages(t);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#06152c] px-6 py-20 sm:py-24 lg:px-10 lg:py-36"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-120 w-120 rounded-full bg-brand-primary/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-130 w-130 rounded-full bg-brand-accent/8 blur-[160px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-350">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-brand-accent"
            >
              {t("process.eyebrow")}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
            >
              {t("process.titleLine1")}
              <span className="block text-slate-400">
                {t("process.titleLine2")}
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md font-body text-sm leading-7 text-slate-200 lg:col-span-4 lg:justify-self-end lg:text-base"
          >
            {t("process.description")}
          </motion.p>
        </div>

        <div className="relative mt-14 sm:mt-16 lg:mt-20">
          <div className="absolute left-7 right-7 top-7 hidden h-px bg-white/8 lg:block" />

          <div className="absolute left-7 right-7 top-7 hidden h-px overflow-hidden lg:block">
            <motion.div
              animate={shouldAnimate ? { x: ["-15%", "115%"] } : { x: "-15%" }}
              transition={{
                duration: 7,
                repeat: shouldAnimate ? Infinity : 0,
                ease: "linear",
              }}
              className="absolute h-px w-[18%] bg-linear-to-r from-transparent via-brand-accent to-transparent shadow-[0_0_12px_rgba(5,124,250,0.8)]"
            />
          </div>

          <div className="grid gap-10 sm:gap-11 md:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {stages.map((stage, index) => (
              <PipelineNode
                key={stage.title}
                stage={stage}
                index={index}
                shouldAnimate={shouldAnimate}
                totalStages={stages.length}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 overflow-hidden rounded-3xl border border-white/8 bg-white/3 px-6 py-7 sm:mt-20 sm:px-9 sm:py-8 lg:mt-24 lg:px-12 lg:py-10"
        >
          <div className="absolute right-0 top-1/2 h-50 w-50 -translate-y-1/2 rounded-full bg-brand-accent/10 blur-[90px]" />

          <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
            <div>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-accent">
                {t("process.outcomeLabel")}
              </p>

              <h3 className="mt-4 max-w-3xl font-heading text-2xl font-semibold leading-snug text-white sm:text-3xl">
                {t("process.outcomeTitle")}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-brand-accent/30 bg-brand-accent/10">
                <motion.span
                  animate={
                    shouldAnimate
                      ? { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{
                    duration: 2.5,
                    repeat: shouldAnimate ? Infinity : 0,
                  }}
                  className="h-2.5 w-2.5 rounded-full bg-brand-accent shadow-[0_0_18px_rgba(5,124,250,0.9)]"
                />
              </div>

              <div>
                <p className="font-heading text-sm font-semibold text-white">
                  {t("process.systemTitle")}
                </p>
                <p className="mt-1 font-body text-xs text-slate-400">
                  {t("process.systemSubtitle")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default IntelligenceProcess;
