import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, Calendar, Tag, BookOpen } from "lucide-react";
import { ConsultationCTA } from "@/components/forms/ConsultationCTA";
import { PostContent } from "@/components/blog/PostContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { getPostBySlug, getPosts } from "@/lib/data";
import { extractHeadings } from "@/lib/slug";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Không tìm thấy bài viết" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await getPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const headings = extractHeadings(post.content);

  return (
    <>
      <ReadingProgress />

      <article>
        <header className="relative overflow-hidden border-b border-brand-100 bg-hero-radial">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
          <div className="container-x relative py-12 sm:py-16">
            <Link
              href="/goc-phu-huynh"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              <ArrowLeft className="h-4 w-4" /> Quay lại Góc phụ huynh
            </Link>
            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold text-white">
              <Tag className="h-3 w-3" /> {post.category}
            </span>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight text-brand-950 sm:text-4xl lg:text-[2.7rem]">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-brand-950/55">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readTime} phút đọc
              </span>
            </div>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="container-x -mt-2">
            <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded-3xl border border-brand-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
            </div>
          </div>
        )}

        <div className="container-x py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            {/* Main */}
            <div className="min-w-0 max-w-3xl">
              <p className="border-l-4 border-gold-400 bg-gold-50/50 p-5 text-lg font-medium italic leading-relaxed text-brand-900">
                {post.excerpt}
              </p>

              <div className="mt-8">
                <PostContent content={post.content} />
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-brand-100 pt-6">
                <ShareButtons title={post.title} />
                <Link href="/goc-phu-huynh" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
                  ← Tất cả bài viết
                </Link>
              </div>

              {/* Author box */}
              <div className="mt-8 flex items-center gap-4 rounded-3xl border border-brand-100 bg-white p-6">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-script text-2xl text-white">
                  D
                </span>
                <div>
                  <p className="font-script text-xl text-brand-700">Cô Duyên</p>
                  <p className="text-sm text-brand-950/60">
                    Giáo viên Tiểu học · Chuyên đào tạo kỹ năng thuyết trình, giao tiếp và phát triển sự tự tin cho trẻ.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-gradient-to-b from-cream to-brand-50/40 py-16">
          <div className="container-x">
            <h2 className="text-2xl font-bold text-brand-950">Bài viết liên quan</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/goc-phu-huynh/${p.slug}`}
                  className="group flex flex-col rounded-3xl border border-brand-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-soft"
                >
                  <BookOpen className="h-7 w-7 text-brand-300" />
                  <span className="mt-3 text-xs font-semibold text-gold-600">{p.category}</span>
                  <h3 className="mt-1 font-bold leading-snug text-brand-950 group-hover:text-brand-700">
                    {p.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-brand-950/60">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultationCTA />
    </>
  );
}
