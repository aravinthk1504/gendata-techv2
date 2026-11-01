"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import useHeroAutoCycle from "./useHeroAutoCycle";

const sensorCards = [
  {
    id: "temperature", y: 22, label: "Temperature", de: "Temperatur",
    value: "26.4°C", wire: "M140 55 H164 V153 H189",
    icon: "M32 41 V53 M26 47 H38",
  },
  {
    id: "humidity", y: 139, label: "Humidity", de: "Luftfeuchte",
    value: "62%", wire: "M140 173 H189",
    icon: "M32 157 C25 166 25 170 32 173 C39 170 39 166 32 157 Z",
  },
  {
    id: "soil", y: 256, label: "Soil moisture", de: "Bodenfeuchte",
    value: "38%", wire: "M140 290 H164 V215 H189",
    icon: "M25 288 L32 271 L39 288 M28 282 H36",
  },
];

const monitorGraph = "M356 229 L370 221 L385 226 L400 210 L416 217 L432 201 L449 212 L466 195 L482 207 L497 192 L516 200 L532 188";

export default function IotConnectedHero({ active = true, lang = "en" }) {
  const [mode, setMode] = useState("monitoring");
  const reducedMotion = useReducedMotion();
  const animate = active && !reducedMotion;
  const german = lang === "de";
  const automation = mode === "automation";
  const autoCycle = useHeroAutoCycle({ active, index: mode === "monitoring" ? 0 : 1, setIndex: (updater) => setMode(previous => (typeof updater === "function" ? updater(previous === "monitoring" ? 0 : 1) : updater) === 0 ? "monitoring" : "automation"), count: 2 });

  const labels = german ? {
    monitor: "Überwachung", auto: "Automatisierung", title: "Gerätemonitor",
    environment: "Umgebung", rules: "Automatikregeln", monitoring: "MONITORING",
    autoMode: "AUTO-MODUS", temperature: "Temperatur", humidity: "Luftfeuchte",
    soil: "Bodenfeuchte", relay: "Relais A", activity: "Sensoraktivität",
    response: "Automatikreaktion", relayTitle: "Automation / Relais A",
    relayOn: "Simulierter Ausgang aktiv", sensorData: "SIMULIERTE SENSORDATEN",
    autoData: "SIMULIERTE AUTOMATIK", foot: "IOT-KONZEPT · SIMULIERTE WERTE",
    edge: "EDGE-GERÄT",
  } : {
    monitor: "Monitoring", auto: "Automation", title: "Device Monitor",
    environment: "Environment", rules: "Automation rules", monitoring: "MONITORING",
    autoMode: "AUTO MODE", temperature: "Temperature", humidity: "Humidity",
    soil: "Soil moisture", relay: "Relay A", activity: "Sensor activity",
    response: "Automation response", relayTitle: "Automation / Relay A",
    relayOn: "Simulated output active", sensorData: "SIMULATED SENSOR DATA",
    autoData: "SIMULATED AUTOMATION", foot: "ILLUSTRATIVE IOT SYSTEM · SIMULATED READINGS",
    edge: "EDGE DEVICE",
  };

  return (
    <div {...autoCycle} className="mx-auto w-full min-w-0 max-w-[500px]">
      <div
        role="img"
        aria-label={german
          ? "Konzept mit ESP32-Controller, drei Sensoren, Monitor und Automatikrelais. Alle Werte sind simuliert."
          : "Illustrative ESP32 controller, three sensors, monitoring display and automation relay. All readings are simulated."}
        className="relative"
      >
        <svg viewBox="0 0 555 353" className="block h-auto w-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="iot-hero-board" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#174964" />
              <stop offset="1" stopColor="#09273b" />
            </linearGradient>
            <linearGradient id="iot-hero-chart" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#1585ec" />
              <stop offset="1" stopColor="#65e0f0" />
            </linearGradient>
            <radialGradient id="iot-hero-halo">
              <stop offset="0" stopColor="#0c83ed" stopOpacity="0.15" />
              <stop offset="1" stopColor="#0c83ed" stopOpacity="0" />
            </radialGradient>
          </defs>

          <ellipse cx="235" cy="182" rx="155" ry="163" fill="url(#iot-hero-halo)" />

          {/* Sensor signal traces. */}
          {sensorCards.map((sensor, i) => (
            <g key={sensor.id}>
              <path d={sensor.wire} fill="none" stroke="#256b96" strokeWidth="1.6" strokeDasharray="4 5" />
              <rect x="8" y={sensor.y} width="132" height="66" rx="9" fill="#0c2540" stroke="#2c6489" />
              <rect x="19" y={sensor.y + 13} width="26" height="26" rx="6" fill="#12415c" />
              <path d={sensor.icon} fill="none" stroke="#62dfff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <text x="53" y={sensor.y + 24} fontSize="10" fontWeight="600" fill="#c9e6f5">
                {german ? sensor.de : sensor.label}
              </text>
              <text x="53" y={sensor.y + 43} fontSize="15" fontWeight="700" fill="#72defb">{sensor.value}</text>
              <motion.circle cx="129" cy={sensor.y + 55} r="3" fill="#4de1b7"
                animate={animate ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
                transition={{ duration: 2 + i * 0.35, repeat: animate ? Infinity : 0, ease: "easeInOut" }}
              />
            </g>
          ))}

          {/* The controller connects the physical sensors to the digital dashboard. */}
          <path d="M296 173 H341" fill="none" stroke="#256b96" strokeWidth="1.6" strokeDasharray="4 5" />
          <path d="M241 230 V296 H340" fill="none" stroke="#256b96" strokeWidth="1.6" strokeDasharray="4 5" />
          <rect x="189" y="111" width="107" height="119" rx="7" fill="url(#iot-hero-board)" stroke="#3d91b9" strokeWidth="1.5" />
          <rect x="197" y="120" width="91" height="26" rx="3" fill="#0b1e30" stroke="#386481" />
          <path d="M206 128 H280 M208 135 H278 M208 140 H278" stroke="#608fa8" strokeWidth="1" strokeDasharray="9 5" opacity="0.7" />
          <rect x="205" y="153" width="75" height="51" rx="4" fill="#06182b" stroke="#52b3d5" />
          <rect x="215" y="162" width="55" height="34" rx="2" fill="#0c2940" stroke="#2c6489" />
          <text x="242" y="178" textAnchor="middle" fontSize="15" fill="#e0f7ff" fontWeight="700">ESP32</text>
          <text x="242" y="188" textAnchor="middle" fontSize="6.8" fill="#7bb4d1">CONTROLLER</text>
          {[126, 138, 150, 162, 174, 186, 198, 210].map(y => (
            <g key={y} fill="#c19e58">
              <rect x="183" y={y} width="6" height="5" rx="1" />
              <rect x="296" y={y} width="6" height="5" rx="1" />
            </g>
          ))}
          {[209, 220].map((x, i) => (
            <motion.circle key={x} cx={x} cy="215" r="3" fill={i ? "#42bded" : "#47e4ad"}
              animate={animate ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
              transition={{ duration: 2 + i * 0.6, repeat: animate ? Infinity : 0 }}
            />
          ))}
          <motion.g fill="none" stroke="#55d7fa" strokeWidth="1.8" strokeLinecap="round"
            animate={animate ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
            transition={{ duration: 2.3, repeat: animate ? Infinity : 0 }}>
            <path d="M225 98 Q242 83 259 98" />
            <path d="M230 103 Q242 94 254 103" />
            <circle cx="242" cy="107" r="2" fill="#72e5ff" stroke="none" />
          </motion.g>
          <text x="242" y="246" fontSize="9" textAnchor="middle" fill="#88b9d4" letterSpacing="1">{labels.edge}</text>

          {/* Simulated monitoring / automation interface. */}
          <rect x="341" y="81" width="204" height="182" rx="11" fill="#091d34" stroke="#32759b" strokeWidth="1.3" />
          <path d="M353 81 H533 Q545 81 545 93 V111 H341 V93 Q341 81 353 81" fill="#102e4b" />
          {[357, 368, 379].map(x => <circle key={x} cx={x} cy="96" r="3" fill="#628aa5" />)}
          <text x="442" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#d6efff">{labels.title}</text>
          <text x="356" y="127" fontSize="10" fontWeight="600" fill="#cee4f1">{automation ? labels.rules : labels.environment}</text>
          <text x="529" y="127" textAnchor="end" fontSize="8" fill="#5ee4b7">{automation ? labels.autoMode : labels.monitoring}</text>
          {[
            { x: 353, width: 83, label: automation ? labels.soil : labels.temperature, value: automation ? "38%" : "26.4°C" },
            { x: 445, width: 88, label: automation ? labels.relay : labels.humidity, value: automation ? "ON" : "62%" },
          ].map(({ x, width, label, value }) => (
            <g key={x}>
              <rect x={x} y="136" width={width} height="44" rx="5" fill="#112e49" stroke="#295571" />
              <text x={x + 9} y="150" fontSize="8" fill="#97bdd4">{label}</text>
              <text x={x + 9} y="168" fontSize="16" fontWeight="700" fill="#e3f6ff">{value}</text>
            </g>
          ))}
          <text x="355" y="196" fontSize="8" fill="#8dafc6">{automation ? labels.response : labels.activity}</text>
          <path d="M355 239 H533 M355 220 H533" stroke="#2a516b" strokeWidth="0.9" strokeDasharray="3 5" />
          <motion.path d={monitorGraph} fill="none" stroke="url(#iot-hero-chart)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            initial={false} animate={{ pathLength: 1 }}
            transition={{ duration: reducedMotion ? 0 : 2.2, ease: "easeOut" }}
          />
          <motion.circle cx="532" cy="188" r="3" fill="#82edff"
            animate={animate ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
            transition={{ duration: 2, repeat: animate ? Infinity : 0 }}
          />
          <text x="355" y="251" fontSize="7.5" fill="#698fab">{automation ? labels.autoData : labels.sensorData}</text>

          {/* Relay status is intentionally subdued when monitoring mode is selected. */}
          <motion.g animate={{ opacity: automation ? 1 : 0.35 }} transition={{ duration: reducedMotion ? 0 : 0.4 }}>
            <rect x="340" y="288" width="189" height="43" rx="8" fill="#103f49" stroke="#39caaa" />
            <circle cx="358" cy="309" r="7" fill="#35d2a8" opacity="0.16" />
            <motion.circle cx="358" cy="309" r="3" fill="#63f6bd"
              animate={animate ? { opacity: [1, 0.25, 1] } : { opacity: 1 }}
              transition={{ duration: 2, repeat: animate ? Infinity : 0 }}
            />
            <text x="374" y="305" fontSize="10" fontWeight="600" fill="#c8ffec">{labels.relayTitle}</text>
            <text x="374" y="320" fontSize="9" fill="#60e6bd">{labels.relayOn}</text>
          </motion.g>

          {/* Low-cost, declarative data particles; stationary under reduced motion. */}
          {animate ? (
            <>
              {sensorCards.map((sensor, i) => (
                <circle key={sensor.id} r="3" fill="#69e6ff">
                  <animateMotion dur={`${4.2 + i * 0.4}s`} begin={`${i}s`} repeatCount="indefinite" path={sensor.wire} />
                </circle>
              ))}
              <circle r="3.5" fill="#69e6ff"><animateMotion dur="3.3s" repeatCount="indefinite" path="M296 173 H341" /></circle>
              {automation && <circle r="3" fill="#69e6ff"><animateMotion dur="3.8s" repeatCount="indefinite" path="M241 230 V296 H340" /></circle>}
            </>
          ) : (
            <>
              <circle cx="164" cy="153" r="3" fill="#69e6ff" />
              <circle cx="166" cy="173" r="3" fill="#69e6ff" />
              <circle cx="164" cy="215" r="3" fill="#69e6ff" />
              <circle cx="316" cy="173" r="3.5" fill="#69e6ff" />
            </>
          )}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-2" role="group"
        aria-label={german ? "IoT-Demomodus wählen" : "Choose IoT demo mode"}>
        {[
          { id: "monitoring", label: labels.monitor },
          { id: "automation", label: labels.auto },
        ].map(item => (
          <button key={item.id} type="button" aria-pressed={mode === item.id}
            onClick={() => setMode(item.id)}
            className={`rounded-lg border px-4 py-2 font-body text-[10px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${mode === item.id
              ? "border-[#057cfa] bg-[#057cfa] text-white"
              : "border-[#345675] bg-[#10263f] text-slate-300 hover:border-cyan-400 hover:text-white"}`}>
            {item.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center font-body text-[9px] uppercase tracking-[0.12em] text-[#789ab3]">{labels.foot}</p>
    </div>
  );
}
