import { Phone, Mail, Inbox } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { StatusBadge, StatusSelect } from "@/components/admin/StatusControls";
import { updateConsultationStatus } from "../actions";

function fmt(d: Date) {
  return new Date(d).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function getData() {
  try {
    return await prisma.consultation.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function ConsultationsPage() {
  const items = await getData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-950">Đăng ký tư vấn</h1>
        <p className="mt-1.5 text-brand-950/60">
          Danh sách phụ huynh đã đăng ký tư vấn / học thử ({items.length}).
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {items.map((c) => (
            <div key={c.id} className="rounded-3xl border border-brand-100 bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-brand-950">{c.parentName}</h3>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="mt-1 text-sm text-brand-950/55">{fmt(c.createdAt)}</p>
                </div>
                <StatusSelect id={c.id} value={c.status} action={updateConsultationStatus} />
              </div>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <Info label="Học sinh" value={c.studentName ?? "—"} />
                <Info label="Lớp" value={c.grade ?? "—"} />
                <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-brand-700 hover:underline">
                  <Phone className="h-4 w-4" /> {c.phone}
                </a>
                {c.email ? (
                  <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-brand-700 hover:underline">
                    <Mail className="h-4 w-4" /> {c.email}
                  </a>
                ) : (
                  <Info label="Email" value="—" />
                )}
              </div>

              {c.need && (
                <div className="mt-4 rounded-2xl bg-brand-50/60 p-4 text-sm text-brand-950/75">
                  <span className="font-semibold text-brand-700">Nhu cầu: </span>
                  {c.need}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">{label}</p>
      <p className="mt-0.5 text-brand-900">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-20 text-center">
      <Inbox className="h-12 w-12 text-brand-200" />
      <p className="mt-4 font-semibold text-brand-900">Chưa có đăng ký nào</p>
      <p className="mt-1 text-sm text-brand-950/55">
        Các đăng ký tư vấn từ website sẽ hiển thị tại đây.
      </p>
    </div>
  );
}
