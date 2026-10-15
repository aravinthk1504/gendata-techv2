"use client"

import { motion } from "motion/react"
import { FiArrowRight } from "react-icons/fi"
import Link from "../layout/LocalizedLink"
import { useParams } from "next/navigation"


function CommonCTA({
  eyebrow = "Start a Conversation",
  title = "Have something you would like to discuss?",
  description = "Share your requirement with GenData Tech and we can help identify the right next step.",
  buttonText = "Contact Us",
  buttonLink = "/contact",
}) {
  const { lang } = useParams()
  const de = lang === "de"
  const localize = (value) => {
    if (!de) return value
    const translations = {
      "Start a Conversation": "Gespräch beginnen",
      "Have something you would like to discuss?": "Möchten Sie ein Projekt mit uns besprechen?",
      "Share your requirement with GenData Tech and we can help identify the right next step.": "Teilen Sie Ihre Anforderungen mit GenData Tech. Gemeinsam finden wir die nächsten Schritte.",
      "Contact Us": "Kontakt aufnehmen",
    }
    return translations[value] ?? value
  }
  return (
    <section className="bg-[#030b18] px-6 py-20 sm:py-24 lg:px-10 lg:py-24">

      <div className="mx-auto max-w-[1400px]">

        <motion.div
          initial={{
            opacity: 1,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:p-12"
        >

          <div className="pointer-events-none absolute -right-24 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#057CFA]/10 blur-[110px]" />


          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.24em] text-[#057CFA]">
                {localize(eyebrow)}
              </p>


              <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                {localize(title)}
              </h2>


              <p className="mt-5 max-w-2xl font-body text-sm leading-7 text-slate-400 sm:text-base">
                {localize(description)}
              </p>

            </div>


            <Link
              to={buttonLink}
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#057CFA] px-6 py-3.5 font-body text-xs font-semibold text-white transition hover:bg-[#002DCC]"
            >
              {localize(buttonText)}

              <FiArrowRight className="transition group-hover:translate-x-1" />
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  )
}


export default CommonCTA