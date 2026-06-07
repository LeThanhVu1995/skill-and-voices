"use client";

import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import { Upload, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { uploadGame, type ActionResult } from "@/app/admin/actions";

const initialState: ActionResult = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Đang tải lên...
        </>
      ) : (
        <>
          <Upload className="h-4 w-4" /> Tải lên trò chơi
        </>
      )}
    </button>
  );
}

export function UploadGameForm() {
  const [state, formAction] = useFormState(uploadGame, initialState);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      setOpen(false);
    }
  }, [state]);

  if (!open) {
    return (
      <div>
        {state.status === "success" && (
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            <CheckCircle2 className="h-5 w-5" /> {state.message}
          </div>
        )}
        <button onClick={() => setOpen(true)} className="btn-primary">
          <Upload className="h-4 w-4" /> Tải lên trò chơi
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-brand-950">Tải lên trò chơi mới</h2>
        <button
          onClick={() => setOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-brand-950/50 hover:bg-brand-50"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-900">
              Tên trò chơi <span className="text-brand-500">*</span>
            </label>
            <input
              name="title"
              required
              placeholder="VD: Ghép vần vui nhộn"
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-900">Phân loại</label>
            <input
              name="category"
              placeholder="VD: Luyện từ vựng"
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-900">Mô tả</label>
          <textarea
            name="description"
            rows={2}
            placeholder="Mô tả ngắn về trò chơi..."
            className="w-full resize-none rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-900">
            File HTML trò chơi <span className="text-brand-500">*</span>
          </label>
          <input
            name="file"
            type="file"
            accept=".html,.htm"
            required
            className="w-full rounded-2xl border border-brand-100 px-4 py-2.5 text-sm text-brand-950/70 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-700 file:px-3 file:py-1.5 file:text-white"
          />
          <p className="mt-1.5 text-xs text-brand-950/50">
            Chọn 1 file .html tự chứa (self-contained). Trò chơi sẽ chạy an toàn trong khung iframe.
          </p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-900">
            Ảnh thumbnail (không bắt buộc)
          </label>
          <input
            name="thumbnail"
            type="file"
            accept=".png,.jpg,.jpeg,.gif,.webp"
            className="w-full rounded-2xl border border-brand-100 px-4 py-2.5 text-sm text-brand-950/70 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-700 file:px-3 file:py-1.5 file:text-white"
          />
          <p className="mt-1.5 text-xs text-brand-950/50">
            Ảnh đại diện hiển thị ở kho trò chơi. Bỏ trống sẽ dùng nền mặc định.
          </p>
        </div>

        {state.status === "error" && (
          <div className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
            <AlertCircle className="h-5 w-5" /> {state.message}
          </div>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}
