"use client"

import Link from "../layout/LocalizedLink"
import { useParams } from "next/navigation"
import { motion } from "motion/react"

import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiMapPin,
  FiMonitor,
} from "react-icons/fi"

import BlogCard from "../blog/BlogCard"
import CommonCTA from "../layout/CommonCTA"
import { blogPosts } from "../../data/blogData"


function BlogDetails() {
  const { slug } = useParams()

  const post =
    blogPosts.find(
      (item) => item.slug === slug
    )


  if (!post) {
    return (
      <>
        

        <main className="flex min-h-[75vh] flex-col items-center justify-center bg-[#030b18] px-6 pt-[88px] text-center">

          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#057CFA]">
            Content not found
          </p>


          <h1 className="mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl">
            This page may have moved.
          </h1>


          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-[#002DCC]"
          >
            <FiArrowLeft />

            Back to Insights
          </Link>

        </main>

        
      </>
    )
  }


  const isEvent =
    post.type === "event"


  const relatedPosts =
    blogPosts
      .filter(
        (item) =>
          item.id !== post.id &&
          (
            item.category ===
              post.category ||
            item.type === post.type
          )
      )
      .slice(0, 3)


  return (
    <>
      

      <main className="overflow-hidden bg-white">

        {/* ======================================================
            ARTICLE / EVENT HERO
        ====================================================== */}

        <section className="relative overflow-hidden bg-[#030b18] px-6 pt-28 pb-14 sm:pt-32 sm:pb-16 lg:px-10">

          <div className="pointer-events-none absolute left-1/3 top-0 h-[430px] w-[760px] -translate-x-1/2 rounded-full bg-[#002DCC]/15 blur-[160px]" />


          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(5,124,250,0.35) 1px, transparent 1px),
                linear-gradient(90deg, rgba(5,124,250,0.35) 1px, transparent 1px)
              `,
              backgroundSize:
                "72px 72px",
            }}
          />


          <div className="relative mx-auto w-full max-w-[1400px] py-12 sm:py-16 lg:py-20">

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-body text-xs font-medium text-slate-400 transition hover:text-white"
            >
              <FiArrowLeft />

              Back to Insights & Events
            </Link>


            <div className="mt-12 max-w-4xl">

              <div className="flex flex-wrap items-center gap-3">

                <span className="rounded-full border border-[#057CFA]/20 bg-[#057CFA]/10 px-3 py-1.5 font-body text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-100">
                  {isEvent
                    ? "Event"
                    : "Article"}
                </span>


                <span className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-[#057CFA]">
                  {post.category}
                </span>


                {isEvent ? (
                  <>
                    {post.eventDate && (
                      <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-slate-400">
                        <FiCalendar />

                        {post.eventDate}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1.5 font-body text-[10px] text-slate-400">
                    <FiClock />

                    {post.readTime}
                  </span>
                )}
              </div>


              <motion.h1
                initial={{
                  opacity: 1,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="mt-5 max-w-4xl font-heading text-[clamp(2rem,8vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
              >
                {post.title}
              </motion.h1>


              <p className="mt-6 max-w-3xl font-body text-base leading-8 text-slate-300">
                {post.excerpt}
              </p>


              {post.publishedDate && (
                <p className="mt-6 font-body text-[10px] uppercase tracking-[0.16em] text-slate-500">
                  Published {post.publishedDate}
                </p>
              )}
            </div>
          </div>
        </section>



        {/* ======================================================
            FEATURE IMAGE
        ====================================================== */}

        <section className="bg-white px-6 pt-12 lg:px-10 lg:pt-16">

          <div className="mx-auto w-full max-w-[1200px]">

            <div className="relative aspect-[16/8] overflow-hidden rounded-[28px] bg-[#06152C]">

              {post.image ? (
                <img
                  src={post.image}
                  alt={
                    post.imageAlt ||
                    post.title
                  }
                  decoding="async"
                  fetchPriority="high"
                  width="1400"
                  height="700"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#057CFA]/20 blur-[110px]" />
                  <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#002DCC]/20 blur-[100px]" />

                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
                      `,
                      backgroundSize:
                        "58px 58px",
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center p-10 text-center">

                    <div>
                      <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#057CFA]">
                        {post.category}
                      </p>

                      <p className="mt-4 max-w-lg font-heading text-2xl font-semibold text-white sm:text-3xl">
                        {post.title}
                      </p>
                    </div>

                  </div>
                </>
              )}
            </div>
          </div>
        </section>



        {/* ======================================================
            ARTICLE CONTENT
        ====================================================== */}

        {!isEvent && (
          <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

            <article className="mx-auto max-w-[850px]">

              {post.intro && (
                <p className="font-body text-lg leading-9 text-slate-700 sm:text-xl">
                  {post.intro}
                </p>
              )}


              <div className="mt-12 space-y-12">

                {post.sections?.map(
                  (section, index) => (

                    <section
                      key={`${section.heading}-${index}`}
                    >

                      <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
                        {section.heading}
                      </h2>


                      {section.paragraphs?.map(
                        (
                          paragraph,
                          paragraphIndex
                        ) => (

                          <p
                            key={
                              paragraphIndex
                            }
                            className="mt-5 font-body text-base leading-8 text-slate-600"
                          >
                            {paragraph}
                          </p>

                        )
                      )}


                      {section.points?.length >
                        0 && (

                        <div className="mt-6 space-y-3">

                          {section.points.map(
                            (point) => (

                              <div
                                key={point}
                                className="flex items-start gap-3 rounded-xl bg-[#F7F9FC] px-4 py-3"
                              >

                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#002DCC]">
                                  <FiCheck size={11} />
                                </div>

                                <p className="font-body text-sm leading-6 text-slate-600">
                                  {point}
                                </p>

                              </div>

                            )
                          )}

                        </div>

                      )}
                    </section>

                  )
                )}
              </div>


              {post.takeaway && (
                <div className="relative mt-14 overflow-hidden rounded-[24px] bg-[#06152C] p-7 sm:p-9">

                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#057CFA]/10 blur-[60px]" />

                  <div className="relative">

                    <p className="font-body text-[9px] font-semibold uppercase tracking-[0.2em] text-[#057CFA]">
                      Key Takeaway
                    </p>

                    <p className="mt-5 font-heading text-lg font-medium leading-8 text-white sm:text-xl">
                      {post.takeaway}
                    </p>

                  </div>
                </div>
              )}
            </article>
          </section>
        )}



        {/* ======================================================
            EVENT CONTENT
        ====================================================== */}

        {isEvent && (
          <section className="bg-white px-6 py-16 sm:py-20 lg:px-10 lg:py-24">

            <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.68fr_0.32fr]">

              <div>

                <p className="font-body text-lg leading-9 text-slate-700">
                  {post.intro}
                </p>


                {post.topics?.length >
                  0 && (

                  <div className="mt-12">

                    <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                      Topics Covered
                    </h2>


                    <div className="mt-6 grid gap-3 sm:grid-cols-2">

                      {post.topics.map(
                        (topic) => (

                          <div
                            key={topic}
                            className="flex items-start gap-3 rounded-xl bg-[#F7F9FC] px-4 py-3"
                          >

                            <FiCheck className="mt-1 shrink-0 text-[#002DCC]" />

                            <span className="font-body text-sm leading-6 text-slate-600">
                              {topic}
                            </span>

                          </div>

                        )
                      )}
                    </div>
                  </div>
                )}


                {post.audience?.length >
                  0 && (

                  <div className="mt-12">

                    <h2 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                      Who Can Attend
                    </h2>


                    <div className="mt-5 flex flex-wrap gap-2">

                      {post.audience.map(
                        (item) => (

                          <span
                            key={item}
                            className="rounded-full border border-slate-200 bg-white px-4 py-2 font-body text-xs font-medium text-slate-600"
                          >
                            {item}
                          </span>

                        )
                      )}
                    </div>
                  </div>
                )}
              </div>


              <aside className="h-fit rounded-[24px] border border-slate-200 bg-[#F7F9FC] p-6">

                <p className="font-body text-[9px] font-semibold uppercase tracking-[0.18em] text-[#002DCC]">
                  Event Details
                </p>


                <div className="mt-6 space-y-5">

                  {post.eventDate && (
                    <div className="flex gap-3">
                      <FiCalendar className="mt-0.5 shrink-0 text-[#057CFA]" />

                      <div>
                        <p className="font-body text-[10px] uppercase tracking-[0.14em] text-slate-400">
                          Date
                        </p>

                        <p className="mt-1 font-body text-sm font-semibold text-slate-900">
                          {post.eventDate}
                        </p>
                      </div>
                    </div>
                  )}


                  {post.eventTime && (
                    <div className="flex gap-3">
                      <FiClock className="mt-0.5 shrink-0 text-[#057CFA]" />

                      <div>
                        <p className="font-body text-[10px] uppercase tracking-[0.14em] text-slate-400">
                          Time
                        </p>

                        <p className="mt-1 font-body text-sm font-semibold text-slate-900">
                          {post.eventTime}
                        </p>
                      </div>
                    </div>
                  )}


                  {post.location && (
                    <div className="flex gap-3">
                      <FiMapPin className="mt-0.5 shrink-0 text-[#057CFA]" />

                      <div>
                        <p className="font-body text-[10px] uppercase tracking-[0.14em] text-slate-400">
                          Location
                        </p>

                        <p className="mt-1 font-body text-sm font-semibold text-slate-900">
                          {post.location}
                        </p>
                      </div>
                    </div>
                  )}


                  {post.eventMode && (
                    <div className="flex gap-3">
                      <FiMonitor className="mt-0.5 shrink-0 text-[#057CFA]" />

                      <div>
                        <p className="font-body text-[10px] uppercase tracking-[0.14em] text-slate-400">
                          Mode
                        </p>

                        <p className="mt-1 font-body text-sm font-semibold text-slate-900">
                          {post.eventMode}
                        </p>
                      </div>
                    </div>
                  )}
                </div>


                {post.registrationUrl ? (
                  <a
                    href={
                      post.registrationUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#057CFA] px-5 py-3 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                  >
                    Register for Event

                    <FiArrowRight />
                  </a>
                ) : (
                  <Link
                    to="/contact"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#057CFA] px-5 py-3 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
                  >
                    Event Enquiry

                    <FiArrowRight />
                  </Link>
                )}
              </aside>
            </div>
          </section>
        )}



        {/* ======================================================
            RELATED
        ====================================================== */}

        {relatedPosts.length > 0 && (
          <section className="bg-[#F7F9FC] px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

            <div className="mx-auto w-full max-w-[1400px]">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>
                  <p className="font-body text-[12px] font-semibold uppercase tracking-[0.25em] text-[#002DCC]">
                    Keep Exploring
                  </p>

                  <h2 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    Related insights.
                  </h2>
                </div>


                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 font-body text-xs font-semibold text-[#002DCC]"
                >
                  View all

                  <FiArrowRight />
                </Link>
              </div>


              <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">

                {relatedPosts.map(
                  (item, index) => (

                    <BlogCard
                      key={item.id}
                      post={item}
                      index={index}
                    />

                  )
                )}
              </div>
            </div>
          </section>
        )}



        <CommonCTA
          eyebrow={
            isEvent
              ? "Connect With Us"
              : "Explore More"
          }
          title={
            isEvent
              ? "Interested in this event or a future GenData Tech session?"
              : "Have a technology topic or idea you would like to discuss?"
          }
          description={
            isEvent
              ? "Connect with GenData Tech for event details, workshops, training and collaboration opportunities."
              : "Connect with GenData Tech for AI, software, training and technology discussions."
          }
          buttonText="Contact Us"
          buttonLink="/contact"
        />

      </main>

      
    </>
  )
}


export default BlogDetails
