import Link from "next/link";
import { ArrowRight, BadgeCheck, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { AboutContent } from "@/lib/settings";

export function AboutPreview({
  about,
  name,
  brand,
}: {
  about: AboutContent;
  name: string;
  brand: string;
}) {
  return (
    <section className="section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        {/* Visual */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-24 w-24 rounded-2xl border border-gold-200 bg-gold-50" />
            <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-full border border-brand-100 bg-brand-50" />
            <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-50 to-cream shadow-soft">
              {about.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={about.portrait} alt={name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-10 text-center">
                  <span className="font-script text-5xl text-brand-700">{name}</span>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">
                    {brand}
                  </span>
                  <div className="mt-8 grid w-full gap-3">
                    {about.highlights.slice(0, 3).map((h) => (
                      <div
                        key={h}
                        className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white/70 px-4 py-3 text-left"
                      >
                        <BadgeCheck className="h-5 w-5 shrink-0 text-brand-600" />
                        <span className="text-sm font-medium text-brand-900">{h}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-[11px] text-brand-950/40">
                    * Tải ảnh chân dung tại Admin / Nội dung trang / Giới thiệu
                  </p>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">Giới thiệu {name}</span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-brand-950 sm:text-4xl">
              {about.title}
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-6 flex gap-4 rounded-2xl border-l-4 border-gold-400 bg-gold-50/60 p-5">
              <Quote className="h-6 w-6 shrink-0 text-gold-500" />
              <p className="font-display text-lg italic leading-relaxed text-brand-900">
                {about.philosophy}
              </p>
            </div>
          </Reveal>
          <Reveal delay={3}>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {about.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-brand-950/75">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-brand-600" />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={4}>
            <Link href="/gioi-thieu" className="btn-primary mt-9">
              Tìm hiểu thêm về {name} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
