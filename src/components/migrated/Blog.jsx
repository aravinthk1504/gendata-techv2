"use client"

import { useMemo, useRef, useState } from "react"
import Link from "../layout/LocalizedLink"
import { motion, useInView, useReducedMotion } from "motion/react"

import {
  FiArrowRight,
  FiCalendar,
  FiClock,
} from "react-icons/fi"

import BlogCard from "../blog/BlogCard"
import CommonCTA from "../layout/CommonCTA"
import { blogPosts } from "../../data/blogData"


function Blog() {
  const heroRef = useRef(null)

  const heroInView = useInView(heroRef, {
    margin: "-10% 0px -10% 0px",
    once: true,
  })

  const reduceMotion = useReducedMotion()
  const heroShouldAnimate = heroInView && !reduceMotion

  const [activeType, setActiveType] = useState("all")
  const [activeCategory, setActiveCategory] = useState("All")


  const featuredPost =
    blogPosts.find((post) => post.featured) ||
    blogPosts[0]


  const typeFilteredPosts =
    activeType === "all"
      ? blogPosts
      : blogPosts.filter(
          (post) => post.type === activeType
        )


  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        typeFilteredPosts.map(
          (post) => post.category
        )
      ),
    ]
  }, [typeFilteredPosts])


  const filteredPosts =
    activeCategory === "All"
      ? typeFilteredPosts
      : typeFilteredPosts.filter(
          (post) =>
            post.category === activeCategory
        )


  const handleTypeChange = (type) => {
    setActiveType(type)
    setActiveCategory("All")
  }


  return (
    <>
      

      <main className="overflow-hidden bg-white">

        {/* ======================================================
            HERO
        ====================================================== */}

        <section
          ref={heroRef}
          className="relative overflow-hidden bg-[#030b18] px-6 pt-28 pb-16 sm:pt-32 sm:pb-20 lg:px-10 lg:pt-32 lg:pb-12"
        >
          <motion.div
            className="pointer-events-none absolute left-1/3 top-0 h-[430px] w-[760px] -translate-x-1/2 rounded-full bg-[#002DCC]/15 blur-[160px]"
            animate={
              heroShouldAnimate
                ? {
                    opacity: [0.55, 0.9, 0.55],
                    scale: [1, 1.04, 1],
                  }
                : {
                    opacity: 0.65,
                    scale: 1,
                  }
            }
            transition={{
              duration: 8,
              repeat: heroShouldAnimate
                ? Infinity
                : 0,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="pointer-events-none absolute -right-24 top-20 h-[320px] w-[320px] rounded-full bg-[#057CFA]/10 blur-[110px]"
            animate={
              heroShouldAnimate
                ? {
                    y: [0, 16, 0],
                    opacity: [0.4, 0.75, 0.4],
                  }
                : {
                    y: 0,
                    opacity: 0.5,
                  }
            }
            transition={{
              duration: 8,
              repeat: heroShouldAnimate
                ? Infinity
                : 0,
              ease: "easeInOut",
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(5,124,250,0.35) 1px, transparent 1px),
                linear-gradient(90deg, rgba(5,124,250,0.35) 1px, transparent 1px)
              `,
              backgroundSize: "72px 72px",
            }}
          />

          <div className="relative mx-auto flex w-full max-w-[1400px] items-center py-6 sm:py-8 lg:min-h-[370px] lg:py-0">
            <div className="grid w-full min-w-0 items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">

              <div className="max-w-[690px]">
                <motion.p
                  initial={{ opacity: 1, y: 12 }}
                  animate={
                    heroInView
                      ? { opacity: 1, y: 0 }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                  className="font-body text-[11px] font-semibold uppercase tracking-[0.28em] text-[#057CFA]"
                >
                  GenData Tech / Insights & Events
                </motion.p>


                <motion.h1
                  initial={{ opacity: 1, y: 20 }}
                  animate={
                    heroInView
                      ? { opacity: 1, y: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.08,
                  }}
                  className="mt-5 max-w-4xl font-heading text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
                >
                  Insights that inform.

                  <span className="block bg-gradient-to-r from-white via-blue-100 to-[#057CFA] bg-clip-text text-transparent">
                    Events that connect.
                  </span>
                </motion.h1>


                <motion.p
                  initial={{ opacity: 1, y: 15 }}
                  animate={
                    heroInView
                      ? { opacity: 1, y: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.15,
                  }}
                  className="mt-5 max-w-[650px] font-body text-sm leading-7 text-slate-300 sm:text-base"
                >
                  Explore technical articles, practical ideas,
                  lectures, workshops and events from GenData Tech
                  across AI, software, data and connected technology.
                </motion.p>


                <motion.a
                  href="#insights"
                  initial={{ opacity: 1, y: 12 }}
                  animate={
                    heroInView
                      ? { opacity: 1, y: 0 }
                      : {}
                  }
                  transition={{
                    duration: 0.55,
                    delay: 0.23,
                  }}
                  className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                >
                  Explore Insights
                  <FiArrowRight className="transition group-hover:translate-x-1" />
                </motion.a>
              </div>


              <motion.div
                initial={{
                  opacity: 1,
                  scale: 0.96,
                }}
                animate={
                  heroInView
                    ? {
                        opacity: 1,
                        scale: 1,
                      }
                    : {}
                }
                transition={{
                  duration: 0.65,
                  delay: 0.15,
                }}
                className="relative hidden h-[340px] w-full max-w-[430px] items-center justify-center lg:flex lg:justify-self-center"
              >
                <motion.div
                  className="absolute h-[295px] w-[295px] rounded-full border border-white/[0.06]"
                  animate={
                    heroShouldAnimate
                      ? { rotate: 360 }
                      : {}
                  }
                  transition={{
                    duration: 36,
                    repeat: heroShouldAnimate
                      ? Infinity
                      : 0,
                    ease: "linear",
                  }}
                >
                  <div className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#057CFA] shadow-[0_0_18px_rgba(5,124,250,0.9)]" />
                </motion.div>

                <motion.div
                  className="absolute h-[205px] w-[205px] rounded-full border border-[#057CFA]/15"
                  animate={
                    heroShouldAnimate
                      ? { rotate: -360 }
                      : {}
                  }
                  transition={{
                    duration: 26,
                    repeat: heroShouldAnimate
                      ? Infinity
                      : 0,
                    ease: "linear",
                  }}
                />

                <div className="relative z-10 flex h-[130px] w-[130px] flex-col items-center justify-center rounded-full border border-[#057CFA]/25 bg-[#06152C] shadow-[0_0_60px_rgba(5,124,250,0.15)]">
                  <span className="h-3 w-3 rounded-full bg-[#057CFA] shadow-[0_0_22px_rgba(5,124,250,1)]" />
                  <span className="mt-3 font-heading text-sm font-semibold text-white">
                    Ideas
                  </span>
                  <span className="mt-1 font-body text-[7px] uppercase tracking-[0.18em] text-slate-500">
                    Learn • Share
                  </span>
                </div>

                {[
                  {
                    label: "AI",
                    className: "right-3 top-7",
                  },
                  {
                    label: "Events",
                    className: "bottom-12 left-1",
                  },
                  {
                    label: "Software",
                    className: "bottom-3 right-5",
                  },
                  {
                    label: "IoT",
                    className: "left-5 top-12",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`absolute ${item.className} rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-sm`}
                  >
                    <span className="font-body text-[9px] font-semibold text-slate-300">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>



        {/* ======================================================
            FEATURED
        ====================================================== */}

        {featuredPost && (
          <section className="bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-28">
            <div className="mx-auto w-full max-w-[1400px]">

              <div className="mb-9">
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                  Featured
                </p>

                <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Featured insight.
                </h2>
              </div>


              <div className="grid overflow-hidden rounded-[30px] border border-slate-200 bg-[#F7F9FC] lg:grid-cols-[1.04fr_0.96fr]">

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="relative min-h-[320px] overflow-hidden bg-[#06152c] lg:min-h-[440px]"
                >
                  {featuredPost.image ? (
                    <img
                      src={featuredPost.image}
                      alt={
                        featuredPost.imageAlt ||
                        featuredPost.title
                      }
                      decoding="async"
                      fetchPriority="high"
                      width="1200"
                      height="750"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#057CFA]/20 blur-[100px]" />
                      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#002DCC]/20 blur-[100px]" />

                      <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
                          `,
                          backgroundSize: "52px 52px",
                        }}
                      />

                      <div className="absolute inset-0 flex items-center justify-center p-10 text-center">
                        <div>
                          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#057CFA]">
                            Featured Insight
                          </p>

                          <p className="mt-4 max-w-md font-heading text-2xl font-semibold leading-9 text-white">
                            {featuredPost.category}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </Link>


                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-[#002DCC]">
                      {featuredPost.category}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                    {featuredPost.type === "event" ? (
                      <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-slate-400">
                        <FiCalendar />
                        {featuredPost.eventDate}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-slate-400">
                        <FiClock />
                        {featuredPost.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 font-heading text-3xl font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl">
                    {featuredPost.title}
                  </h3>

                  <p className="mt-5 max-w-xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                    {featuredPost.excerpt}
                  </p>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="group mt-7 inline-flex w-fit items-center gap-2 font-body text-xs font-semibold text-[#002DCC]"
                  >
                    {featuredPost.type === "event"
                      ? "View Event"
                      : "Read Article"}

                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}



        {/* ======================================================
            INSIGHTS & EVENTS
        ====================================================== */}

        <section
          id="insights"
          className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-28"
        >
          <div className="mx-auto w-full max-w-[1400px]">

            <div className="max-w-3xl">
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                Explore
              </p>

              <h2 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
                Insights & Events.
              </h2>

              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-500 sm:text-base">
                Browse technical articles and published
                GenData Tech events from one place.
              </p>
            </div>


            <div className="mt-10 flex flex-wrap gap-2">
              {[
                { id: "all", label: "All" },
                { id: "article", label: "Articles" },
                { id: "event", label: "Events" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    handleTypeChange(item.id)
                  }
                  className={`rounded-full border px-5 py-2.5 font-body text-[10px] font-semibold transition ${
                    activeType === item.id
                      ? "border-[#06152C] bg-[#06152C] text-white"
                      : "border-slate-200 bg-white text-slate-500 hover:border-[#057CFA]/40 hover:text-[#002DCC]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>


            <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-200 pb-7">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`rounded-full px-4 py-2 font-body text-[10px] font-semibold transition ${
                    activeCategory === category
                      ? "bg-[#057CFA] text-white"
                      : "border border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-[#002DCC]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>


            <div className="mt-9">
              <p className="font-body text-xs text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-900">
                  {filteredPosts.length}
                </span>{" "}
                {filteredPosts.length === 1
                  ? "item"
                  : "items"}
              </p>
            </div>


            {filteredPosts.length > 0 ? (
              <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
                {filteredPosts.map(
                  (post, index) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      index={index}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="mt-10 rounded-[24px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                <p className="font-heading text-lg font-semibold text-slate-900">
                  No events published yet.
                </p>

                <p className="mx-auto mt-3 max-w-lg font-body text-sm leading-7 text-slate-500">
                  Lectures, workshops and other GenData Tech
                  events will appear here when they are published.
                </p>
              </div>
            )}
          </div>
        </section>


        <CommonCTA
          eyebrow="Connect With GenData Tech"
          title="Have a topic, workshop or technology idea to discuss?"
          description="Connect with GenData Tech for technical conversations, training enquiries, workshops and collaboration opportunities."
          buttonText="Contact Us"
          buttonLink="/contact"
        />

      </main>

      
    </>
  )
}


export default Blog
