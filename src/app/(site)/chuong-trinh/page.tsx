import type { Metadata } from "next";
import {
  Check, Sparkles, Target, Layers, ShieldCheck, Users, Laptop, Home,
  MessageCircle, Presentation, AudioLines, BookOpen, Mic, Brain,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultationCTA } from "@/components/forms/ConsultationCTA";
import { getContent } from "@/lib/settings";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chương trình đào tạo",
  description:
    "Voice & Skill: kỹ năng thuyết trình, luyện giọng, tư vấn tâm lý và đồng hành phương pháp học tập cho trẻ từ mầm non, tiền tiểu học đến THCS.",
};

const skillStyles = [
  { icon: MessageCircle, chip: "bg-brand-50", color: "text-brand-700", ring: "border-brand-100", dot: "text-brand-600" },
  { icon: Presentation, chip: "bg-gold-50", color: "text-gold-600", ring: "border-gold-100", dot: "text-gold-600" },
  { icon: AudioLines, chip: "bg-ocean-50", color: "text-ocean-600", ring: "border-ocean-100", dot: "text-ocean-600" },
  { icon: BookOpen, chip: "bg-brand-50", color: "text-brand-700", ring: "border-brand-100", dot: "text-brand-600" },
];
const teachingIcons: LucideIcon[] = [Sparkles, BookOpen, Presentation];
const audienceIcons: LucideIcon[] = [Mic, Brain, Sparkles];
const modeIcons: LucideIcon[] = [Users, Laptop, Home];

export default async function ProgramsPage() {
  const { programs } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Chương trình Voice & Skill"
        title={programs.heroTitle}
        description={programs.heroDesc}
        crumbs={[{ label: "Chương trình" }]}
      />

      {/* Intro */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-3">
          {[
            { icon: Target, title: "Mục tiêu rõ ràng", desc: "Mỗi kỹ năng đều có mục tiêu và tiêu chí đánh giá cụ thể theo từng giai đoạn." },
            { icon: Layers, title: "Lộ trình theo cấp độ", desc: "Nội dung được phân tầng từ cơ bản đến nâng cao, phù hợp năng lực từng bé." },
            { icon: Sparkles, title: "Học mà chơi", desc: "Phương pháp gần gũi, vui vẻ giúp con yêu thích và chủ động luyện tập." },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i}>
              <div className="card h-full">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-brand-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-950/60">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skill groups */}
      <section className="bg-gradient-to-b from-cream to-brand-50/40 py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Các nhóm kỹ năng cốt lõi" title="Nội dung chương trình kỹ năng" />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {programs.skillGroups.map((g, i) => {
              const c = skillStyles[i % skillStyles.length];
              const Icon = c.icon;
              return (
                <Reveal key={`${g.title}-${i}`} delay={i}>
                  <article className={`card h-full border ${c.ring}`}>
                    <div className="flex items-center gap-4">
                      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.chip} ${c.color}`}>
                        <Icon className="h-7 w-7" />
                      </span>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                          Nhóm {i + 1}
                        </span>
                        <h3 className="text-xl font-bold text-brand-950">{g.title}</h3>
                      </div>
                    </div>
                    <ul className="mt-6 grid gap-3">
                      {g.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 rounded-2xl bg-cream/70 px-4 py-3 text-sm font-medium text-brand-900">
                          <Check className={`h-4 w-4 shrink-0 ${c.dot}`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaching content by age */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Nội dung đồng hành học tập"
            title="Phù hợp theo từng độ tuổi"
            description="Từ mầm non, tiền tiểu học đến THCS - mỗi giai đoạn có nội dung và cách tiếp cận riêng."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {programs.teaching.map((g, i) => {
              const Icon = teachingIcons[i % teachingIcons.length];
              return (
                <Reveal key={`${g.title}-${i}`} delay={i}>
                  <article className="card h-full">
                    <div className="flex items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-700">
                        {g.age}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-brand-950">{g.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {g.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-brand-950/70">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
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
          <SectionHeading eyebrow="Đối tượng phù hợp" title="Voice & Skill dành cho ai?" />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {programs.audiences.map((a, i) => {
              const Icon = audienceIcons[i % audienceIcons.length];
              return (
                <Reveal key={`${a.title}-${i}`} delay={i}>
                  <div className="card h-full">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ocean-50 text-ocean-600">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-brand-950">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-950/60">{a.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning modes */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Hình thức học"
            title="Linh hoạt, lớp nhỏ - chất lượng"
            description="Đảm bảo mỗi con đều được quan tâm sát sao trong từng buổi học."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
            {site.modes.map((m, i) => {
              const Icon = modeIcons[i] ?? Users;
              return (
                <Reveal key={m} delay={i}>
                  <div className="flex flex-col items-center gap-4 rounded-3xl border border-brand-100 bg-white p-8 text-center shadow-[0_1px_0_rgba(123,30,30,0.04)]">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                      <Icon className="h-7 w-7" />
                    </span>
                    <p className="font-semibold text-brand-900">{m}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50/60 p-5 text-sm text-brand-950/70">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
              <p>{programs.compliance}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Outcomes */}
      <section className="bg-gradient-to-b from-cream to-brand-50/40 py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Kết quả đầu ra"
              title="Con sẽ đạt được gì sau chương trình?"
              description="Những thay đổi rõ rệt mà phụ huynh có thể quan sát được ở con."
            />
          </div>
          <div className="grid gap-4">
            {programs.outcomes.map((o, i) => (
              <Reveal key={o} delay={i}>
                <div className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-[0_1px_0_rgba(123,30,30,0.04)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-shine font-display font-bold text-brand-900">
                    {i + 1}
                  </span>
                  <p className="font-medium text-brand-900">{o}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
