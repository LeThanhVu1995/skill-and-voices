"use client";

import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Save, Loader2, CheckCircle2, AlertCircle, Eye, Pencil } from "lucide-react";
import type { ActionResult } from "@/app/admin/actions";
import type { PostData } from "@/lib/fallback";
import { postCategories } from "@/lib/fallback";

const initialState: ActionResult = { status: "idle", message: "" };

type Action = (prev: ActionResult, formData: FormData) => Promise<ActionResult>;

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Đang lưu...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" /> {label}
        </>
      )}
    </button>
  );
}

const categories = postCategories.filter((c) => c !== "Tất cả");

export function PostForm({
  action,
  post,
  defaultPublished = true,
  submitLabel = "Lưu bài viết",
}: {
  action: Action;
  post?: PostData;
  defaultPublished?: boolean;
  submitLabel?: string;
}) {
  const [state, formAction] = useFormState(action, initialState);
  const [content, setContent] = useState(post?.content ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "idle") topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state]);

  return (
    <form action={formAction} className="space-y-5">
      <div ref={topRef} />
      {post && <input type="hidden" name="id" value={post.id} />}

      {state.status === "success" && (
        <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle2 className="h-5 w-5" /> {state.message}
        </div>
      )}
      {state.status === "error" && (
        <div className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
          <AlertCircle className="h-5 w-5" /> {state.message}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-900">
              Tiêu đề <span className="text-brand-500">*</span>
            </label>
            <input
              name="title"
              required
              defaultValue={post?.title}
              placeholder="Tiêu đề bài viết"
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-base font-semibold outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-900">
              Mô tả ngắn (hiển thị ở danh sách) <span className="text-brand-500">*</span>
            </label>
            <textarea
              name="excerpt"
              required
              rows={2}
              defaultValue={post?.excerpt}
              placeholder="Tóm tắt nội dung trong 1-2 câu..."
              className="w-full resize-none rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm font-medium text-brand-900">
                Nội dung (Markdown) <span className="text-brand-500">*</span>
              </label>
              <div className="flex rounded-xl border border-brand-100 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setTab("write")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium ${
                    tab === "write" ? "bg-brand-700 text-white" : "text-brand-950/60"
                  }`}
                >
                  <Pencil className="h-3.5 w-3.5" /> Soạn
                </button>
                <button
                  type="button"
                  onClick={() => setTab("preview")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium ${
                    tab === "preview" ? "bg-brand-700 text-white" : "text-brand-950/60"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" /> Xem trước
                </button>
              </div>
            </div>

            {tab === "write" ? (
              <textarea
                name="content"
                required
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={"Viết nội dung bằng Markdown...\n\n## Tiêu đề mục\n\nĐoạn văn bình thường.\n\n- Ý 1\n- Ý 2\n\n> Trích dẫn nổi bật"}
                className="w-full rounded-2xl border border-brand-100 px-4 py-3 font-mono text-sm leading-relaxed outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            ) : (
              <div className="min-h-[28rem] rounded-2xl border border-brand-100 bg-white p-5">
                {content.trim() ? (
                  <div className="prose prose-brand max-w-none prose-h2:text-2xl prose-h3:text-xl">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm text-brand-950/40">Chưa có nội dung để xem trước.</p>
                )}
                {/* giữ giá trị content khi submit ở tab preview */}
                <input type="hidden" name="content" value={content} />
              </div>
            )}
            <p className="mt-1.5 text-xs text-brand-950/50">
              Hỗ trợ Markdown: <code>## Tiêu đề</code>, <code>**đậm**</code>, <code>- danh sách</code>, <code>&gt; trích dẫn</code>.
            </p>
          </div>
        </div>

        {/* Side settings */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-brand-100 bg-white p-5">
            <label className="mb-1.5 block text-sm font-medium text-brand-900">Chuyên mục</label>
            <select
              name="category"
              defaultValue={post?.category ?? categories[0]}
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <label className="mb-1.5 mt-4 block text-sm font-medium text-brand-900">
              Ảnh bìa (URL)
            </label>
            <input
              name="coverUrl"
              type="url"
              defaultValue={post?.coverImage && !post.coverImage.startsWith("/media/") ? post.coverImage : ""}
              placeholder="https://..."
              className="w-full rounded-2xl border border-brand-100 px-4 py-2.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
            <p className="my-2 text-center text-xs text-brand-950/40">hoặc tải ảnh lên</p>
            <input
              name="coverFile"
              type="file"
              accept=".png,.jpg,.jpeg,.gif,.webp"
              className="w-full rounded-2xl border border-brand-100 px-3 py-2 text-xs text-brand-950/70 file:mr-2 file:rounded-lg file:border-0 file:bg-brand-700 file:px-2.5 file:py-1.5 file:text-white"
            />
            {post?.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.coverImage} alt="" className="mt-3 aspect-video w-full rounded-xl object-cover" />
            )}

            <label className="mt-4 flex items-center gap-2.5 text-sm font-medium text-brand-900">
              <input
                type="checkbox"
                name="published"
                defaultChecked={defaultPublished}
                className="h-4 w-4 rounded border-brand-200 text-brand-700 focus:ring-brand-300"
              />
              Đăng công khai
            </label>
          </div>

          <SubmitButton label={submitLabel} />
        </div>
      </div>
    </form>
  );
}
