import { Camera, PlayCircle } from "lucide-react";
import type { MediaItem } from "@/lib/settings";

function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}
function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

function VideoEmbed({ url, caption }: { url: string; caption?: string }) {
  const yt = youtubeId(url);
  const vm = vimeoId(url);
  const isFile = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

  if (yt) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${yt}`}
        title={caption || "Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }
  if (vm) {
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vm}`}
        title={caption || "Video"}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    );
  }
  if (isFile) {
    return <video src={url} controls className="h-full w-full bg-black object-contain" />;
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand-600"
    >
      <PlayCircle className="h-10 w-10" />
      <span className="text-sm font-medium">Xem video</span>
    </a>
  );
}

export function MediaGallery({ items }: { items: MediaItem[] }) {
  if (!items.length) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((m, i) => (
        <figure
          key={i}
          className="group overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-100 via-cream to-gold-100"
        >
          <div className="relative aspect-[4/3]">
            {m.type === "video" && m.url ? (
              <VideoEmbed url={m.url} caption={m.caption} />
            ) : m.type === "image" && m.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={m.url}
                alt={m.caption || ""}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-brand-600">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft">
                  <Camera className="h-6 w-6" />
                </span>
                {m.caption && <span className="px-3 text-center text-sm font-semibold text-brand-900">{m.caption}</span>}
              </div>
            )}
          </div>
          {m.caption && m.url && (
            <figcaption className="border-t border-brand-50 bg-white px-4 py-2.5 text-center text-sm font-medium text-brand-800">
              {m.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
