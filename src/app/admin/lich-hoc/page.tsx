import { CalendarDays } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CreateScheduleForm } from "@/components/admin/CreateScheduleForm";
import { ScheduleItem } from "@/components/admin/ScheduleItem";
import type { ScheduleData } from "@/components/admin/ScheduleForm";

function fmt(d: Date | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

async function getData() {
  try {
    return await prisma.classSchedule.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  } catch {
    return [];
  }
}

export default async function ScheduleAdminPage() {
  const items = await getData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-950">Lịch khai giảng</h1>
        <p className="mt-1.5 text-brand-950/60">
          Quản lý các lớp / khóa học hiển thị trên trang Lịch khai giảng ({items.length}).
        </p>
      </div>

      <div className="mb-8">
        <CreateScheduleForm />
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-20 text-center">
          <CalendarDays className="h-12 w-12 text-brand-200" />
          <p className="mt-4 font-semibold text-brand-900">Chưa có lớp nào</p>
          <p className="mt-1 text-sm text-brand-950/55">Thêm lớp để phụ huynh đăng ký giữ chỗ.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((c) => {
            const data: ScheduleData = {
              id: c.id,
              name: c.name,
              ageGroup: c.ageGroup ?? "",
              mode: c.mode ?? "",
              schedule: c.schedule ?? "",
              startDate: c.startDate ? new Date(c.startDate).toISOString().slice(0, 10) : "",
              capacity: c.capacity,
              note: c.note ?? "",
              order: c.order,
            };
            return (
              <ScheduleItem
                key={c.id}
                data={data}
                published={c.published}
                startDateLabel={fmt(c.startDate)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
