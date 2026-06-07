import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { programGroups } from "@/lib/content";

const colorMap: Record<string, { chip: string; icon: string; dot: string }> = {
  brand: { chip: "bg-brand-50", icon: "text-brand-700", dot: "text-brand-600" },
  gold: { chip: "bg-gold-50", icon: "text-gold-600", dot: "text-gold-600" },
  ocean: { chip: "bg-ocean-50", icon: "text-ocean-600", dot: "text-ocean-600" },
};

export function ProgramsPreview() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          eyebrow="Chương trình Voice & Skill"
          title="Lộ trình phát triển kỹ năng toàn diện"
          description="Chương trình phát triển kỹ năng giao tiếp, thuyết trình và tư duy được thiết kế riêng cho học sinh tiểu học."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programGroups.map((g, i) => {
            const c = colorMap[g.color] ?? colorMap.brand;
            return (
              <Reveal key={g.title} delay={i} className="h-full">
                <article className="card group h-full hover:-translate-y-1.5 hover:shadow-soft">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.chip} ${c.icon} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <g.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-brand-950">{g.title}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-brand-950/70">
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

        <div className="mt-12 flex justify-center">
          <Link href="/chuong-trinh" className="btn-primary">
            Xem chi tiết chương trình <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
