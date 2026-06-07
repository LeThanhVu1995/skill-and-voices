"use client";

import { useEffect, useRef } from "react";
// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";
import { submitConsultation, type FormState } from "@/app/actions";

const initialState: FormState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-gold w-full disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Đang gửi...
        </>
      ) : (
        <>
          Đăng ký tư vấn miễn phí <Send className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

export function ConsultationForm({ defaultNeed = "" }: { defaultNeed?: string }) {
  const [state, formAction] = useFormState(submitConsultation, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="parentName" label="Họ tên phụ huynh" placeholder="Nguyễn Văn A" required />
        <Field name="studentName" label="Tên học sinh" placeholder="Bé An" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="grade" label="Lớp" placeholder="Lớp 3" />
        <Field name="phone" label="Số điện thoại" placeholder="09xx xxx xxx" type="tel" required />
      </div>
      <Field name="email" label="Email (không bắt buộc)" placeholder="email@example.com" type="email" />
      <div>
        <label htmlFor="need" className="mb-1.5 block text-sm font-medium text-brand-900">
          Nhu cầu cần hỗ trợ
        </label>
        <textarea
          id="need"
          name="need"
          rows={3}
          defaultValue={defaultNeed}
          placeholder="Ví dụ: Con còn rụt rè, muốn cải thiện kỹ năng thuyết trình..."
          className="w-full resize-none rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-brand-950 outline-none transition-colors placeholder:text-brand-950/35 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {state.status === "success" && (
        <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{state.message}</p>
        </div>
      )}
      {state.status === "error" && (
        <div className="flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{state.message}</p>
        </div>
      )}

      <SubmitButton />
      <p className="text-center text-xs text-brand-950/45">
        Thông tin của quý phụ huynh được bảo mật tuyệt đối.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-brand-900">
        {label} {required && <span className="text-brand-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-brand-950 outline-none transition-colors placeholder:text-brand-950/35 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}
