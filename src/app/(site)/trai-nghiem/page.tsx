import type { Metadata } from "next";
import { Sparkles, MapPin, Users, Theater, Presentation, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultationCTA } from "@/components/forms/ConsultationCTA";
import { MediaGallery } from "@/components/MediaGallery";
import { getContent } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Hoạt động trải nghiệm",
  description:
    "Học qua trải nghiệm - Trưởng thành qua thực hành: dã ngoại, tham quan, hoạt động nhóm, sân khấu hóa và thuyết trình thực tế.",
};

const expIcons: LucideIcon[] = [MapPin, Users, Theater, Presentation];

export default async function ExperiencePage() {
  const { experience } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Hoạt động trải nghiệm"
        title={experience.heroTitle}
        description={experience.heroDesc}
        crumbs={[{ label: "Trải nghiệm" }]}
      />

      {/* Experience types */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {experience.experiences.map((e, i) => {
              const Icon = expIcons[i % expIcons.length];
              return (
                <Reveal key={`${e.title}-${i}`} delay={i}>
                  <article className="card h-full hover:-translate-y-1.5 hover:shadow-soft">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-brand-950">{e.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-950/60">{e.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gradient-to-b from-cream to-brand-50/40 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Thư viện hình ảnh"
            title="Khoảnh khắc đáng nhớ của các con"
            description="Mỗi hoạt động là một kỷ niệm đẹp và một bài học về sự tự tin, đoàn kết."
          />
          <div className="mt-14">
            <MediaGallery items={experience.gallery} />
            {experience.gallery.every((m) => !m.url) && (
              <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-brand-950/50">
                <Sparkles className="h-4 w-4 text-gold-500" />
                Hình ảnh và video thực tế sẽ được Cô Duyên cập nhật tại mục Nội dung trang.
              </p>
            )}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
