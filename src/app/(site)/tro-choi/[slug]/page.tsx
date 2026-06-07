import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Maximize2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getGame(slug: string) {
  try {
    return await prisma.game.findFirst({ where: { slug, published: true } });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const game = await getGame(params.slug);
  if (!game) return { title: "Không tìm thấy trò chơi" };
  return { title: game.title, description: game.description ?? undefined };
}

export default async function GamePlayPage({
  params,
}: {
  params: { slug: string };
}) {
  const game = await getGame(params.slug);
  if (!game) notFound();

  return (
    <section className="section">
      <div className="container-x">
        <Link
          href="/tro-choi"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          <ArrowLeft className="h-4 w-4" /> Tất cả trò chơi
        </Link>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-ocean-600">
              {game.category}
            </span>
            <h1 className="mt-1 text-3xl font-bold text-brand-950">{game.title}</h1>
            {game.description && (
              <p className="mt-2 max-w-2xl text-brand-950/60">{game.description}</p>
            )}
          </div>
          <a
            href={`/tro-choi/${game.slug}/play`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Maximize2 className="h-4 w-4" /> Toàn màn hình
          </a>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-soft">
          <div className="flex items-center gap-1.5 border-b border-brand-50 bg-brand-50/40 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-brand-300" />
            <span className="h-3 w-3 rounded-full bg-gold-300" />
            <span className="h-3 w-3 rounded-full bg-ocean-300" />
            <span className="ml-3 text-xs font-medium text-brand-950/50">
              {game.title}
            </span>
          </div>
          <iframe
            src={`/tro-choi/${game.slug}/play`}
            title={game.title}
            sandbox="allow-scripts allow-pointer-lock allow-popups"
            className="h-[70vh] w-full bg-white"
            loading="lazy"
          />
        </div>

        <p className="mt-4 text-center text-xs text-brand-950/45">
          Trò chơi chạy trong môi trường an toàn (sandbox). Nếu không hiển thị, hãy thử mở toàn màn hình.
        </p>
      </div>
    </section>
  );
}
