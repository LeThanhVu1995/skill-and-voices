"use client";

// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitAssignment, type SubmitResult } from "@/app/hoc-tap/actions";

const initialState: SubmitResult = { status: "idle", message: "" };

function SubmitButton({ resubmit }: { resubmit: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary disabled:opacity-70">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Đang nộp...
        </>
      ) : (
        <>
          <Send className="h-4 w-4" /> {resubmit ? "Nộp lại bài" : "Nộp bài"}
        </>
      )}
    </button>
  );
}

export function SubmitAssignmentForm({
  assignmentId,
  defaultContent = "",
  resubmit = false,
}: {
  assignmentId: string;
  defaultContent?: string;
  resubmit?: boolean;
}) {
  const [state, formAction] = useFormState(submitAssignment, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="assignmentId" value={assignmentId} />
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-900">
          Bài làm của con <span className="text-brand-500">*</span>
        </label>
        <textarea
          name="content"
          required
          rows={6}
          defaultValue={defaultContent}
          placeholder="Con viết bài làm của mình ở đây..."
          className="w-full resize-none rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-brand-900">
          Đính kèm hình ảnh / file (không bắt buộc)
        </label>
        <input
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt"
          className="w-full rounded-2xl border border-brand-100 px-4 py-2.5 text-sm text-brand-950/70 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-700 file:px-3 file:py-1.5 file:text-white"
        />
      </div>

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

      <SubmitButton resubmit={resubmit} />
    </form>
  );
}
