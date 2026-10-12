"use client"

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Link from "next/link";
import { homeText, localizedHref } from "../../lib/homeText";



import {
  FaGithub,
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaLinkedinIn,
} from "react-icons/fa";

const socialLinks = [
  { name: "GitHub", icon: FaGithub, href: "#" },
  { name: "Instagram", icon: FaInstagram, href: "#" },
  { name: "Facebook", icon: FaFacebookF, href: "#" },
  { name: "WhatsApp", icon: FaWhatsapp, href: "#" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "#" },
];

function FinalCTA({ content, lang }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const shouldAnimate = isInView && !reduceMotion;
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-350">
        <motion.div
          initial={{ opacity: 0.96, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[30px] bg-[#06152c] px-6 py-14 sm:rounded-[36px] sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
          <motion.div
            animate={
              shouldAnimate
                ? { x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{
              duration: 14,
              repeat: shouldAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -left-30 -top-40 h-100 w-100 rounded-full bg-brand-primary/25 blur-[120px]"
          />

          <motion.div
            animate={
              shouldAnimate
                ? { x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{
              duration: 16,
              repeat: shouldAnimate ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -bottom-40 -right-20 h-110 w-110 rounded-full bg-brand-accent/15 blur-[130px]"
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          <motion.div
            animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
            transition={{
              duration: 35,
              repeat: shouldAnimate ? Infinity : 0,
              ease: "linear",
            }}
            className="pointer-events-none absolute -right-20 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full border border-dashed border-white/[0.06] lg:block"
          >
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent shadow-[0_0_20px_rgba(5,124,250,1)]" />
          </motion.div>

          <motion.div
            animate={shouldAnimate ? { rotate: -360 } : { rotate: 0 }}
            transition={{
              duration: 25,
              repeat: shouldAnimate ? Infinity : 0,
              ease: "linear",
            }}
            className="pointer-events-none absolute right-5 top-1/2 hidden h-52 w-52 -translate-y-1/2 rounded-full border border-white/[0.05] lg:block"
          >
            <span className="absolute bottom-[10%] left-[10%] h-1.5 w-1.5 rounded-full bg-cyan-300" />
          </motion.div>

          <div className="relative z-10 max-w-4xl">
            <motion.div
              initial={{ opacity: 0.96, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-2 w-2">
                <motion.span
                  animate={
                    shouldAnimate
                      ? { scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }
                      : { scale: 1, opacity: 0.8 }
                  }
                  transition={{
                    duration: 2.5,
                    repeat: shouldAnimate ? Infinity : 0,
                  }}
                  className="absolute h-full w-full rounded-full bg-brand-accent"
                />
                <span className="relative h-2 w-2 rounded-full bg-brand-accent" />
              </span>

              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-brand-accent">
                {t("finalCta.eyebrow")}
              </p>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0.96, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-7 max-w-4xl font-heading text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
            >
              {t("finalCta.titleLine1")}
              <span className="block text-slate-400">{t("finalCta.titleLine2")}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0.96, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-6 max-w-2xl font-body text-sm leading-7 text-slate-200 sm:text-base"
            >
              {t("finalCta.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0.96, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              className="mt-8 flex flex-wrap gap-3 sm:mt-9"
            >
              <Link
                href={localizedPath("/contact")}
                className="group inline-flex items-center gap-3 rounded-full bg-brand-accent px-6 py-3.5 font-body text-xs font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500"
              >
                {t("finalCta.primary")}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href={localizedPath("/training")}
                className="group inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3.5 font-body text-xs font-semibold text-slate-200 backdrop-blur-md transition duration-300 hover:border-white/25 hover:bg-white/[0.08]"
              >
                {t("finalCta.secondary")}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.96, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-9 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-5"
            >
              <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200">
                {t("finalCta.connect")}
              </span>

              <div className="flex items-center gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="group/social relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 backdrop-blur-md transition duration-300 hover:border-brand-accent/40 hover:bg-brand-accent/10 hover:text-white"
                    >
                      <Icon
                        size={16}
                        className="relative z-10 transition-transform duration-300 group-hover/social:scale-110"
                      />
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-brand-accent/10 opacity-0 blur-md transition-opacity duration-300 group-hover/social:opacity-100" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0.96 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="relative z-10 mt-12 border-t border-white/[0.08] pt-6 sm:mt-14 sm:pt-7"
          >
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {t("finalCta.tags", { returnObjects: true }).map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-brand-accent" />
                  <span className="font-body text-[12px] font-medium uppercase tracking-[0.12em] text-slate-400">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA;
