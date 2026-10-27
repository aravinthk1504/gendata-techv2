"use client"

import Link from "next/link";
import { homeText, localizedHref } from "../../lib/homeText";


import { motion } from "motion/react";

const logoMark = "/assets/gendata-tech-mark.webp"

import { FaGithub, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const getFooterLinks = (t, lang) => ({
  [t("footer.sections.services")]: [
    {
      label: lang === "de" ? "KI-/ML-Entwicklung" : "AI/ML Development",
      path: "/services/ai-ml-development",
    },
    {
      label: lang === "de" ? "Full-Stack-Entwicklung" : "Full Stack Development",
      path: "/services/full-stack-development",
    },
    {
      label: lang === "de" ? "Softwareentwicklung" : "Software Development",
      path: "/services/software-development",
    },
    {
      label: lang === "de" ? "App-Entwicklung" : "App Development",
      path: "/services/app-development",
    },
    {
      label: lang === "de" ? "IoT-Lösungen" : "IoT Solutions",
      path: "/services/iot-solutions",
    },
  ],

  [t("footer.sections.products")]: [
    {
      label: "GenData LMS",
      path: "/products",
    },
    {
      label: "GenData CRM",
      path: "/products",
    },
    {
      label: "GenData ERP",
      path: "/products",
    },
    {
      label: "GenData Billing",
      path: "/products",
    },
  ],

  [t("footer.sections.explore")]: [
    {
      label: t("footer.explore.training"),
      path: "/training",
    },
    {
      label: t("footer.explore.insights"),
      path: "/blog",
    },
    {
      label: t("footer.explore.contact"),
      path: "/contact",
    },
  ],
});

const socialLinks = [
  {
    name: "GitHub",
    icon: FaGithub,
    href: "https://github.com/gendatatech?tab=repositories",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/gendata_tech",
  },
  {
    name: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/share/19Zj8BtEBo",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/gendata-tech",
  },
];

function Footer({ lang = "en", content = {} }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);
  const footerLinks = getFooterLinks(t, lang);

  return (
    <footer id="footer-legal" className="relative overflow-hidden bg-[#030b18] px-6 pb-7 pt-20 lg:px-10 lg:pt-24">
      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div className="pointer-events-none absolute -bottom-70 left-1/2 h-120 w-180 -translate-x-1/2 rounded-full bg-brand-primary/10 blur-[150px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,.15) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.15) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto max-w-350">
        {/* =====================================
            MAIN FOOTER
        ====================================== */}

        <div className="grid gap-14 border-b border-white/[0.08] pb-16 lg:grid-cols-[1.2fr_1.8fr] lg:gap-20">
          {/* BRAND */}

          <div>
            <Link
              href={localizedPath("/")}
              aria-label="GenData Tech Home"
              className="inline-flex items-center gap-0.5"
            >
              {/* LOGO */}

              <img
                src={logoMark}
                alt="GenData Tech"
                className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12 lg:h-16 lg:w-16"
              />

              {/* BRAND TEXT */}

              <div className="flex flex-col">
                <span
                  className="font-heading text-xl font-bold leading-none tracking-[-0.03em] sm:text-2xl"
                  style={{
                    background:
                      "linear-gradient(90deg, #003DB8 0%, #002DCC 45%, #057CFA 75%, #18BDF2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  GenData Tech
                </span>

                <span className="mt-1 font-body text-[10px] font-medium tracking-[0.04em] text-[#057CFA] sm:text-[10px]">
                  Think - Build - Evolve
                </span>
              </div>
            </Link>

            <p className="mt-7 max-w-md font-body text-sm leading-7 text-slate-300">
              {t("footer.description")}
            </p>

            {/* Social */}

            <div className="mt-8">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200">
                {t("footer.connect")}
              </p>

              <div className="mt-4 flex gap-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      whileHover={{
                        y: -3,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-200 transition duration-300 hover:border-brand-accent/40 hover:bg-brand-accent/10 hover:text-white"
                    >
                      <Icon size={15} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* LINKS */}

          <div className="grid gap-10 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-100">
                  {section}
                </p>

                <div className="mt-5 flex flex-col gap-3.5">
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={localizedPath(link.path)}
                      className="group flex w-fit items-center gap-2 font-body text-xs text-slate-300 transition-colors duration-300 hover:text-white"
                    >
                      <span>{link.label}</span>

                      <span className="translate-x-[-4px] text-brand-accent opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================
            BOTTOM
        ====================================== */}

        <div className="flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-[12px] text-slate-300">
            © {2026} GenData Tech. {t("footer.copyright")}
          </p>

          <div className="flex gap-5">
            <Link
              href="#footer-legal"
              className="font-body text-[12px] text-slate-300 transition hover:text-slate-300"
            >
              {t("footer.privacy")}
            </Link>

            <Link
              href="#footer-legal"
              className="font-body text-[12px] text-slate-300 transition hover:text-slate-300"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
