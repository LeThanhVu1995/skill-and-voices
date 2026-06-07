import "server-only";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { put, del } from "@vercel/blob";

export { slugify } from "./slug";

const STORAGE_ROOT = path.join(process.cwd(), "storage");

/** Bật chế độ Vercel Blob khi có token (production), ngược lại dùng ổ đĩa (local/VPS). */
function useBlob() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ogg": "video/ogg",
  ".mov": "video/quicktime",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".txt": "text/plain; charset=utf-8",
  ".zip": "application/zip",
};

export function contentTypeFor(key: string) {
  return MIME[path.extname(key.split("?")[0]).toLowerCase()] ?? "application/octet-stream";
}

function resolveSafe(key: string) {
  const target = path.join(STORAGE_ROOT, key);
  const normalized = path.normalize(target);
  if (!normalized.startsWith(STORAGE_ROOT)) {
    throw new Error("Đường dẫn không hợp lệ");
  }
  return normalized;
}

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

/** URL phục vụ cho file lưu cục bộ tùy theo nhóm. */
function localUrl(subdir: string, filename: string): string {
  if (subdir === "media") return `/media/${filename}`;
  return `/api/files/${subdir}/${filename}`;
}

/**
 * Lưu file tải lên. Trả về URL công khai dùng trực tiếp (img src / a href):
 * - Vercel Blob: URL tuyệt đối https://...
 * - Cục bộ: /media/... hoặc /api/files/...
 */
export async function saveUpload(file: File, subdir: string): Promise<string> {
  const ext = path.extname(file.name).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const id = crypto.randomUUID();
  const filename = `${id}${ext}`;
  if (useBlob()) {
    const blob = await put(`${subdir}/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: contentTypeFor(filename),
    });
    return blob.url;
  }
  const key = path.posix.join(subdir, filename);
  const full = resolveSafe(key);
  await ensureDir(path.dirname(full));
  await fs.writeFile(full, Buffer.from(await file.arrayBuffer()));
  return localUrl(subdir, filename);
}

/**
 * Lưu HTML trò chơi. Trả về "filePath" lưu trong DB:
 * - Vercel Blob: URL tuyệt đối
 * - Cục bộ: key "games/<slug>.html" (route /play đọc file)
 */
export async function saveGameHtml(slug: string, file: File): Promise<string> {
  if (useBlob()) {
    const blob = await put(`games/${slug}.html`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: "text/html; charset=utf-8",
    });
    return blob.url;
  }
  const key = path.posix.join("games", `${slug}.html`);
  const full = resolveSafe(key);
  await ensureDir(path.dirname(full));
  await fs.writeFile(full, Buffer.from(await file.arrayBuffer()));
  return key;
}

/** Đọc nội dung file: hỗ trợ cả key cục bộ lẫn URL tuyệt đối (Blob). */
export async function readStoredFile(keyOrUrl: string): Promise<Buffer | null> {
  try {
    if (/^https?:\/\//i.test(keyOrUrl)) {
      const res = await fetch(keyOrUrl);
      if (!res.ok) return null;
      return Buffer.from(await res.arrayBuffer());
    }
    const full = resolveSafe(keyOrUrl);
    return await fs.readFile(full);
  } catch {
    return null;
  }
}

/** Xóa file: nhận URL Blob, đường dẫn /media//api/files, hoặc key cục bộ. */
export async function deleteStoredFile(value: string): Promise<void> {
  if (!value) return;
  try {
    if (/^https?:\/\//i.test(value)) {
      if (useBlob()) await del(value);
      return;
    }
    let key = value;
    if (key.startsWith("/media/")) key = "media/" + key.slice("/media/".length);
    else if (key.startsWith("/api/files/")) key = key.slice("/api/files/".length);
    else if (key.startsWith("/")) key = key.slice(1);
    const full = resolveSafe(key);
    await fs.unlink(full);
  } catch {
    /* bỏ qua nếu file không tồn tại */
  }
}
