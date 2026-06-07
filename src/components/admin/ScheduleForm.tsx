"use client";

import { useEffect, useRef } from "react";
// eslint-disable-next-line import/no-unresolved
import { useFormState, useFormStatus } from "react-dom";
import { Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { ScheduleResult } from "@/app/admin/lich-hoc/actions";

export type ScheduleData = {
  id: string;
  name: string;
  ageGroup: string;
  mode: string;
  schedule: string;
  startDate: string; // yyyy-mm-dd
  capacity: number;
  note: string;
  order: number;
};

const initialState: ScheduleResult = { status: "idle", message: "" };

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

export function ScheduleForm({
  action,
  schedule,
  submitLabel = "Lưu",
  onSuccess,
  resetOnSuccess = false,
}: {
  action: (prev: ScheduleResult, fd: FormData) => Promise<ScheduleResult>;
  schedule?: Partial<ScheduleData>;
  submitLabel?: string;
  onSuccess?: () => void;
  resetOnSuccess?: boolean;
}) {
  const [state, formAction] = useFormState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      if (resetOnSuccess) formRef.current?.reset();
      onSuccess?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const I = "w-full rounded-2xl border border-brand-100 px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100";
  const L = "mb-1.5 block text-sm font-medium text-brand-900";

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      {schedule?.id && <input type="hidden" name="id" value={schedule.id} />}
      <div>
        <label className={L}>Tên lớp / khóa <span className="text-brand-500">*</span></label>
        <input name="name" required defaultValue={schedule?.name} placeholder="VD: Lớp Kỹ năng thuyết trình - Khối 3" className={I} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={L}>Độ tuổi / Khối</label>
          <input name="ageGroup" defaultValue={schedule?.ageGroup} placeholder="VD: Lớp 1-3" className={I} />
        </div>
        <div>
          <label className={L}>Hình thức</label>
          <select name="mode" defaultValue={schedule?.mode || "Trực tiếp"} className={I}>
            <option>Trực tiếp</option>
            <option>Online</option>
            <option>Kèm 1 - 1</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={L}>Lịch học</label>
          <input name="schedule" defaultValue={schedule?.schedule} placeholder="VD: Thứ 3 - 5, 18:00 - 19:30" className={I} />
        </div>
        <div>
          <label className={L}>Ngày khai giảng</label>
          <input name="startDate" type="date" defaultValue={schedule?.startDate} className={I} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={L}>Sĩ số tối đa</label>
          <input name="capacity" type="number" min="1" defaultValue={schedule?.capacity ?? 8} className={I} />
        </div>
        <div>
          <label className={L}>Thứ tự hiển thị</label>
          <input name="order" type="number" defaultValue={schedule?.order ?? 0} className={I} />
        </div>
      </div>
      <div>
        <label className={L}>Ghi chú</label>
        <input name="note" defaultValue={schedule?.note} placeholder="VD: Còn 3 chỗ / Ưu đãi học sớm" className={I} />
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

      <SubmitButton label={submitLabel} />
    </form>
  );
}
