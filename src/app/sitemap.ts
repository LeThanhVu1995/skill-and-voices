import type { MetadataRoute } from "next";
import { fallbackPosts } from "@/lib/fallback";

const baseUrl = "https://coduyen-voiceskill.vn";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/gioi-thieu",
    "/chuong-trinh",
    "/hanh-trinh",
    "/lich-khai-giang",
    "/tro-choi",
    "/goc-phu-huynh",
    "/trai-nghiem",
    "/hop-tac",
    "/lien-he",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const posts = fallbackPosts.map((p) => ({
    url: `${baseUrl}/goc-phu-huynh/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...posts];
}
