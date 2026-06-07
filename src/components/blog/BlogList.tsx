"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, BookOpen } from "lucide-react";
import type { PostData } from "@/lib/fallback";

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export function BlogList({ posts }: { posts: PostData[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>(posts.map((p) => p.category));
    return ["Tất cả", ...Array.from(set)];
  }, [posts]);

  const [active, setActive] = useState("Tất cả");
  const filtered =
    active === "Tất cả" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              active === c
                ? "bg-brand-700 text-white shadow-soft"
                : "border border-brand-100 bg-white text-brand-950/70 hover:border-brand-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <motion.article
            key={post.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-[0_1px_0_rgba(123,30,30,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft"
          >
            <Link href={`/goc-phu-huynh/${post.slug}`} className="flex h-full flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-100 via-cream to-gold-100">
                {post.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-10 w-10 text-brand-300" />
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold leading-snug text-brand-950 transition-colors group-hover:text-brand-700">
                  {post.title}
                </h3>
                <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-brand-950/60">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-brand-50 pt-4 text-xs text-brand-950/50">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime} phút đọc
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-brand-600">
                    Đọc tiếp <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-brand-950/50">
          Chưa có bài viết trong chuyên mục này.
        </p>
      )}
    </div>
  );
}
