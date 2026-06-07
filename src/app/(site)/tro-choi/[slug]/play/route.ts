import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { readStoredFile } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  let game;
  try {
    game = await prisma.game.findFirst({
      where: { slug: params.slug, published: true },
    });
  } catch {
    return new NextResponse("Lỗi cơ sở dữ liệu", { status: 500 });
  }
  if (!game) return new NextResponse("Không tìm thấy trò chơi", { status: 404 });

  const data = await readStoredFile(game.filePath);
  if (!data) return new NextResponse("Không tìm thấy file trò chơi", { status: 404 });

  // tăng lượt chơi (không chặn nếu lỗi)
  prisma.game
    .update({ where: { id: game.id }, data: { plays: { increment: 1 } } })
    .catch(() => {});

  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Chỉ cho phép chính website này nhúng trò chơi
      "Content-Security-Policy": "frame-ancestors 'self'",
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
