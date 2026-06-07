import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({
  light = false,
  name = site.name,
  brand = site.brand,
}: {
  light?: boolean;
  name?: string;
  brand?: string;
}) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={name}>
      <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-700 shadow-soft transition-transform duration-300 group-hover:scale-105">
        <span className="absolute inset-0 rounded-2xl bg-gold-shine opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <svg
          viewBox="0 0 24 24"
          className="relative h-6 w-6 text-gold-200 group-hover:text-brand-900"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
          <path d="M12 18v4" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-script text-2xl font-bold ${
            light ? "text-white" : "text-brand-700"
          }`}
        >
          {name}
        </span>
        <span
          className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[0.32em] ${
            light ? "text-gold-200" : "text-gold-600"
          }`}
        >
          {brand}
        </span>
      </span>
    </Link>
  );
}
