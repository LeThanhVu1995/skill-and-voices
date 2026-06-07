import Link from "next/link";
import { FileText, Plus, Eye, EyeOff, Trash2, Pencil, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { togglePostPublished, deletePost } from "../actions";

function fmt(d: Date) {
  return new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

async function getData() {
  try {
    const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } });
    return { posts, ok: true };
  } catch {
    return { posts: [], ok: false };
  }
}

export default async function PostsAdminPage() {
  const { posts, ok } = await getData();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-950">Bài viết</h1>
          <p className="mt-1.5 text-brand-950/60">
            Quản lý các bài viết Góc phụ huynh ({posts.length}).
          </p>
        </div>
        <Link href="/admin/bai-viet/moi" className="btn-primary">
          <Plus className="h-4 w-4" /> Viết bài mới
        </Link>
      </div>

      {!ok && (
        <div className="mb-6 rounded-2xl border border-gold-200 bg-gold-50 p-4 text-sm text-gold-800">
          Chưa kết nối được cơ sở dữ liệu. Hãy chạy <code>npm run db:push</code> để quản lý bài viết.
        </div>
      )}

      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-20 text-center">
          <FileText className="h-12 w-12 text-brand-200" />
          <p className="mt-4 font-semibold text-brand-900">Chưa có bài viết</p>
          <p className="mt-1 text-sm text-brand-950/55">Viết bài đầu tiên cho Góc phụ huynh.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center gap-4 rounded-3xl border border-brand-100 bg-white p-5">
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-brand-100 to-gold-100">
                {p.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverImage} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FileText className="h-6 w-6 text-brand-300" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gold-50 px-2.5 py-0.5 text-xs font-semibold text-gold-700">
                    {p.category}
                  </span>
                  {p.published ? (
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                      Đã đăng
                    </span>
                  ) : (
                    <span className="rounded-full bg-brand-950/10 px-2.5 py-0.5 text-xs font-semibold text-brand-950/60">
                      Bản nháp
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 truncate font-bold text-brand-950">{p.title}</h3>
                <p className="text-xs text-brand-950/50">
                  {fmt(p.publishedAt)} · {p.readTime} phút đọc
                </p>
              </div>

              <div className="flex items-center gap-2">
                {p.published && (
                  <Link
                    href={`/goc-phu-huynh/${p.slug}`}
                    target="_blank"
                    title="Xem bài"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-700 hover:bg-brand-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
                <Link
                  href={`/admin/bai-viet/${p.id}`}
                  title="Sửa bài"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-700 hover:bg-brand-50"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <form action={togglePostPublished}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    title={p.published ? "Ẩn bài" : "Đăng bài"}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-700 hover:bg-brand-50"
                  >
                    {p.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </form>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    title="Xóa bài"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-500 hover:bg-brand-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
