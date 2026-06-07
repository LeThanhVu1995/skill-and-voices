import { Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { ConsultationForm } from "./ConsultationForm";
import { getContent } from "@/lib/settings";

export async function ConsultationCTA({ id = "dang-ky" }: { id?: string }) {
  const { general } = await getContent();
  return (
    <section id={id} className="section scroll-mt-24">
      <div className="container-x">
        <div className="overflow-hidden rounded-[2.5rem] border border-brand-100 bg-white shadow-soft">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">
            {/* Left: invite */}
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 p-9 text-cream sm:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-600/20 blur-3xl" />
              <span className="eyebrow border-gold-400/40 bg-white/10 text-gold-200">
                Đăng ký tư vấn
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Nhận tư vấn miễn phí cùng Cô Duyên
              </h2>
              <p className="mt-4 text-cream/75">
                Để lại thông tin, Cô Duyên sẽ liên hệ tư vấn lộ trình phù hợp nhất
                cho con của quý phụ huynh.
              </p>

              <ul className="mt-9 space-y-5">
                <Benefit icon={ShieldCheck} title="Tư vấn cá nhân hóa" desc="Đánh giá đúng năng lực và nhu cầu của từng bé." />
                <Benefit icon={Clock} title="Phản hồi nhanh" desc="Liên hệ lại trong vòng 24 giờ làm việc." />
              </ul>

              <div className="mt-10 space-y-3 border-t border-white/10 pt-6 text-sm">
                <a href={`tel:${general.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 hover:text-gold-200">
                  <Phone className="h-4 w-4 text-gold-300" /> {general.phone}
                </a>
                <a href={`mailto:${general.email}`} className="flex items-center gap-3 hover:text-gold-200">
                  <Mail className="h-4 w-4 text-gold-300" /> {general.email}
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-9 sm:p-12">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({
  icon: Icon,
  title,
  desc,
}: {
  icon: typeof Phone;
  title: string;
  desc: string;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-200">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm text-cream/65">{desc}</p>
      </div>
    </li>
  );
}
