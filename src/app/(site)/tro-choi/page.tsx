import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, Play, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Trò chơi học tập",
  description:
    "Kho trò chơi học tập vui nhộn giúp các con luyện kỹ năng ngôn ngữ, giao tiếp và tư duy cùng Voice & Skill.",
};

export const revalidate = 60;

async function getGames() {
  try {
    return await prisma.game.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function GamesGalleryPage() {
  const games = await getGames();

  return (
    <>
      <PageHero
        eyebrow="Trò chơi học tập"
        title="Học mà chơi - Chơi mà học"
        description="Những trò chơi tương tác giúp các con luyện kỹ năng ngôn ngữ và tư duy một cách vui vẻ, hào hứng."
        crumbs={[{ label: "Trò chơi" }]}
      />

      <section className="section">
        <div className="container-x">
          {games.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-24 text-center">
              <Gamepad2 className="h-14 w-14 text-brand-200" />
              <p className="mt-5 text-lg font-semibold text-brand-900">
                Trò chơi sẽ sớm ra mắt
              </p>
              <p className="mt-1.5 max-w-md text-sm text-brand-950/55">
                Cô Duyên đang chuẩn bị những trò chơi học tập thú vị. Hãy quay lại sau nhé!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((g, i) => (
                <Reveal key={g.id} delay={i % 3}>
                  <Link
                    href={`/tro-choi/${g.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-[0_1px_0_rgba(123,30,30,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft"
                  >
                    <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-ocean-100 via-cream to-gold-100">
                      {g.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={g.thumbnail}
                          alt={g.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <Gamepad2 className="h-12 w-12 text-ocean-400 transition-transform group-hover:scale-110" />
                      )}
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ocean-700 backdrop-blur">
                        {g.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-brand-950 transition-colors group-hover:text-brand-700">
                        {g.title}
                      </h3>
                      {g.description && (
                        <p className="mt-2 line-clamp-2 flex-1 text-sm text-brand-950/60">
                          {g.description}
                        </p>
                      )}
                      <span className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-brand-800">
                        <Play className="h-4 w-4" /> Chơi ngay
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <p className="mt-12 flex items-center justify-center gap-2 text-center text-sm text-brand-950/50">
            <Sparkles className="h-4 w-4 text-gold-500" />
            Trò chơi được Cô Duyên tuyển chọn nhằm hỗ trợ việc học của các con.
          </p>
        </div>
      </section>
    </>
  );
}
