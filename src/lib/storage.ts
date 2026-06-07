import "server-only";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

export { slugify } from "./slug";

const STORAGE_ROOT = path.join(process.cwd(), "storage");

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
  return MIME[path.extname(key).toLowerCase()] ?? "application/octet-stream";
}

function resolveSafe(key: string) {
  // Ngăn path traversal
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

/** Lưu file tải lên vào storage/<subdir>/<random>.<ext>, trả về key tương đối. */
export async function saveUpload(file: File, subdir: string): Promise<string> {
  const ext = path.extname(file.name).toLowerCase().replace(/[^.a-z0-9]/g, "");
  const id = crypto.randomUUID();
  const key = path.posix.join(subdir, `${id}${ext}`);
  const full = resolveSafe(key);
  await ensureDir(path.dirname(full));
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(full, buffer);
  return key;
}

/** Lưu nội dung HTML trò chơi. */
export async function saveGameHtml(slug: string, file: File): Promise<string> {
  const key = path.posix.join("games", `${slug}.html`);
  const full = resolveSafe(key);
  await ensureDir(path.dirname(full));
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(full, buffer);
  return key;
}

export async function readStoredFile(key: string): Promise<Buffer | null> {
  try {
    const full = resolveSafe(key);
    return await fs.readFile(full);
  } catch {
    return null;
  }
}

export async function deleteStoredFile(key: string): Promise<void> {
  try {
    const full = resolveSafe(key);
    await fs.unlink(full);
  } catch {
    /* bỏ qua nếu file không tồn tại */
  }
}
