"use client";

// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import { AlertCircle, LogIn, Loader2 } from "lucide-react";
import { login, type LoginState } from "@/app/auth-actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Đang đăng nhập...
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" /> Đăng nhập
        </>
      )}
    </button>
  );
}

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next ?? ""} />
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="email@example.com"
          className="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-brand-950 outline-none transition-colors placeholder:text-brand-950/35 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-brand-900">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm text-brand-950 outline-none transition-colors placeholder:text-brand-950/35 focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      {state.error && (
        <div className="flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{state.error}</p>
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
