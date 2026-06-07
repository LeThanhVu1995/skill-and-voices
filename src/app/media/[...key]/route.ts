import { NextResponse, type NextRequest } from "next/server";
import { readStoredFile, contentTypeFor } from "@/lib/storage";

export const dynamic = "force-dynamic";

// Phục vụ công khai ảnh bìa bài viết (chỉ cho phép định dạng ảnh)
export async function GET(
  _req: NextRequest,
  { params }: { params: { key: string[] } }
) {
  const key = ["media", ...params.key].join("/");
  const contentType = contentTypeFor(key);
  if (!contentType.startsWith("image/") && !contentType.startsWith("video/")) {
    return new NextResponse("Not allowed", { status: 403 });
  }

  const data = await readStoredFile(key);
  if (!data) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400, immutable",
      "X-Content-Type-Options": "nosniff",
      "Accept-Ranges": "bytes",
    },
  });
}
