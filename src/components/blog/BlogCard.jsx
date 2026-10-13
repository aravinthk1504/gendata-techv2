"use client"

import Link from "next/link"
import { motion } from "motion/react"


function BlogCard({ post, index = 0, lang = "en" }) {
  return (
    <motion.article
      initial={{
        opacity: 0.55,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
      }}
      className="group flex h-full flex-col"
    >

      {/* =========================================
          ARTICLE VISUAL
      ========================================= */}

      <Link
        href={`/${lang}/blog/${post.slug}`}
        className="relative block h-65 overflow-hidden rounded-[26px] bg-[#06152c]"
      >

        {/* Glow */}

        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-accent/20 blur-[80px]" />

        <div className="absolute -bottom-20 -left-20 h-50 w-50 rounded-full bg-brand-primary/20 blur-[80px]" />


        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,.2) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.2) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "38px 38px",
          }}
        />


        {/* Abstract AI visual */}

        <div className="absolute inset-0 flex items-center justify-center">

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative h-28 w-28 rounded-full border border-blue-300/15"
          >

            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent shadow-[0_0_18px_rgba(5,124,250,1)]" />

            <span className="absolute bottom-[15%] left-[5%] h-1.5 w-1.5 rounded-full bg-cyan-300" />

          </motion.div>


          <div className="absolute flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-accent/20 bg-brand-accent/10 backdrop-blur-sm">

            <span className="h-3 w-3 rounded-full bg-brand-accent shadow-[0_0_25px_rgba(5,124,250,.9)]" />

          </div>

        </div>


        {/* Category */}

        <div className="absolute left-5 top-5">

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-body text-[8px] font-semibold uppercase tracking-[0.15em] text-blue-100 backdrop-blur-md">
            {post.category}
          </span>

        </div>


        {/* Arrow */}

        <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 group-hover:border-brand-accent group-hover:bg-brand-accent">

          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            ↗
          </span>

        </div>

      </Link>



      {/* =========================================
          ARTICLE CONTENT
      ========================================= */}

      <div className="flex flex-1 flex-col pt-6">

        <div className="flex items-center gap-3">

          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.15em] text-brand-primary">
            {post.category}
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          <span className="font-body text-[9px] text-slate-400">
            {post.readTime}
          </span>

        </div>


        <Link href={`/${lang}/blog/${post.slug}`}>

          <h3 className="mt-4 font-heading text-xl font-semibold leading-snug tracking-[-0.025em] text-slate-950 transition-colors duration-300 group-hover:text-brand-primary sm:text-2xl">
            {post.title}
          </h3>

        </Link>


        <p className="mt-4 font-body text-sm leading-7 text-slate-500">
          {post.excerpt}
        </p>


        <Link
          href={`/${lang}/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-3 font-body text-xs font-semibold text-brand-primary"
        >
          Read article

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>

    </motion.article>
  )
}

export default BlogCard