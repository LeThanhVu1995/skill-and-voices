"use client";

import { useRef, useState } from "react";
import { Upload, Link2, Trash2, Loader2, Film, ImageIcon } from "lucide-react";
import { uploadMedia } from "@/app/admin/noi-dung/actions";
import type { MediaItem } from "@/lib/settings";

export function MediaGalleryEditor({
  name,
  label,
  initial,
}: {
  name: string;
  label: string;
  initial: MediaItem[];
}) {
  const [items, setItems] = useState<MediaItem[]>(initial ?? []);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [err, setErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const setCaption = (i: number, caption: string) =>
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, caption } : it)));
  const remove = (i: number) => setItems((arr) => arr.filter((_, idx) => idx !== i));

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadMedia(fd);
      if (res.url) {
        setItems((arr) => [...arr, { type: res.type ?? "image", url: res.url!, caption: "" }]);
      } else {
        setErr(res.error ?? "Không tải được tệp.");
      }
    } catch {
      setErr("Không tải được tệp (có thể do dung lượng quá lớn).");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function addVideo() {
    const url = videoUrl.trim();
    if (!url) return;
    setItems((arr) => [...arr, { type: "video", url, caption: "" }]);
    setVideoUrl("");
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-brand-900">{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(items)} />

      {items.length > 0 && (
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
              <div className="relative flex aspect-video items-center justify-center bg-brand-50">
                {it.type === "image" && it.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.url} alt="" className="h-full w-full object-cover" />
                ) : it.type === "video" ? (
                  <Film className="h-8 w-8 text-ocean-500" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-brand-300" />
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label="Xóa"
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-brand-500 shadow hover:text-brand-700"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                  {it.type === "video" ? "VIDEO" : "ẢNH"}
                </span>
              </div>
              <input
                value={it.caption ?? ""}
                onChange={(e) => setCaption(i, e.target.value)}
                placeholder="Chú thích..."
                className="w-full border-t border-brand-50 px-3 py-2 text-xs outline-none focus:bg-brand-50/40"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-brand-300 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Tải ảnh / video lên
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".png,.jpg,.jpeg,.gif,.webp,.mp4,.webm,.ogg,.mov"
          onChange={onPickFile}
          className="hidden"
        />

        <div className="flex items-center gap-2">
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Hoặc dán link YouTube..."
            className="w-56 rounded-xl border border-brand-100 px-3 py-2 text-sm outline-none focus:border-brand-400"
          />
          <button
            type="button"
            onClick={addVideo}
            className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-brand-300 px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            <Link2 className="h-4 w-4" /> Thêm link
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-brand-950/45">
        Tải video từ máy (mp4, webm, mov) hoặc dán link YouTube. Video dài nên dùng YouTube để tải trang nhanh hơn.
      </p>
      {err && <p className="mt-2 text-sm text-brand-600">{err}</p>}
    </div>
  );
}
