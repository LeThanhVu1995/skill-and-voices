"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, Sparkles, Quote, ArrowRight, PlayCircle } from "lucide-react";
import { coreValues } from "@/lib/content";
import type { HomeContent } from "@/lib/settings";

export function Hero({ content, portrait }: { content: HomeContent; portrait: string | null }) {
  return (
    <section className="relative overflow-hidden bg-hero-radial">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-10 h-80 w-80 rounded-full bg-gold-200/40 blur-3xl" />

      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* Left: copy */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            <Sparkles className="h-3.5 w-3.5" /> {content.heroEyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-4xl font-bold leading-[1.1] text-brand-950 sm:text-5xl lg:text-[3.4rem]"
          >
            {content.heroTitleLead}{" "}
            <span className="gradient-text">{content.heroTitleHighlight}</span>
            {content.heroTitleRest}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-brand-950/65"
          >
            {content.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link href="/lien-he" className="btn-gold">
              Đăng ký học thử <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/lien-he" className="btn-primary">
              Nhận tư vấn miễn phí
            </Link>
            <Link href="/chuong-trinh" className="btn-outline">
              <PlayCircle className="h-4 w-4" /> Xem chương trình học
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex items-center gap-5"
          >
            <div className="flex -space-x-3">
              {["from-brand-400 to-brand-600", "from-gold-300 to-gold-500", "from-ocean-300 to-ocean-500", "from-brand-300 to-brand-500"].map(
                (g, i) => (
                  <span
                    key={i}
                    className={`h-10 w-10 rounded-full border-2 border-cream bg-gradient-to-br ${g}`}
                  />
                )
              )}
            </div>
            <p className="text-sm text-brand-950/60">{content.heroProof}</p>
          </motion.div>
        </div>

        {/* Right: portrait + floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-gold-200 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 shadow-soft">
            {portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={portrait} alt="Cô Duyên" className="h-full w-full object-cover" />
            ) : (
              <>
                {/* Decorative ao dai-inspired pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute bottom-0 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-gold-shine blur-2xl" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <span className="font-script text-5xl text-gold-200">Cô Duyên</span>
                  <span className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-cream/80">
                    Voice &amp; Skill
                  </span>
                  <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
                    <Quote className="mx-auto h-5 w-5 text-gold-200" />
                    <p className="mt-2 font-display text-sm italic leading-relaxed text-cream/90">
                      Mỗi đứa trẻ đều có tiếng nói riêng — khi được lắng nghe đúng cách,
                      các em sẽ tỏa sáng.
                    </p>
                  </div>
                  <p className="mt-5 text-[11px] text-cream/50">
                    * Tải ảnh chân dung tại Admin / Nội dung trang
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Floating badge - voice */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-10 hidden rounded-2xl border border-brand-100 bg-white p-3 shadow-soft sm:flex sm:items-center sm:gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <Mic className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-900">Luyện giọng</p>
              <p className="text-xs text-brand-950/50">Phát âm rõ, tự tin</p>
            </div>
          </motion.div>

          {/* Floating badge - confidence */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute -right-4 bottom-12 hidden rounded-2xl border border-gold-200 bg-white p-3 shadow-gold sm:flex sm:items-center sm:gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-brand-900">Tự tin</p>
              <p className="text-xs text-brand-950/50">Trước đám đông</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* mini values strip */}
      <div className="container-x relative pb-16">
        <div className="grid gap-4 rounded-3xl border border-brand-100 bg-white/70 p-4 backdrop-blur sm:grid-cols-3 sm:p-6">
          {coreValues.map((v) => (
            <div key={v.title} className="flex items-start gap-3 rounded-2xl p-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <v.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-brand-900">{v.title}</p>
                <p className="mt-0.5 text-sm text-brand-950/55">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
