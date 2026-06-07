"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import type { Heading } from "@/lib/slug";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-auto rounded-3xl border border-brand-100 bg-white p-5 lg:block">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-500">
        <List className="h-4 w-4" /> Nội dung bài viết
      </p>
      <ul className="mt-4 space-y-1.5 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${h.id}`}
              className={`block rounded-lg px-2 py-1 transition-colors ${
                active === h.id
                  ? "bg-brand-50 font-semibold text-brand-700"
                  : "text-brand-950/60 hover:text-brand-700"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
