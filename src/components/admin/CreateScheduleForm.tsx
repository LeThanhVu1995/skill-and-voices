"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { createSchedule } from "@/app/admin/lich-hoc/actions";
import { ScheduleForm } from "./ScheduleForm";

export function CreateScheduleForm() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-primary">
        <Plus className="h-4 w-4" /> Thêm lớp khai giảng
      </button>
    );
  }

  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-brand-950">Thêm lớp khai giảng</h2>
        <button
          onClick={() => setOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-brand-950/50 hover:bg-brand-50"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <ScheduleForm action={createSchedule} submitLabel="Thêm lớp" resetOnSuccess onSuccess={() => setOpen(false)} />
    </div>
  );
}
