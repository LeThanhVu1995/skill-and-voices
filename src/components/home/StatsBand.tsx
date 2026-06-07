"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { StatItem } from "@/lib/settings";

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

function StatCard({ value, label, active }: { value: string; label: string; active: boolean }) {
  const numeric = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[\d.,]/g, "");
  const count = useCountUp(numeric, active);
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-bold text-gold-300 sm:text-5xl">
        {count.toLocaleString("vi-VN")}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-cream/70">{label}</p>
    </div>
  );
}

export function StatsBand({ title, stats }: { title: string; stats: StatItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden bg-brand-900 py-16">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-10" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-600/20 blur-3xl" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="container-x relative"
      >
        <p className="mb-10 text-center font-script text-3xl text-gold-300">
          {title}
        </p>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} value={s.value} label={s.label} active={inView} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
