"use client"

import { motion } from "motion/react";
import Link from "next/link";
import { homeText, localizedHref } from "../../lib/homeText";



const getPrograms = (t) => t("training.programs", { returnObjects: true });

function Training({ content, lang }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);
  const programs = getPrograms(t);

  return (
    <section
      id="training"
      className="relative overflow-hidden bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="pointer-events-none absolute -left-50 top-0 h-120 w-120 rounded-full bg-blue-100/60 blur-[150px]" />

      <div className="pointer-events-none absolute -right-50 bottom-0 h-120 w-120 rounded-full bg-indigo-100/40 blur-[150px]" />

      <div className="relative mx-auto max-w-350">
        {/* =========================================
            SECTION INTRO
        ========================================= */}

        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.p
              initial={{
                opacity: 0.28,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-brand-primary"
            >
              {t("training.eyebrow")}
            </motion.p>

            <motion.h2
              initial={{
                opacity: 0.28,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08,
              }}
              className="mt-5 max-w-4xl font-heading text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl"
            >
              {t("training.titleLine1")}
              <span className="block text-slate-400">{t("training.titleLine2")}</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{
              opacity: 0.28,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            className="max-w-md font-body text-sm leading-7 text-slate-500 lg:col-span-4 lg:justify-self-end lg:text-base"
          >
            {t("training.description")}
          </motion.p>
        </div>

        {/* =========================================
            TRAINING PROGRAM LIST
        ========================================= */}

        <div className="mt-20 border-t border-slate-200">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              initial={{
                opacity: 0.28,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.04,
              }}
              className="group relative border-b border-slate-200"
            >
              {/* Hover background */}

              <div className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />

              <div className="relative grid gap-5 py-7 sm:grid-cols-[60px_1fr] lg:grid-cols-[70px_1.2fr_1fr_auto] lg:items-center lg:py-8">
                {/* NUMBER */}

                <span className="font-body text-[10px] font-semibold tracking-[0.15em] text-slate-400">
                  {program.number}
                </span>

                {/* TITLE */}

                <div>
                  <p className="font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-primary">
                    {program.category}
                  </p>

                  <h3 className="mt-2 font-heading text-xl font-semibold tracking-[-0.02em] text-slate-900 transition-colors duration-300 group-hover:text-brand-primary sm:text-2xl">
                    {program.title}
                  </h3>
                </div>

                {/* TOPICS */}

                <div className="flex flex-wrap gap-2 sm:col-start-2 lg:col-start-auto">
                  {program.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-body text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-500"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* ARROW */}

                <Link
                  href={localizedPath("/training")}
                  aria-label={t("training.exploreAria", { title: program.title })}
                  className="hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-sm text-brand-primary transition duration-300 group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white lg:flex"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>

              {/* Mobile description */}

              <div className="relative -mt-2 pb-7 pl-0 sm:pl-15 lg:hidden">
                <p className="max-w-xl font-body text-sm leading-6 text-slate-500">
                  {program.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* =========================================
            TRAINING CTA
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0.28,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="relative mt-16 overflow-hidden rounded-[30px] bg-[#06152c] px-7 py-9 sm:px-10 lg:px-12 lg:py-11"
        >
          {/* Glow */}

          <div className="pointer-events-none absolute -right-20 top-1/2 h-70 w-70 -translate-y-1/2 rounded-full bg-brand-accent/20 blur-[90px]" />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-accent">
                {t("training.ctaEyebrow")}
              </p>

              <h3 className="mt-4 max-w-2xl font-heading text-2xl font-semibold leading-snug tracking-[-0.025em] text-white sm:text-3xl">
                {t("training.ctaTitle")}
              </h3>

              <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-slate-200">
                {t("training.ctaDescription")}
              </p>
            </div>

            <Link
              href={localizedPath("/training")}
              className="group inline-flex w-fit items-center gap-3 rounded-full bg-brand-accent px-6 py-3.5 font-body text-xs font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
            >
              {t("training.ctaButton")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Training;
