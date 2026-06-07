import Link from "next/link";
import { Gamepad2, Eye, EyeOff, Trash2, ExternalLink, PlaySquare } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { UploadGameForm } from "@/components/admin/UploadGameForm";
import { GameThumbForm } from "@/components/admin/GameThumbForm";
import { toggleGamePublished, deleteGame } from "../actions";

async function getData() {
  try {
    return await prisma.game.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function GamesAdminPage() {
  const games = await getData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-950">Trò chơi</h1>
        <p className="mt-1.5 text-brand-950/60">
          Tải lên và quản lý trò chơi học tập ({games.length}).
        </p>
      </div>

      <div className="mb-8">
        <UploadGameForm />
      </div>

      {games.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-20 text-center">
          <Gamepad2 className="h-12 w-12 text-brand-200" />
          <p className="mt-4 font-semibold text-brand-900">Chưa có trò chơi nào</p>
          <p className="mt-1 text-sm text-brand-950/55">Tải lên file HTML để thêm trò chơi.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <div key={g.id} className="flex flex-col rounded-3xl border border-brand-100 bg-white p-5">
              <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-ocean-100 via-cream to-gold-100">
                {g.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={g.thumbnail} alt={g.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Gamepad2 className="h-10 w-10 text-ocean-400" />
                  </div>
                )}
                {!g.published && (
                  <span className="absolute right-2 top-2 rounded-full bg-brand-950/10 px-2.5 py-0.5 text-xs font-semibold text-brand-950/60 backdrop-blur">
                    Đã ẩn
                  </span>
                )}
              </div>
              <h3 className="font-bold text-brand-950">{g.title}</h3>
              <p className="text-xs font-semibold text-ocean-600">{g.category}</p>
              {g.description && (
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-brand-950/60">{g.description}</p>
              )}
              <p className="mt-2 flex items-center gap-1.5 text-xs text-brand-950/45">
                <PlaySquare className="h-3.5 w-3.5" /> {g.plays} lượt chơi
              </p>

              <div className="mt-4 flex items-center gap-2 border-t border-brand-50 pt-4">
                <Link
                  href={`/tro-choi/${g.slug}`}
                  target="_blank"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-100 px-3 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-50"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Chơi thử
                </Link>
                <GameThumbForm id={g.id} />
                <form action={toggleGamePublished}>
                  <input type="hidden" name="id" value={g.id} />
                  <button
                    type="submit"
                    title={g.published ? "Ẩn" : "Hiện"}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-700 hover:bg-brand-50"
                  >
                    {g.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </form>
                <form action={deleteGame}>
                  <input type="hidden" name="id" value={g.id} />
                  <button
                    type="submit"
                    title="Xóa"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-500 hover:bg-brand-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
