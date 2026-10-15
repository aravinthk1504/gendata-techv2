"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "motion/react"

import {
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiMapPin,
} from "react-icons/fi"


function BlogCard({ post, index = 0, lang }) {
  const params = useParams()
  const currentLang = lang || params?.lang || "en"
  const isEvent = post.type === "event"

  return (
    <motion.article
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group flex h-full flex-col"
    >
      <Link
        href={`/${currentLang}/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden rounded-[24px] bg-[#06152c]"
        aria-label={`Open ${post.title}`}
      >
        {post.image ? (
          <img
            src={post.image}
            alt={post.imageAlt || post.title}
            loading="lazy"
            decoding="async"
            width="1200"
            height="750"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="absolute inset-0">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#057CFA]/20 blur-[80px]" />
            <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-[#002DCC]/20 blur-[80px]" />

            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
                `,
                backgroundSize: "42px 42px",
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="max-w-[260px] text-center">
                <p className="font-body text-[9px] font-semibold uppercase tracking-[0.18em] text-[#057CFA]">
                  {isEvent ? "Event" : currentLang === "de" ? "Einblick" : "Insight"}
                </p>

                <p className="mt-3 font-heading text-lg font-semibold leading-7 text-white">
                  {post.category}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="absolute left-5 top-5">
          <span
            className={`rounded-full border px-3 py-1.5 font-body text-[8px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md ${
              isEvent
                ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                : "border-white/10 bg-black/20 text-blue-100"
            }`}
          >
            {isEvent ? "Event" : currentLang === "de" ? "Artikel" : "Article"}
          </span>
        </div>

        <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition duration-300 group-hover:border-[#057CFA] group-hover:bg-[#057CFA]">
          <FiArrowUpRight />
        </div>
      </Link>


      <div className="flex flex-1 flex-col pt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-body text-[10px] font-semibold uppercase tracking-[0.15em] text-[#002DCC]">
            {post.category}
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          {isEvent ? (
            <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-slate-400">
              <FiCalendar />
              {post.eventDate}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-slate-400">
              <FiClock />
              {post.readTime}
            </span>
          )}
        </div>

        <Link href={`/${currentLang}/blog/${post.slug}`}>
          <h3 className="mt-4 font-heading text-xl font-semibold leading-snug tracking-[-0.025em] text-slate-950 transition-colors duration-300 group-hover:text-[#002DCC] sm:text-2xl">
            {post.title}
          </h3>
        </Link>

        <p className="mt-4 font-body text-sm leading-7 text-slate-500">
          {post.excerpt}
        </p>

        {isEvent && post.location && (
          <div className="mt-4 flex items-center gap-2 font-body text-[11px] text-slate-400">
            <FiMapPin className="shrink-0" />
            <span>{post.location}</span>
          </div>
        )}

        <Link
          href={`/${currentLang}/blog/${post.slug}`}
          className="mt-6 inline-flex w-fit items-center gap-2 font-body text-xs font-semibold text-[#002DCC]"
        >
          {isEvent ? (currentLang === "de" ? "Event ansehen" : "View event") : (currentLang === "de" ? "Artikel lesen" : "Read article")}

          <FiArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  )
}


export default BlogCard
