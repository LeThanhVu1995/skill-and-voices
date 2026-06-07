import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-brand-100 bg-hero-radial">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-gold-200/40 blur-3xl" />
      <div className="container-x relative py-16 sm:py-20">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-brand-950/55">
          <Link href="/" className="hover:text-brand-700">
            Trang chủ
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              {c.href ? (
                <Link href={c.href} className="hover:text-brand-700">
                  {c.label}
                </Link>
              ) : (
                <span className="text-brand-700">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && <span className="eyebrow mt-6">{eyebrow}</span>}
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-brand-950 sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-950/60">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
