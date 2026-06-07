import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { journeyItems } from "@/lib/content";

export function JourneyShowcase() {
  return (
    <section className="section bg-gradient-to-b from-cream to-brand-50/40">
      <div className="container-x">
        <SectionHeading
          eyebrow="Hành trình thay đổi"
          title="Những bước tiến nhỏ - Những thay đổi lớn"
          description="Mỗi học sinh là một câu chuyện trưởng thành. Hãy cùng nhìn lại hành trình các con đã đi qua."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {journeyItems.map((item, i) => (
            <Reveal key={i} delay={i}>
              <div className="card flex items-center gap-4 sm:gap-6">
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                    Trước khi tham gia
                  </span>
                  <p className="mt-1.5 text-base font-medium text-brand-950/55 line-through decoration-brand-300/60">
                    {item.before}
                  </p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-shine text-brand-900 shadow-gold">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    Sau khi rèn luyện
                  </span>
                  <p className="mt-1.5 text-base font-semibold text-brand-800">
                    {item.after}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
