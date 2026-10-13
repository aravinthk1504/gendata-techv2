"use client"

import { motion } from "motion/react";
import Link from "next/link";
import { homeText, localizedHref } from "../../lib/homeText";



const getProducts = (t) => t("products.cards", { returnObjects: true });

function LMSDashboard({ content }) {
  const t = (key, variables) => homeText(content, key, variables);

  return (
    <motion.div
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
    >
      <div className="absolute inset-8 rounded-full bg-brand-accent/15 blur-[90px]" />

      <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#0a1830] shadow-[0_28px_70px_rgba(0,0,0,0.28)]">
        <div className="flex h-9 items-center gap-2 border-b border-white/8 px-4 sm:h-11 sm:px-5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <div className="ml-3 h-2 w-20 rounded-full bg-white/8 sm:ml-5 sm:w-28" />
        </div>

        <div className="grid grid-cols-[50px_1fr] sm:grid-cols-[70px_1fr]">
          <div className="border-r border-white/8 p-3 sm:p-4">
            <div className="mx-auto h-6 w-6 rounded-md bg-brand-accent sm:h-7 sm:w-7" />
            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`mx-auto h-1.5 rounded-full ${
                    item === 1 ? "w-7 bg-brand-accent/60" : "w-6 bg-white/8"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-5 lg:p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="h-2 w-14 rounded-full bg-white/15 sm:w-18" />
                <div className="mt-2 h-3 w-24 rounded-full bg-white/80 sm:mt-3 sm:h-4 sm:w-32" />
              </div>
              <div className="h-7 w-7 rounded-full bg-blue-400/20 sm:h-8 sm:w-8" />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
              {[
                [t("products.lms.dashboard.courses"), "24"],
                [t("products.lms.dashboard.students"), "1.2K"],
                [t("products.lms.dashboard.progress"), "84%"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="min-w-0 rounded-xl border border-white/8 bg-white/4 p-2.5 sm:p-3"
                >
                  <p className="truncate font-body text-[6px] uppercase tracking-[0.08em] text-slate-500 sm:text-[7px] sm:tracking-[0.12em]">
                    {label}
                  </p>
                  <p className="mt-1.5 font-heading text-xs font-semibold text-white sm:mt-2 sm:text-base">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-[1.35fr_0.65fr]">
              <div className="relative h-28 overflow-hidden rounded-xl border border-white/8 bg-white/3 p-3 sm:h-30 sm:p-4">
                <p className="font-body text-[6px] uppercase tracking-[0.1em] text-slate-500 sm:text-[7px]">
                  {t("products.lms.dashboard.activity")}
                </p>
                <div className="absolute inset-x-3 bottom-3 flex h-14 items-end gap-1.5 sm:inset-x-4 sm:bottom-4 sm:h-16 sm:gap-2">
                  {[40, 62, 48, 76, 58, 88, 70].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.06 }}
                      className="flex-1 rounded-t-sm bg-linear-to-t from-brand-primary to-brand-accent"
                    />
                  ))}
                </div>
              </div>

              <div className="flex h-24 items-center justify-center rounded-xl border border-white/8 bg-white/3 sm:h-30">
                <div className="relative flex h-15 w-15 items-center justify-center rounded-full border-[6px] border-white/8 sm:h-17 sm:w-17">
                  <div className="absolute inset-[-6px] rounded-full border-[6px] border-transparent border-r-brand-accent border-t-brand-accent" />
                  <span className="font-heading text-[10px] font-semibold text-white sm:text-xs">
                    84%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductVisual({ type }) {
  if (type === "crm") {
    const bars = [45, 68, 55, 86];
    return (
      <div className="relative mt-6 h-34 overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFD] p-4 sm:mt-8 sm:h-40 sm:p-5">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-100/70 blur-[45px]" />
        <div className="relative flex h-full items-end gap-3 rounded-xl border border-slate-200 bg-white p-3">
          {bars.map((height, index) => (
            <div key={index} className="flex h-full flex-1 items-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className={`w-full rounded-t-md ${
                  [
                    "bg-[#057CFA]",
                    "bg-cyan-400",
                    "bg-violet-500",
                    "bg-emerald-400",
                  ][index]
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "erp") {
    return (
      <div className="relative mt-6 flex h-32 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFD] sm:mt-8 sm:h-36">
        <div className="absolute h-24 w-24 rounded-full border border-dashed border-brand-accent/30" />
        <div className="relative z-10 flex h-15 w-15 items-center justify-center rounded-2xl bg-brand-primary shadow-[0_12px_30px_rgba(0,45,204,0.18)] sm:h-16 sm:w-16">
          <span className="font-heading text-[9px] font-semibold text-white">
            ERP
          </span>
        </div>
        {["HR", "OPS", "FIN", "DATA"].map((item, index) => {
          const positions = [
            "left-[10%] top-[18%]",
            "right-[10%] top-[18%]",
            "bottom-[12%] left-[15%]",
            "bottom-[12%] right-[15%]",
          ];
          return (
            <div
              key={item}
              className={`absolute ${positions[index]} flex h-8 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white font-body text-[7px] font-semibold text-slate-500 shadow-sm`}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative mt-6 h-34 overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFD] p-4 sm:mt-8 sm:h-40 sm:p-5">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-100/70 blur-[45px]" />
      <div className="relative grid h-full grid-cols-[1fr_0.85fr] gap-3">
        <div className="flex items-end gap-1.5 rounded-xl border border-slate-200 bg-white p-3">
          {[38, 58, 46, 76, 64, 90].map((height, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className={`flex-1 rounded-t-sm ${
                [
                  "bg-blue-400",
                  "bg-cyan-400",
                  "bg-violet-400",
                  "bg-blue-500",
                  "bg-cyan-500",
                  "bg-emerald-400",
                ][index]
              }`}
            />
          ))}
        </div>
        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3">
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-center font-body text-[6px] font-semibold text-emerald-600">
            Paid
          </span>
          <p className="font-heading text-[10px] font-semibold text-slate-800">
            INV-2048
          </p>
          <p className="font-heading text-[9px] font-semibold text-slate-800">
            ₹12,450
          </p>
        </div>
      </div>
    </div>
  );
}

function Products({ content, lang }) {
  const t = (key, variables) => homeText(content, key, variables);
  const localizedPath = (path) => localizedHref(lang, path);
  const products = getProducts(t);

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-white px-6 py-20 sm:py-24 lg:px-10 lg:py-36"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-100 w-200 -translate-x-1/2 rounded-full bg-blue-50 blur-[140px]" />

      <div className="relative mx-auto max-w-350">
        <div className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[12px] font-semibold uppercase tracking-[0.28em] text-brand-primary sm:text-[12px] sm:tracking-[0.28em]"
            >
              {t("products.eyebrow")}
            </motion.p>

            <motion.h2
              initial={{ opacity: 1, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-4 max-w-4xl font-heading text-[2.15rem] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:mt-5 sm:text-5xl lg:text-6xl"
            >
              {t("products.titleLine1")}
              <span className="block text-slate-400">
                {t("products.titleLine2")}
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md font-body text-sm leading-6 text-slate-500 sm:leading-7 lg:col-span-4 lg:justify-self-end lg:text-base"
          >
            {t("products.description")}
          </motion.p>
        </div>

        <motion.article
          initial={{ opacity: 1, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 overflow-hidden rounded-[28px] bg-[#06152c] p-5 sm:mt-16 sm:p-8 lg:mt-20 lg:rounded-[32px] lg:p-14"
        >
          <div className="absolute -left-30 bottom-0 h-100 w-100 rounded-full bg-brand-primary/20 blur-[120px]" />
          <div className="absolute -right-20 top-0 h-100 w-100 rounded-full bg-brand-accent/12 blur-[130px]" />

          <div className="relative grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="font-body text-[9px] font-semibold uppercase tracking-[0.16em] text-brand-accent sm:text-[10px] sm:tracking-[0.2em]">
                  {t("products.lms.label")}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-body text-[8px] font-semibold uppercase tracking-[0.12em] text-blue-100">
                  LMS
                </span>
              </div>

              <h3 className="mt-5 font-heading text-3xl font-semibold tracking-[-0.04em] text-white sm:mt-7 sm:text-5xl">
                {t("products.lms.title")}
              </h3>

              <p className="mt-4 max-w-xl font-body text-sm leading-6 text-slate-300 sm:mt-5 sm:leading-7 lg:text-base">
                {t("products.lms.description")}
              </p>

              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
                {t("products.lms.features", { returnObjects: true }).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 font-body text-[8px] font-medium text-slate-300 sm:py-2 sm:text-[9px]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href={localizedPath("/products/lms")}
                className="group mt-7 inline-flex w-auto items-center gap-3 rounded-full bg-brand-accent px-5 py-3 font-body text-xs font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 sm:mt-10 sm:px-6 sm:py-3.5"
              >
                {t("products.explore")}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <LMSDashboard content={content} />
          </div>
        </motion.article>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 1, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              className="group flex flex-col rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.035)] transition duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_25px_70px_rgba(15,23,42,0.07)] sm:p-7 lg:p-8"
            >
              <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2">
                <span className="shrink-0 font-body text-[10px] font-semibold uppercase leading-4 tracking-[0.2em] text-brand-primary">
                  {product.number}
                </span>
                <span className="font-body text-[12px] font-semibold uppercase leading-4 tracking-[0.12em] text-slate-400">
                  {product.category}
                </span>
              </div>

              <h3 className="mt-6 text-left font-heading text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:mt-7 sm:text-3xl">
                GenData {product.title}
              </h3>

              <p className="mt-3 font-body text-sm leading-6 text-slate-500 sm:mt-4 sm:leading-7">
                {product.description}
              </p>

              <ProductVisual type={product.id} />

              <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-slate-50 px-3 py-1.5 font-body text-[8px] font-semibold uppercase tracking-[0.1em] text-slate-500"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Link
                href={localizedPath(`/products/${product.id}`)}
                className="mt-6 inline-flex items-center gap-3 font-body text-xs font-semibold text-brand-primary sm:mt-8"
              >
                {t("products.explore")}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
