import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { readStoredFile, contentTypeFor } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { key: string[] } }
) {
  // Chỉ người đã đăng nhập mới tải được file
  const session = await getSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const key = params.key.join("/");
  const data = await readStoredFile(key);
  if (!data) {
    return new NextResponse("Not found", { status: 404 });
  }

  let contentType = contentTypeFor(key);
  // Không phục vụ HTML inline từ route này để tránh thực thi script cùng origin
  const isHtml = /text\/html/.test(contentType);
  const inlineOk = /^(image\/|application\/pdf)/.test(contentType) && !isHtml;
  if (isHtml) contentType = "text/plain; charset=utf-8";

  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": inlineOk ? "inline" : "attachment",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
