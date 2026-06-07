import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { footerLinks } from "@/lib/site";
import type { GeneralContent } from "@/lib/settings";

export function Footer({ general }: { general: GeneralContent }) {
  return (
    <footer className="relative mt-10 overflow-hidden bg-brand-950 text-cream/80">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-700/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-gold-700/20 blur-3xl" />

      <div className="container-x relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo light name={general.name} brand={general.brand} />
            <p className="mt-5 text-sm leading-relaxed text-cream/70">
              {general.description}
            </p>
            <p className="mt-5 font-script text-2xl text-gold-300">{general.slogan}</p>
            <div className="mt-6 flex gap-3">
              <SocialLink href={general.facebook} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={general.zalo} label="Zalo">
                <MessageCircle className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
              Khám phá
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-cream/70 transition-colors hover:text-gold-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">
              Liên hệ
            </h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-gold-300" />
                <a href={`tel:${general.phone.replace(/\s/g, "")}`} className="hover:text-gold-200">
                  {general.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-gold-300" />
                <a href={`mailto:${general.email}`} className="hover:text-gold-200">
                  {general.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-gold-300" />
                <span>
                  {general.addressNote}
                  <br />
                  {general.address}
                </span>
              </li>
            </ul>
            <Link href="/lien-he" className="btn-gold mt-6">
              Đăng ký tư vấn
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {general.name} - {general.brand}. Bảo lưu mọi quyền.
          </p>
          <p>Thiết kế dành riêng cho thương hiệu giáo dục.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cream/80 transition-all hover:border-gold-300 hover:bg-gold-500/20 hover:text-gold-200"
    >
      {children}
    </a>
  );
}
