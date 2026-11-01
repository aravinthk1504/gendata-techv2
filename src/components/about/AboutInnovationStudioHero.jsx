"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

// Decorative illustration of GenData Tech's interdisciplinary engineering work.
// It is not a screenshot of a real product or a picture of a physical office.
export default function AboutInnovationStudioHero({ active = true, lang = "en" }) {
  const rootRef = useRef(null);
  const visible = useInView(rootRef, { margin: "-10% 0px -10% 0px" });
  const reducedMotion = useReducedMotion();
  const running = active && visible && !reducedMotion;

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full min-w-0 max-w-[570px]"
      role="img"
      aria-label={lang === "de"
        ? "Isometrische Technikstudio-Illustration mit Laptop, KI-Visualisierung, Software und vernetztem IoT-Prototyp"
        : "Isometric engineering studio illustration with laptop, intelligent data visualization, software and a connected IoT prototype"}
    >
      <div className="pointer-events-none absolute inset-[16%] rounded-full bg-[#057cfa]/[0.12] blur-[60px]" aria-hidden="true" />
      <svg
        viewBox="0 0 620 480"
        className="relative block h-auto w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id="about-studio-halo">
            <stop offset="0" stopColor="#0b96f1" stopOpacity=".27" />
            <stop offset="1" stopColor="#0b96f1" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="about-studio-desk" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#14466b" />
            <stop offset=".5" stopColor="#0c2b48" />
            <stop offset="1" stopColor="#071b30" />
          </linearGradient>
          <linearGradient id="about-studio-screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#103c60" />
            <stop offset=".5" stopColor="#081d37" />
            <stop offset="1" stopColor="#052f51" />
          </linearGradient>
        </defs>

        {/* Atmosphere and perspective: simple geometry rather than a 3D engine. */}
        <motion.ellipse
          cx="314" cy="300" rx="295" ry="185"
          fill="url(#about-studio-halo)"
          animate={running ? { opacity: [.68, 1, .68] } : { opacity: .8 }}
          transition={{ duration: 5.5, ease: "easeInOut", repeat: running ? Infinity : 0 }}
        />
        <g fill="none" stroke="#277199" strokeWidth="1" opacity=".23">
          <path d="M22 370 L302 230 L604 383 M22 405 L302 265 L604 418 M75 433 L346 295 M155 466 L425 324 M490 445 L197 297" />
          <path d="M30 105 H590 M30 430 H590" strokeDasharray="3 9" />
        </g>

        {/* Workbench top and chamfered front edges. */}
        <path d="M58 312 L320 177 L583 313 L321 452 Z" fill="#020b17" opacity=".5" transform="translate(0 11)" />
        <path d="M59 305 L318 174 L580 305 L321 440 Z" fill="url(#about-studio-desk)" stroke="#4486b2" strokeWidth="1.5" />
        <path d="M59 305 L321 440 V453 L59 318 Z" fill="#061a2d" stroke="#266389" />
        <path d="M321 440 L580 305 V318 L321 453 Z" fill="#0e3653" stroke="#266389" />
        <path d="M68 306 L318 182 L570 306" fill="none" stroke="#8bdffe" strokeOpacity=".21" />

        {/* Project sketch and tools on the desk. */}
        <g>
          <path d="M91 311 L190 263 L272 304 L169 355 Z" fill="#0b233c" stroke="#4588b1" />
          <path d="M101 309 L189 267 L262 304 L169 348 Z" fill="#123957" />
          <path d="M132 300 L191 271 M118 316 L187 281 M144 324 L214 290 M159 335 L230 302"
            stroke="#5ac4ec" strokeOpacity=".45" strokeWidth="1.3" />
          <circle cx="184" cy="308" r="12" stroke="#78d9ff" strokeOpacity=".55" fill="none" />
          <circle cx="184" cy="308" r="4" fill="#8ce9f9" />
        </g>

        {/* Open laptop: keyboard and upright screen. */}
        <path d="M209 292 L368 210 L481 266 L324 351 Z" fill="#06101e" stroke="#517a96" strokeWidth="2" />
        <path d="M219 290 L368 216 L469 267 L324 344 Z" fill="#12334e" stroke="#326c90" />
        <g stroke="#6b9eba" strokeWidth="1" opacity=".75">
          <path d="M263 287 L380 230 M280 296 L393 237 M298 305 L408 245 M316 314 L425 254 M332 323 L440 262" />
        </g>
        <path d="M297 330 L350 303 L386 320 L333 347" fill="#1d4d6c" opacity=".7" />
        <path d="M208 151 L367 67 Q372 65 376 68 L481 121 Q486 124 486 132 L486 264 L324 350 L205 292 L205 162 Q205 155 208 151 Z"
          fill="#0a1d32" stroke="#8ac8e9" strokeOpacity=".8" strokeWidth="2" />
        <path d="M217 159 L368 79 L472 134 V257 L324 335 L217 282 Z"
          fill="url(#about-studio-screen)" stroke="#3988b8" />
        <path d="M217 159 L368 79 L472 134" fill="none" stroke="#b5ebff" strokeOpacity=".5" />

        {/* Animated intelligence visual within the screen. */}
        <motion.g
          animate={running ? { y: [0, -3, 0] } : { y: 0 }}
          transition={{ duration: 6, repeat: running ? Infinity : 0, ease: "easeInOut" }}
        >
          <path d="M249 199 L288 179 L321 195 L352 161 L384 176 L424 147"
            fill="none" stroke="#71eaff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M249 199 L288 179 L321 195 L352 161 L384 176 L424 147 L424 217 L249 269 Z"
            fill="#1b8fdd" fillOpacity=".08" />
          <g fill="#9bedfc">
            {[[249,199],[288,179],[321,195],[352,161],[384,176],[424,147]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="3.5" />
            ))}
          </g>
          <path d="M252 231 L285 213 L285 241 L252 260 Z M294 208 L324 191 L324 222 L294 239 Z M334 190 L363 174 L363 206 L334 221 Z"
            fill="#167ab7" fillOpacity=".5" stroke="#3fa9d9" strokeOpacity=".5" />
        </motion.g>
        <path d="M226 172 L267 151 M226 182 L251 168 M406 136 L455 160 M409 145 L439 160"
          stroke="#5599c1" strokeWidth="1.4" strokeLinecap="round" opacity=".75" />
        <motion.circle
          cx="456" cy="245" r="2.3" fill="#83e8ff"
          animate={running ? { opacity: [1, .22, 1] } : { opacity: .8 }}
          transition={{ duration: 3, repeat: running ? Infinity : 0 }}
        />

        {/* IoT development: a simple illustrated circuit-board prototype. */}
        <g>
          <path d="M383 331 L467 288 L543 327 L457 373 Z" fill="#103b4d" stroke="#4dc7d4" strokeWidth="1.7" />
          <path d="M397 328 L467 294 L528 326 L457 364 Z" fill="#082b3a" stroke="#298f9a" />
          <path d="M435 322 L469 305 L495 319 L460 338 Z" fill="#135d73" stroke="#75dbe9" />
          <path d="M443 322 L469 310 L486 319 L461 331 Z" fill="#092737" stroke="#57beda" />
          <path d="M463 338 V352 L481 361 M460 338 L443 347" fill="none" stroke="#4de3d8" strokeWidth="1.3" />
          <g fill="#64e2e0">
            <circle cx="427" cy="339" r="2.2" /><circle cx="500" cy="330" r="2.3" />
          </g>
          <motion.circle
            cx="413" cy="328" r="3.2" fill="#64e2e0"
            animate={running ? { opacity: [1, .2, 1] } : { opacity: 1 }}
            transition={{ duration: 2.7, repeat: running ? Infinity : 0 }}
          />
          <motion.circle
            cx="511" cy="335" r="2.5" fill="#64e2e0"
            animate={running ? { opacity: [.2, 1, .2] } : { opacity: 1 }}
            transition={{ duration: 3.2, repeat: running ? Infinity : 0 }}
          />
        </g>

        {/* Holographic AI module above the desktop. */}
        <motion.g
          animate={running ? { y: [0, -8, 0] } : { y: 0 }}
          transition={{ duration: 6.6, repeat: running ? Infinity : 0, ease: "easeInOut" }}
        >
          <path d="M429 72 L487 43 L543 72 L485 102 Z"
            fill="#164d73" fillOpacity=".6" stroke="#7cd9fc" />
          <path d="M429 72 L485 102 V147 L429 118 Z"
            fill="#0e3555" fillOpacity=".65" stroke="#57bce8" />
          <path d="M543 72 L485 102 V147 L543 118 Z"
            fill="#0f5a7e" fillOpacity=".6" stroke="#61d6ef" />
          <path d="M449 81 L485 62 L522 81 L485 100 Z"
            fill="none" stroke="#b1f5ff" strokeOpacity=".7" />
          <path d="M485 102 V133" stroke="#7bdcef" strokeOpacity=".6" />
          <circle cx="485" cy="100" r="3" fill="#9bf5ff" />
        </motion.g>

        {/* Second levitating research object. */}
        <motion.g
          animate={running ? { y: [0, 7, 0] } : { y: 0 }}
          transition={{ duration: 5.8, repeat: running ? Infinity : 0, ease: "easeInOut", delay: .5 }}
        >
          <path d="M75 155 L125 130 L171 154 L121 179 Z" fill="#0a2f4d" fillOpacity=".87" stroke="#4299c7" />
          <path d="M75 155 L121 179 V225 L75 201 Z" fill="#0a213a" stroke="#4299c7" />
          <path d="M171 154 L121 179 V225 L171 198 Z" fill="#0d415c" stroke="#4299c7" />
          <circle cx="121" cy="158" r="12" stroke="#7bdaf4" strokeWidth="1.5" fill="none" />
          <path d="M108 158 H134 M121 145 V171" stroke="#7bdaf4" strokeWidth="1.5" />
        </motion.g>

        {/* Thin data connections traveling between modules and device. */}
        {[
          "M166 192 C189 189 186 185 213 185",
          "M488 147 C515 177 525 207 507 281",
          "M468 276 C488 282 493 292 490 303",
        ].map((path,i)=>(
          <motion.path
            key={i}
            d={path}
            fill="none"
            stroke="#4ac8f1"
            strokeOpacity=".58"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="5 9"
            animate={running ? { strokeDashoffset: [0, -168] } : { strokeDashoffset: 0 }}
            transition={{ duration: 8 + i * 1.2, repeat: running ? Infinity : 0, ease: "linear" }}
          />
        ))}
        <circle cx="214" cy="184" r="3" fill="#80e8ff" />
        <circle cx="488" cy="147" r="3" fill="#80e8ff" />
      </svg>
    </div>
  );
}
