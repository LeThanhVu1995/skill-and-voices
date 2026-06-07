"use client";

import { useRef } from "react";

export const LEAD_LABELS: Record<string, string> = {
  NEW: "Mới",
  CONTACTED: "Đã liên hệ",
  CONVERTED: "Đã chốt",
  CLOSED: "Đóng",
};

const STYLES: Record<string, string> = {
  NEW: "bg-brand-100 text-brand-700",
  CONTACTED: "bg-ocean-100 text-ocean-700",
  CONVERTED: "bg-green-100 text-green-700",
  CLOSED: "bg-brand-950/10 text-brand-950/60",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${STYLES[status] ?? STYLES.NEW}`}>
      {LEAD_LABELS[status] ?? status}
    </span>
  );
}

export function StatusSelect({
  id,
  value,
  action,
}: {
  id: string;
  value: string;
  action: (formData: FormData) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} action={action}>
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={value}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-xl border border-brand-100 bg-white px-3 py-1.5 text-sm font-medium text-brand-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
      >
        {Object.entries(LEAD_LABELS).map(([k, label]) => (
          <option key={k} value={k}>
            {label}
          </option>
        ))}
      </select>
    </form>
  );
}
