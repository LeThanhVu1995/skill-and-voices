import type { Metadata } from "next";
import { Sparkles, ArrowRight, Quote } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultationCTA } from "@/components/forms/ConsultationCTA";
import { MediaGallery } from "@/components/MediaGallery";
import { getContent } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Hành trình thay đổi của học sinh",
  description:
    "Những bước tiến nhỏ - Những thay đổi lớn. Câu chuyện trưởng thành của các học sinh cùng Cô Duyên - Voice & Skill.",
};

export default async function JourneyPage() {
  const { journey } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Hành trình thay đổi"
        title={journey.heroTitle}
        description={journey.heroDesc}
        crumbs={[{ label: "Hành trình" }]}
      />

      {/* Before / After */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Trước & Sau"
            title="Sự thay đổi rõ rệt ở các con"
            description="Không phải sự thay đổi trong một ngày, mà là kết quả của quá trình rèn luyện kiên trì."
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-5">
            {journey.items.map((item, i) => (
              <Reveal key={i} delay={i}>
                <div className="card flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex-1 rounded-2xl bg-brand-50/60 p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                      Trước
                    </span>
                    <p className="mt-1.5 font-medium text-brand-950/60">{item.before}</p>
                  </div>
                  <span className="mx-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-shine text-brand-900 shadow-gold sm:rotate-0">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                  <div className="flex-1 rounded-2xl bg-gold-50/70 p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                      Sau
                    </span>
                    <p className="mt-1.5 font-semibold text-brand-800">{item.after}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Student stories */}
      <section className="bg-gradient-to-b from-cream to-brand-50/40 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Câu chuyện học sinh"
            title="Mỗi em là một câu chuyện trưởng thành"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {journey.stories.map((s, i) => (
              <Reveal key={`${s.name}-${i}`} delay={i}>
                <article className="card flex h-full flex-col">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display font-bold text-white">
                      {s.name.split(" ").pop()?.charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold text-brand-900">{s.name}</p>
                      <p className="text-sm text-brand-950/55">{s.grade}</p>
                    </div>
                  </div>
                  <div className="mt-5 flex-1">
                    <Quote className="h-6 w-6 text-gold-400" />
                    <p className="mt-2 font-display italic leading-relaxed text-brand-900">
                      “{s.quote}”
                    </p>
                  </div>
                  <div className="mt-6 space-y-2 border-t border-brand-100 pt-5 text-sm">
                    <p className="text-brand-950/55">
                      <span className="font-semibold text-brand-400">Trước: </span>
                      {s.before}
                    </p>
                    <p className="text-brand-800">
                      <span className="font-semibold text-gold-600">Sau: </span>
                      {s.after}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-brand-950/50">
              <Sparkles className="h-4 w-4 text-gold-500" />
              Hình ảnh, video và nhận xét thực tế của phụ huynh sẽ được cập nhật tại đây.
            </p>
          </Reveal>
        </div>
      </section>

      {journey.gallery.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading
              eyebrow="Khoảnh khắc thực tế"
              title="Hình ảnh & video hành trình của các con"
            />
            <div className="mt-14">
              <MediaGallery items={journey.gallery} />
            </div>
          </div>
        </section>
      )}

      <ConsultationCTA />
    </>
  );
}
