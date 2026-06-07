import type { Metadata } from "next";
import { Sparkles, MessageCircle, Users, MapPin, School, BookOpen, Handshake, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PartnershipForm } from "@/components/forms/PartnershipForm";
import { getContent } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Hợp tác giáo dục",
  description:
    "Kết nối và đồng hành cùng nhà trường: chuyên đề kỹ năng sống, giao tiếp, thuyết trình, câu lạc bộ kỹ năng và hoạt động trải nghiệm.",
};

const formIcons: LucideIcon[] = [Sparkles, MessageCircle, Users, MapPin];
const audienceIcons: LucideIcon[] = [School, BookOpen, Handshake];

export default async function PartnershipPage() {
  const { partner } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Hợp tác giáo dục"
        title={partner.heroTitle}
        description={partner.heroDesc}
        crumbs={[{ label: "Hợp tác" }]}
      />

      {/* Forms of partnership */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Các hình thức hợp tác"
            title="Chúng tôi có thể đồng hành cùng nhà trường"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {partner.forms.map((f, i) => {
              const Icon = formIcons[i % formIcons.length];
              return (
                <Reveal key={`${f.title}-${i}`} delay={i}>
                  <article className="card flex h-full items-start gap-5">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-600">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-brand-950">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-950/60">{f.desc}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-gradient-to-b from-cream to-brand-50/40 py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Đối tượng hợp tác" title="Chúng tôi đồng hành cùng" />
          <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-3">
            {partner.audiences.map((label, i) => {
              const Icon = audienceIcons[i % audienceIcons.length];
              return (
                <Reveal key={`${label}-${i}`} delay={i}>
                  <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand-100 bg-white p-8 text-center shadow-[0_1px_0_rgba(123,30,30,0.04)]">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                      <Icon className="h-8 w-8" />
                    </span>
                    <p className="font-semibold text-brand-900">{label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership form */}
      <section id="lien-he-hop-tac" className="section scroll-mt-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white shadow-soft">
            <div className="bg-gradient-to-br from-brand-800 to-brand-950 p-8 text-center text-cream sm:p-10">
              <span className="eyebrow border-gold-400/40 bg-white/10 text-gold-200">
                Liên hệ hợp tác
              </span>
              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                {partner.ctaTitle}
              </h2>
              <p className="mt-3 text-cream/70">{partner.ctaDesc}</p>
            </div>
            <div className="p-8 sm:p-10">
              <PartnershipForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
