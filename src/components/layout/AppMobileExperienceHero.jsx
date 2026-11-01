"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import useHeroAutoCycle from "./useHeroAutoCycle";
import { FiArrowRight, FiCalendar, FiCheck, FiClock, FiHome, FiMapPin, FiMenu, FiUser, FiGrid, FiLayers, FiWifi, FiBattery } from "react-icons/fi";

const screens = [
  { id: "explore", en: "01 Explore", de: "01 Entdecken" },
  { id: "details", en: "02 Details", de: "02 Details" },
  { id: "confirmation", en: "03 Confirmation", de: "03 Bestätigung" },
];

/**
 * Illustrated app-navigation concept for the App Development hero.
 * The NOVA interface, services and confirmation are mock designs, not a live booking product.
 */
export default function AppMobileExperienceHero({ active = true, lang = "en" }) {
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const german = lang === "de";
  const labels = german
    ? {
        example: "ILLUSTRATIVES APP-KONZEPT",
        discover: "NOVA / SERVICES",
        heading: "Entdecke dein nächstes Erlebnis.",
        sub: "Finde Angebote, die zu deinem Tag passen.",
        featureTitle: "Für deine besonderen Momente.",
        featureSub: "Entdecke, was zählt",
        consultation: "Produktberatung",
        consultationSub: "Neue Möglichkeiten entdecken",
        creative: "Kreative Session",
        creativeSub: "Individuelle Erlebnisse",
        detailTitle: "Produktberatung",
        detailSub: "Persönliche Online-Beratung, 45 Minuten.",
        detailsTag: "ANGEBOTSDETAILS",
        date: "Datum auswählen",
        times: "Verfügbare Zeiten",
        continue: "Weiter",
        confirmed: "Beispielbestätigung",
        confirmedSub: "So könnte eine Buchungsbestätigung aussehen.",
        virtual: "Online-Termin",
        confirmedStatus: "Demo erfolgreich abgeschlossen",
        back: "Zur Startseite",
        explore: "Entdecken",
        bookings: "Termine",
        profile: "Profil",
      }
    : {
        example: "ILLUSTRATIVE MOBILE APP CONCEPT",
        discover: "NOVA / SERVICES",
        heading: "Find your next experience.",
        sub: "Discover services that fit your day.",
        featureTitle: "Made for your moments.",
        featureSub: "Discover what matters",
        consultation: "Product consultation",
        consultationSub: "Explore new opportunities",
        creative: "Creative session",
        creativeSub: "Personalized experiences",
        detailTitle: "Product consultation",
        detailSub: "A personalized 45-minute online session.",
        detailsTag: "SERVICE DETAILS",
        date: "Select your date",
        times: "Available times",
        continue: "Continue",
        confirmed: "You're booked!",
        confirmedSub: "This is a sample appointment confirmation.",
        virtual: "Online meeting",
        confirmedStatus: "Demo appointment confirmed",
        back: "Back to home",
        explore: "Explore",
        bookings: "Bookings",
        profile: "Profile",
      };

  const changeScreen = (index) => {
    setDirection(index >= screen ? 1 : -1);
    setScreen(index);
  };
  const transition = reducedMotion || !active ? { duration: 0 } : { type: "tween", ease: "easeOut", duration: 0.42 };
  const autoCycle = useHeroAutoCycle({ active, index: screen, setIndex: setScreen, count: screens.length });
  const variants = {
    enter: (dir) => ({ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : 24 * dir }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -24 * dir }),
  };

  return (
    <div {...autoCycle} className="relative mx-auto flex w-full max-w-[470px] min-w-0 flex-col items-center justify-center">
      <div className="pointer-events-none absolute left-1/2 top-12 h-[280px] w-[270px] -translate-x-1/2 rounded-full bg-[#057cfa]/[0.12] blur-[48px]" aria-hidden="true" />

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 h-[387px] w-[215px] rounded-[32px] border-[5px] border-[#2e4e68] bg-[#0d1f32] p-[4px] shadow-[0_28px_65px_rgba(0,0,0,0.5),0_0_0_1px_rgba(109,162,197,0.2)]"
      >
        <div aria-hidden="true" className="absolute -left-[7px] top-[74px] h-8 w-[2px] rounded bg-[#426481]" />
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[25px] bg-[#f8fafc] text-[#14263d]">
          <div aria-hidden="true" className="absolute left-1/2 top-[6px] z-20 h-[17px] w-[66px] -translate-x-1/2 rounded-full bg-[#0c1e31]" />
          <div className="relative z-10 flex h-[31px] flex-none items-center justify-between px-3 pt-[7px] font-body text-[8px] font-bold">
            <span>9:41</span>
            <span className="flex items-center gap-[3px]" aria-hidden="true"><FiWifi size={9}/><FiBattery size={12}/></span>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden" aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={screen}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                className="absolute inset-0 overflow-hidden"
              >
                {screen === 0 && (
                  <div className="px-[13px] py-3">
                    <p className="font-body text-[8px] font-bold uppercase tracking-wider text-[#1478c7]">{labels.discover}</p>
                    <h3 className="mt-2 font-heading text-[18px] font-extrabold leading-[1.2] tracking-tight">{labels.heading}</h3>
                    <p className="mt-1.5 font-body text-[9px] leading-[1.55] text-[#6b7d92]">{labels.sub}</p>

                    <div className="relative mt-3 h-[103px] overflow-hidden rounded-xl bg-gradient-to-br from-[#b3e4fd] via-[#448dc8] to-[#14386e] p-3.5 text-white">
                      <span className="relative z-10 block max-w-[115px] font-heading text-[13px] font-bold leading-snug">{labels.featureTitle}</span>
                      <span className="relative z-10 mt-2 block text-[8px] text-blue-50">{labels.featureSub}</span>
                      <div aria-hidden="true" className="absolute -right-1 top-0 h-[136px] w-[100px] rotate-[38deg] rounded-full border border-white/60 shadow-[0_0_0_18px_rgba(255,255,255,0.08),0_0_0_35px_rgba(255,255,255,0.05)]"/>
                    </div>
                    <div className="mt-1">
                      <div className="flex items-center gap-2 border-b border-[#e7edf3] py-2">
                        <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-lg bg-[#e5f1fd] text-[#157ed1]"><FiGrid size={15}/></span>
                        <span><strong className="block font-body text-[10px]">{labels.consultation}</strong><small className="mt-0.5 block font-body text-[8px] text-[#75859a]">{labels.consultationSub}</small></span>
                      </div>
                      <div className="flex items-center gap-2 py-2">
                        <span className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-lg bg-[#e5f1fd] text-[#157ed1]"><FiLayers size={15}/></span>
                        <span><strong className="block font-body text-[10px]">{labels.creative}</strong><small className="mt-0.5 block font-body text-[8px] text-[#75859a]">{labels.creativeSub}</small></span>
                      </div>
                    </div>
                  </div>
                )}

                {screen === 1 && (
                  <div className="px-[13px] py-3">
                    <p className="font-body text-[8px] font-bold uppercase tracking-wider text-[#1478c7]">{labels.detailsTag}</p>
                    <h3 className="mt-2 font-heading text-[18px] font-extrabold leading-tight tracking-tight">{labels.detailTitle}</h3>
                    <p className="mt-1.5 font-body text-[9px] leading-[1.55] text-[#6b7d92]">{labels.detailSub}</p>
                    <div className="mt-3 rounded-[10px] border border-[#e1eaf2] bg-white p-[11px] shadow-[0_5px_14px_rgba(20,42,73,0.06)]">
                      <h4 className="font-body text-[10px] font-bold">{labels.date}</h4>
                      <div className="mt-3 flex gap-1">
                        {["TUE", "WED", "THU", "FRI"].map((day, i) => (
                          <div key={day} className={`flex-1 rounded-md border px-0.5 py-2 text-center font-body text-[8px] ${i === 2 ? "border-[#057cfa] bg-[#057cfa] text-white" : "border-[#dfe9f3] text-[#14263d]"}`}>
                            {day}<span className="mt-1 block font-bold">{i + 10}</span>
                          </div>
                        ))}
                      </div>
                      <h4 className="mt-3 font-body text-[10px] font-bold">{labels.times}</h4>
                      <div className="mt-2 grid grid-cols-2 gap-1.5">
                        {["09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM"].map((time, i) => (
                          <span key={time} className={`rounded-md border py-2 text-center font-body text-[8px] ${i === 1 ? "border-[#057cfa] bg-[#e4f2ff] font-bold text-[#057cfa]" : "border-[#d9e6f0]"}`}>{time}</span>
                        ))}
                      </div>
                    </div>
                    <button type="button" onClick={() => changeScreen(2)} className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-[#057cfa] py-2.5 font-body text-[10px] font-bold text-white">
                      {labels.continue}<FiArrowRight size={11}/>
                    </button>
                  </div>
                )}

                {screen === 2 && (
                  <div className="px-[13px] py-3 text-center">
                    <div className="mx-auto mt-[17px] flex h-[69px] w-[69px] items-center justify-center rounded-full bg-[#e1f8f0] text-[#16a77e]">
                      <FiCheck size={32}/>
                    </div>
                    <h3 className="mt-3 font-heading text-[18px] font-extrabold leading-tight tracking-tight">{labels.confirmed}</h3>
                    <p className="mt-1.5 font-body text-[9px] leading-[1.6] text-[#6b7d92]">{labels.confirmedSub}</p>
                    <div className="mt-4 rounded-[10px] border border-[#e1eaf2] bg-white p-3 text-left">
                      <p className="font-body text-[10px] font-bold">{labels.consultation}</p>
                      <div className="mt-2.5 space-y-2 font-body text-[9px] text-[#74869a]">
                        <span className="flex items-center gap-1.5"><FiCalendar size={10}/>{german ? "Donnerstag, 12. Nov." : "Thursday, Nov 12"}</span>
                        <span className="flex items-center gap-1.5"><FiClock size={10}/>10:30 AM – 11:15 AM</span>
                        <span className="flex items-center gap-1.5"><FiMapPin size={10}/>{labels.virtual}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-1 rounded-md bg-[#e7f9f1] p-2 font-body text-[9px] font-semibold text-[#15835e]"><FiCheck size={11}/>{labels.confirmedStatus}</div>
                    </div>
                    <button type="button" onClick={() => changeScreen(0)} className="mt-3 w-full rounded-lg bg-[#057cfa] py-2.5 font-body text-[10px] font-bold text-white">{labels.back}</button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div aria-hidden="true" className="relative z-10 flex h-[40px] flex-none items-center justify-around border-t border-[#e6edf4] bg-white">
            {[
              { icon: FiHome, label: labels.explore },
              { icon: FiGrid, label: labels.bookings },
              { icon: FiUser, label: labels.profile },
            ].map(({ icon: Icon, label }, i) => (
              <span key={i} className={`flex flex-col items-center gap-[2px] font-body text-[8px] ${(screen === 2 ? i === 1 : i === 0) ? "text-[#057cfa]" : "text-[#94a4b5]"}`}>
                <Icon size={12}/>{label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 mt-4 flex w-full flex-wrap justify-center gap-2" role="group" aria-label={german ? "App-Ansicht auswählen" : "Select app screen preview"}>
        {screens.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={screen === i}
            onClick={() => changeScreen(i)}
            className={`rounded-lg border px-3 py-2 font-body text-[10px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${screen === i ? "border-[#057cfa] bg-[#057cfa] text-white" : "border-[#2c5372] bg-[#10263f] text-slate-300 hover:border-cyan-400 hover:text-white"}`}
          >
            {german ? item.de : item.en}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center font-body text-[9px] uppercase tracking-[0.12em] text-[#7ba0bb]">{labels.example}</p>
      <span className="sr-only">{german ? "Keine echte Buchung. Alle Angaben sind erfunden." : "Not a real booking. All screen details are illustrative."}</span>
    </div>
  );
}
