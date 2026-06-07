import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PostForm } from "@/components/admin/PostForm";
import { updatePost } from "../../actions";
import type { PostData } from "@/lib/fallback";

async function getPost(id: string) {
  try {
    return await prisma.post.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  if (!post) notFound();

  const data: PostData = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    category: post.category,
    readTime: post.readTime,
    publishedAt: post.publishedAt.toISOString().slice(0, 10),
  };

  return (
    <div>
      <Link
        href="/admin/bai-viet"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách bài viết
      </Link>
      <h1 className="mb-6 mt-5 text-3xl font-bold text-brand-950">Chỉnh sửa bài viết</h1>
      <PostForm
        action={updatePost}
        post={data}
        defaultPublished={post.published}
        submitLabel="Lưu thay đổi"
      />
    </div>
  );
}
