import type { Metadata } from "next";
import { BadgeCheck, Quote, GraduationCap, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultationCTA } from "@/components/forms/ConsultationCTA";
import { MediaGallery } from "@/components/MediaGallery";
import { getContent } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Cô Duyên - giáo viên Tiểu học, chuyên đào tạo kỹ năng giao tiếp, thuyết trình, luyện giọng và phát triển sự tự tin cho học sinh.",
};

export default async function AboutPage() {
  const { about, general } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Giới thiệu"
        title={about.title}
        description="Tận tâm, kiên nhẫn và luôn tin rằng mỗi đứa trẻ đều có thể tỏa sáng theo cách riêng của mình."
        crumbs={[{ label: "Giới thiệu" }]}
      />

      {/* Profile */}
      <section className="section">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-5 -top-5 h-24 w-24 rounded-2xl border border-gold-200 bg-gold-50" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-brand-100 bg-gradient-to-br from-brand-700 to-brand-950 shadow-soft">
                {about.portrait ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={about.portrait}
                    alt={general.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-10 text-center text-cream">
                    <span className="font-script text-6xl text-gold-200">{general.name}</span>
                    <span className="mt-3 text-xs font-semibold uppercase tracking-[0.32em] text-cream/80">
                      {general.brand}
                    </span>
                    <p className="mt-8 text-sm text-cream/55">
                      * Tải ảnh chân dung tại mục Nội dung trang / Giới thiệu
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">
                <GraduationCap className="h-3.5 w-3.5" /> Hồ sơ chuyên môn
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-5 text-3xl font-bold text-brand-950 sm:text-4xl">
                {general.name}
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-4 leading-relaxed text-brand-950/65">{about.intro}</p>
            </Reveal>
            <Reveal delay={3}>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {about.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white p-3.5 text-sm font-medium text-brand-900"
                  >
                    <BadgeCheck className="h-5 w-5 shrink-0 text-brand-600" />
                    {h}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-gradient-to-b from-cream to-brand-50/40 py-20">
        <div className="container-x">
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-gold-200 bg-white p-9 text-center shadow-soft sm:p-12">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-50 text-gold-600">
                <Quote className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">
                Triết lý giáo dục
              </h3>
              <p className="mt-4 font-display text-2xl italic leading-relaxed text-brand-900 sm:text-3xl">
                “{about.philosophy}”
              </p>
              <p className="mt-6 font-script text-3xl text-brand-700">— {general.name}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Activities */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Hình ảnh hoạt động"
            title="Những khoảnh khắc bên các con"
            description="Mỗi buổi học là một hành trình khám phá, sẻ chia và trưởng thành."
          />
          <div className="mt-14">
            <MediaGallery items={about.activities} />
            {about.activities.every((m) => !m.url) && (
              <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-brand-950/50">
                <Sparkles className="h-4 w-4 text-gold-500" />
                Hình ảnh hoạt động sẽ được Cô Duyên cập nhật tại mục Nội dung trang / Giới thiệu.
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-brand-50/40 to-cream">
        <ConsultationCTA />
      </div>
    </>
  );
}
