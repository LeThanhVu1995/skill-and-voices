"use client";

// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { gradeSubmission, type ActionResult } from "@/app/admin/actions";

const initialState: ActionResult = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-gold disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Đang lưu...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" /> Lưu phê bình
        </>
      )}
    </button>
  );
}

export function GradeForm({
  submissionId,
  grade,
  feedback,
}: {
  submissionId: string;
  grade: string | null;
  feedback: string | null;
}) {
  const [state, formAction] = useFormState(gradeSubmission, initialState);

  return (
    <form action={formAction} className="mt-4 space-y-3 rounded-2xl bg-gold-50/50 p-4">
      <input type="hidden" name="submissionId" value={submissionId} />
      <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-700">
            Điểm / Xếp loại
          </label>
          <input
            name="grade"
            defaultValue={grade ?? ""}
            placeholder="VD: Tốt / 9đ"
            className="w-full rounded-xl border border-gold-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gold-700">
            Lời phê bình
          </label>
          <textarea
            name="feedback"
            defaultValue={feedback ?? ""}
            rows={2}
            placeholder="Nhận xét, góp ý cho học sinh..."
            className="w-full resize-none rounded-xl border border-gold-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-100"
          />
        </div>
      </div>

      {state.status === "success" && (
        <p className="flex items-center gap-2 text-sm text-green-700">
          <CheckCircle2 className="h-4 w-4" /> {state.message}
        </p>
      )}
      {state.status === "error" && (
        <p className="flex items-center gap-2 text-sm text-brand-700">
          <AlertCircle className="h-4 w-4" /> {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
