import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, Users, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultationCTA } from "@/components/forms/ConsultationCTA";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Lịch khai giảng",
  description:
    "Lịch khai giảng các lớp kỹ năng thuyết trình, giao tiếp và đồng hành học tập cùng Cô Duyên - Voice & Skill. Đăng ký giữ chỗ sớm.",
};

export const revalidate = 60;

async function getSchedules() {
  try {
    return await prisma.classSchedule.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { startDate: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

function fmt(d: Date | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function SchedulePage() {
  const schedules = await getSchedules();

  return (
    <>
      <PageHero
        eyebrow="Lịch khai giảng"
        title="Các lớp sắp khai giảng"
        description="Lớp nhỏ 5–8 em để đảm bảo chất lượng. Đăng ký giữ chỗ sớm để con có một suất học phù hợp nhất."
        crumbs={[{ label: "Lịch khai giảng" }]}
      />

      <section className="section">
        <div className="container-x">
          {schedules.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-24 text-center">
              <CalendarDays className="h-14 w-14 text-brand-200" />
              <p className="mt-5 text-lg font-semibold text-brand-900">Lịch khai giảng đang được cập nhật</p>
              <p className="mt-1.5 max-w-md text-sm text-brand-950/55">
                Quý phụ huynh để lại thông tin để được báo lịch lớp mới sớm nhất.
              </p>
              <Link href="/lien-he" className="btn-gold mt-6">
                Nhận tư vấn &amp; báo lịch
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {schedules.map((c, i) => (
                <Reveal key={c.id} delay={i % 2}>
                  <article className="flex h-full flex-col rounded-3xl border border-brand-100 bg-white p-7 shadow-[0_1px_0_rgba(123,30,30,0.04)] transition-all hover:-translate-y-1 hover:shadow-soft">
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                        <CalendarDays className="h-6 w-6" />
                      </span>
                      {c.mode && (
                        <span className="rounded-full bg-ocean-50 px-3 py-1 text-xs font-semibold text-ocean-700">
                          {c.mode}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-brand-950">{c.name}</h3>

                    <ul className="mt-4 space-y-2.5 text-sm text-brand-950/70">
                      {c.ageGroup && (
                        <li className="flex items-center gap-2.5">
                          <Users className="h-4 w-4 text-brand-500" /> Đối tượng: {c.ageGroup}
                        </li>
                      )}
                      {c.schedule && (
                        <li className="flex items-center gap-2.5">
                          <Clock className="h-4 w-4 text-brand-500" /> {c.schedule}
                        </li>
                      )}
                      {c.startDate && (
                        <li className="flex items-center gap-2.5">
                          <CalendarDays className="h-4 w-4 text-brand-500" /> Khai giảng: {fmt(c.startDate)}
                        </li>
                      )}
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-brand-500" /> Lớp nhỏ tối đa {c.capacity} em
                      </li>
                    </ul>

                    {c.note && (
                      <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-sm font-semibold text-gold-700">
                        <Sparkles className="h-3.5 w-3.5" /> {c.note}
                      </p>
                    )}

                    <div className="mt-6 flex-1" />
                    <Link
                      href={`/lien-he?lop=${encodeURIComponent(c.name)}`}
                      className="btn-gold w-full"
                    >
                      Đăng ký giữ chỗ <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <ConsultationCTA />
    </>
  );
}
