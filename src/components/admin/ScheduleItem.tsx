"use client";

import { useState } from "react";
import { Eye, EyeOff, Trash2, Pencil, Clock, Users, X } from "lucide-react";
import { ScheduleForm, type ScheduleData } from "./ScheduleForm";
import { updateSchedule, toggleSchedulePublished, deleteSchedule } from "@/app/admin/lich-hoc/actions";

type Props = {
  data: ScheduleData;
  published: boolean;
  startDateLabel: string | null;
};

export function ScheduleItem({ data, published, startDateLabel }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-3xl border border-brand-200 bg-white p-6 shadow-soft">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-brand-950">Chỉnh sửa lớp</h3>
          <button
            onClick={() => setEditing(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-brand-950/50 hover:bg-brand-50"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ScheduleForm
          action={updateSchedule}
          schedule={data}
          submitLabel="Lưu thay đổi"
          onSuccess={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-brand-100 bg-white p-6">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-bold text-brand-950">{data.name}</h3>
          {data.mode && (
            <span className="rounded-full bg-ocean-50 px-2.5 py-0.5 text-xs font-semibold text-ocean-700">{data.mode}</span>
          )}
          {!published && (
            <span className="rounded-full bg-brand-950/10 px-2.5 py-0.5 text-xs font-semibold text-brand-950/60">Đã ẩn</span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-brand-950/60">
          {data.ageGroup && <span>👶 {data.ageGroup}</span>}
          {data.schedule && (
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {data.schedule}</span>
          )}
          <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> Tối đa {data.capacity} em</span>
          {startDateLabel && <span>📅 Khai giảng {startDateLabel}</span>}
        </div>
        {data.note && <p className="mt-2 text-sm font-medium text-gold-700">{data.note}</p>}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setEditing(true)}
          title="Sửa"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-700 hover:bg-brand-50"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <form action={toggleSchedulePublished}>
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" title={published ? "Ẩn" : "Hiện"} className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-700 hover:bg-brand-50">
            {published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </form>
        <form action={deleteSchedule}>
          <input type="hidden" name="id" value={data.id} />
          <button type="submit" title="Xóa" className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-500 hover:bg-brand-50">
            <Trash2 className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
