"use client";

import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import { Plus, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { createAssignment, type ActionResult } from "@/app/admin/actions";

const initialState: ActionResult = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Đang đăng...
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" /> Đăng bài tập
        </>
      )}
    </button>
  );
}

export function CreateAssignmentForm() {
  const [state, formAction] = useFormState(createAssignment, initialState);
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
          <Plus className="h-4 w-4" /> Đăng bài tập mới
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-brand-950">Đăng bài tập mới</h2>
        <button
          onClick={() => setOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-brand-950/50 hover:bg-brand-50"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form ref={formRef} action={formAction} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-900">
            Tiêu đề <span className="text-brand-500">*</span>
          </label>
          <input
            name="title"
            required
            placeholder="VD: Luyện kể chuyện theo tranh"
            className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-900">
            Nội dung / Đề bài <span className="text-brand-500">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Mô tả yêu cầu bài tập cho học sinh..."
            className="w-full resize-none rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-900">Lớp áp dụng</label>
            <input
              name="grade"
              placeholder="VD: Lớp 3 (để trống = tất cả)"
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-900">Hạn nộp</label>
            <input
              name="dueDate"
              type="date"
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-brand-900">
            File đính kèm (không bắt buộc)
          </label>
          <input
            name="attachment"
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
            className="w-full rounded-2xl border border-brand-100 px-4 py-2.5 text-sm text-brand-950/70 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-700 file:px-3 file:py-1.5 file:text-white"
          />
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
