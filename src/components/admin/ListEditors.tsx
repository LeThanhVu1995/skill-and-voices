"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

type FieldDef = { key: string; label: string; textarea?: boolean };

/** Soạn danh sách các mục dạng đối tượng (mỗi mục có nhiều trường). */
export function ListEditor<T extends Record<string, string>>({
  name,
  label,
  fields,
  initial,
  template,
  addLabel = "Thêm mục",
}: {
  name: string;
  label: string;
  fields: FieldDef[];
  initial: T[];
  template: T;
  addLabel?: string;
}) {
  const [rows, setRows] = useState<T[]>(initial.length ? initial : [template]);

  const update = (i: number, key: string, value: string) =>
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, [key]: value } : row)));
  const add = () => setRows((r) => [...r, { ...template }]);
  const remove = (i: number) => setRows((r) => r.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-brand-900">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(rows)} />
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="relative rounded-2xl border border-brand-100 bg-brand-50/30 p-4 pr-12">
            <div className="grid gap-3 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={f.textarea ? "sm:col-span-2" : ""}>
                  <span className="mb-1 block text-xs font-medium text-brand-950/60">{f.label}</span>
                  {f.textarea ? (
                    <textarea
                      rows={2}
                      value={row[f.key] ?? ""}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      className="w-full resize-none rounded-xl border border-brand-100 px-3 py-2 text-sm outline-none focus:border-brand-400"
                    />
                  ) : (
                    <input
                      value={row[f.key] ?? ""}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm outline-none focus:border-brand-400"
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Xóa mục"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-brand-400 hover:bg-brand-50 hover:text-brand-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-dashed border-brand-300 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
      >
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}

/** Soạn danh sách chuỗi đơn giản (mỗi mục là 1 dòng chữ). */
export function StringListEditor({
  name,
  label,
  initial,
  placeholder,
  addLabel = "Thêm dòng",
}: {
  name: string;
  label: string;
  initial: string[];
  placeholder?: string;
  addLabel?: string;
}) {
  const [rows, setRows] = useState<string[]>(initial.length ? initial : [""]);

  const update = (i: number, value: string) =>
    setRows((r) => r.map((row, idx) => (idx === i ? value : row)));
  const add = () => setRows((r) => [...r, ""]);
  const remove = (i: number) => setRows((r) => r.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-brand-900">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(rows.filter((x) => x.trim() !== ""))} />
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={row}
              placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
              className="w-full rounded-xl border border-brand-100 px-3 py-2 text-sm outline-none focus:border-brand-400"
            />
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Xóa dòng"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-brand-400 hover:bg-brand-50 hover:text-brand-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-dashed border-brand-300 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
      >
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
    </div>
  );
}
