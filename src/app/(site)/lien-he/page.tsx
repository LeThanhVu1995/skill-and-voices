import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { getContent } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Đăng ký tư vấn",
  description:
    "Đăng ký tư vấn miễn phí cùng Cô Duyên - Voice & Skill. Để lại thông tin để được tư vấn lộ trình phù hợp cho con.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: { lop?: string };
}) {
  const { general } = await getContent();
  const lop = typeof searchParams.lop === "string" ? searchParams.lop.trim() : "";
  const defaultNeed = lop ? `Đăng ký giữ chỗ lớp: ${lop}` : "";
  const contactInfo = [
    { icon: Phone, label: "Điện thoại / Zalo", value: general.phone, href: `tel:${general.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: general.email, href: `mailto:${general.email}` },
    { icon: MapPin, label: "Cơ sở học trực tiếp", value: `${general.addressNote} - ${general.address}` },
    { icon: Clock, label: "Giờ làm việc", value: "8:00 - 20:00 (T2 - CN)" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Đăng ký tư vấn"
        title="Đăng ký tư vấn miễn phí cùng Cô Duyên"
        description="Hãy để lại thông tin, Cô Duyên sẽ liên hệ và tư vấn lộ trình học phù hợp nhất cho con của quý phụ huynh."
        crumbs={[{ label: "Đăng ký tư vấn" }]}
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact info */}
          <Reveal>
            <div className="flex h-full flex-col">
              <h2 className="text-2xl font-bold text-brand-950">Thông tin liên hệ</h2>
              <p className="mt-3 text-brand-950/60">
                Quý phụ huynh có thể liên hệ trực tiếp qua các kênh dưới đây hoặc
                điền vào biểu mẫu bên cạnh.
              </p>

              <div className="mt-8 grid gap-4">
                {contactInfo.map((c) => {
                  const content = (
                    <div className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 transition-colors hover:border-brand-300">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <c.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">
                          {c.label}
                        </p>
                        <p className="font-medium text-brand-900">{c.value}</p>
                      </div>
                    </div>
                  );
                  return c.href ? (
                    <a key={c.label} href={c.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={c.label}>{content}</div>
                  );
                })}
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold text-brand-900">Kết nối với chúng tôi</p>
                <div className="mt-3 flex gap-3">
                  <a
                    href={general.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors hover:bg-brand-100"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href={general.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Zalo"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors hover:bg-brand-100"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={1}>
            <div className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft sm:p-10">
              <h2 className="text-2xl font-bold text-brand-950">Biểu mẫu đăng ký</h2>
              <p className="mt-2 text-sm text-brand-950/60">
                Vui lòng điền đầy đủ thông tin có dấu <span className="text-brand-500">*</span>
              </p>
              <div className="mt-7">
                <ConsultationForm defaultNeed={defaultNeed} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
