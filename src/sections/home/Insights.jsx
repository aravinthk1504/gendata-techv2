"use client"

import { motion } from "motion/react";
import Link from "next/link";
import { homeText, localizedHref } from "../../lib/homeText";



import BlogCard from "../../components/blog/BlogCard";
import { blogPosts } from "../../data/blogData";

function Insights({ content, lang }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);

  // Home page shows only latest 3
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-100 w-200 -translate-x-1/2 rounded-full bg-blue-50 blur-[150px]" />

      <div className="relative mx-auto max-w-350">
        {/* =========================================
            HEADER
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
              {t("insights.eyebrow")}
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
              {t("insights.titleLine1")}
              <span className="block text-slate-400">
                {t("insights.titleLine2")}
              </span>
            </motion.h2>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
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
              className="max-w-md font-body text-sm leading-7 text-slate-500 lg:text-base"
            >
              {t("insights.description")}
            </motion.p>

            <Link
              href={localizedPath("/blog")}
              className="group mt-6 inline-flex items-center gap-3 font-body text-xs font-semibold text-brand-primary"
            >
              {t("insights.viewAll")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* =========================================
            POSTS
        ========================================= */}

        <div className="mt-18 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {latestPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Insights;
