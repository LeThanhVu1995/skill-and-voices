import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "../../actions";

export default function NewPostPage() {
  return (
    <div>
      <Link
        href="/admin/bai-viet"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách bài viết
      </Link>
      <h1 className="mb-6 mt-5 text-3xl font-bold text-brand-950">Viết bài mới</h1>
      <PostForm action={createPost} submitLabel="Tạo bài viết" />
    </div>
  );
}
