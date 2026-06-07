"use client";

import { useEffect, useRef } from "react";
// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Send, Loader2 } from "lucide-react";
import { submitPartnership, type FormState } from "@/app/actions";

const initialState: FormState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Đang gửi...
        </>
      ) : (
        <>
          Gửi yêu cầu hợp tác <Send className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

export function PartnershipForm() {
  const [state, formAction] = useFormState(submitPartnership, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <Field name="orgName" label="Tên trường / đơn vị" placeholder="Trường Tiểu học ..." required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="contactName" label="Người liên hệ" placeholder="Họ và tên" required />
        <Field name="phone" label="Số điện thoại" placeholder="09xx xxx xxx" type="tel" required />
      </div>
      <Field name="email" label="Email" placeholder="email@truong.edu.vn" type="email" />
      <div>
        <label htmlFor="partnerType" className="mb-1.5 block text-sm font-medium text-brand-900">
          Hình thức hợp tác quan tâm
        </label>
        <select
          id="partnerType"
          name="partnerType"
          defaultValue=""
          className="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-brand-950 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        >
          <option value="" disabled>
            -- Chọn hình thức --
          </option>
          <option>Chuyên đề kỹ năng sống</option>
          <option>Chuyên đề giao tiếp & thuyết trình</option>
          <option>Câu lạc bộ kỹ năng</option>
          <option>Hoạt động trải nghiệm</option>
          <option>Khác</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-900">
          Nội dung trao đổi
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Mô tả ngắn gọn nhu cầu hợp tác của đơn vị..."
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
