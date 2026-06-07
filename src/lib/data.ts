import { prisma } from "./prisma";
import {
  fallbackPosts,
  fallbackTestimonials,
  type PostData,
  type TestimonialData,
} from "./fallback";

export async function getTestimonials(): Promise<TestimonialData[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: 8,
    });
    if (rows.length === 0) return fallbackTestimonials;
    return rows.map((r) => ({
      id: r.id,
      authorName: r.authorName,
      role: r.role,
      content: r.content,
      rating: r.rating,
    }));
  } catch {
    return fallbackTestimonials;
  }
}

export async function getPosts(): Promise<PostData[]> {
  try {
    const rows = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
    if (rows.length === 0) return fallbackPosts;
    return rows.map(mapPost);
  } catch {
    return fallbackPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const row = await prisma.post.findUnique({ where: { slug } });
    if (row) return mapPost(row);
  } catch {
    /* fall through to fallback */
  }
  return fallbackPosts.find((p) => p.slug === slug) ?? null;
}

type PrismaPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  readTime: number;
  publishedAt: Date;
};

function mapPost(r: PrismaPost): PostData {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    coverImage: r.coverImage,
    category: r.category,
    readTime: r.readTime,
    publishedAt: r.publishedAt.toISOString().slice(0, 10),
  };
}
