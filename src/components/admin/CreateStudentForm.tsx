"use client";

import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import { UserPlus, Loader2, CheckCircle2, AlertCircle, X } from "lucide-react";
import { createStudent, type ActionResult } from "@/app/admin/actions";

const initialState: ActionResult = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Đang tạo...
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" /> Tạo tài khoản
        </>
      )}
    </button>
  );
}

export function CreateStudentForm() {
  const [state, formAction] = useFormState(createStudent, initialState);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
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
          <UserPlus className="h-4 w-4" /> Thêm học sinh
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-brand-950">Tạo tài khoản học sinh</h2>
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
              Họ tên <span className="text-brand-500">*</span>
            </label>
            <input
              name="name"
              required
              placeholder="Nguyễn Văn An"
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-900">Lớp</label>
            <input
              name="grade"
              placeholder="VD: Lớp 3"
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-900">
              Email đăng nhập <span className="text-brand-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="an@hocsinh.vn"
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-900">
              Mật khẩu <span className="text-brand-500">*</span>
            </label>
            <input
              name="password"
              type="text"
              required
              minLength={6}
              placeholder="Tối thiểu 6 ký tự"
              className="w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
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
