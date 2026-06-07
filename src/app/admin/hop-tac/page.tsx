import { Phone, Mail, Inbox, Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { StatusBadge, StatusSelect } from "@/components/admin/StatusControls";
import { updatePartnershipStatus } from "../actions";

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
    return await prisma.partnership.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function PartnershipsPage() {
  const items = await getData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-950">Yêu cầu hợp tác</h1>
        <p className="mt-1.5 text-brand-950/60">
          Danh sách trường học / đơn vị muốn hợp tác ({items.length}).
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-20 text-center">
          <Inbox className="h-12 w-12 text-brand-200" />
          <p className="mt-4 font-semibold text-brand-900">Chưa có yêu cầu hợp tác</p>
          <p className="mt-1 text-sm text-brand-950/55">
            Các yêu cầu từ trang Hợp tác sẽ hiển thị tại đây.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((p) => (
            <div key={p.id} className="rounded-3xl border border-brand-100 bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                      <Building2 className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-brand-950">{p.orgName}</h3>
                        <StatusBadge status={p.status} />
                      </div>
                      <p className="text-sm text-brand-950/55">{fmt(p.createdAt)}</p>
                    </div>
                  </div>
                </div>
                <StatusSelect id={p.id} value={p.status} action={updatePartnershipStatus} />
              </div>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <Info label="Người liên hệ" value={p.contactName} />
                <Info label="Hình thức" value={p.partnerType ?? "—"} />
                <a href={`tel:${p.phone}`} className="flex items-center gap-2 text-brand-700 hover:underline">
                  <Phone className="h-4 w-4" /> {p.phone}
                </a>
                {p.email ? (
                  <a href={`mailto:${p.email}`} className="flex items-center gap-2 text-brand-700 hover:underline">
                    <Mail className="h-4 w-4" /> {p.email}
                  </a>
                ) : (
                  <Info label="Email" value="—" />
                )}
              </div>

              {p.message && (
                <div className="mt-4 rounded-2xl bg-gold-50/60 p-4 text-sm text-brand-950/75">
                  <span className="font-semibold text-gold-700">Nội dung: </span>
                  {p.message}
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
