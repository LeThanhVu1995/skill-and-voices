"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TestimonialData } from "@/lib/fallback";

export function Testimonials({ items }: { items: TestimonialData[] }) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);
  const active = items[index];

  if (count === 0) return null;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Cảm nhận phụ huynh"
          title="Niềm tin của phụ huynh là động lực của chúng tôi"
          description="Những chia sẻ chân thật từ các bậc phụ huynh đã đồng hành cùng Cô Duyên - Voice & Skill."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="absolute -left-4 -top-4 text-brand-100">
            <Quote className="h-20 w-20" />
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-white p-8 shadow-soft sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="mt-5 text-lg font-medium leading-relaxed text-brand-950/80 sm:text-xl">
                  “{active.content}”
                </p>
                <div className="mt-7 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-bold text-white">
                    {active.authorName.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-brand-900">{active.authorName}</p>
                    {active.role && (
                      <p className="text-sm text-brand-950/55">{active.role}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Trước"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition-colors hover:bg-brand-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === index ? "w-7 bg-brand-600" : "w-2.5 bg-brand-200"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Sau"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-200 bg-white text-brand-700 transition-colors hover:bg-brand-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
