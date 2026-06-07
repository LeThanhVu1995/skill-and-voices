"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { GeneralContent, StatItem } from "@/lib/settings";

export type ContentResult = { status: "idle" | "success" | "error"; message: string };

const ok = (m: string): ContentResult => ({ status: "success", message: m });
const fail = (m: string): ContentResult => ({ status: "error", message: m });

async function saveSetting(key: string, value: object) {
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  // Làm mới toàn bộ trang (header/footer/nội dung) dùng nội dung này
  revalidatePath("/", "layout");
}

export async function saveGeneral(
  _prev: ContentResult,
  formData: FormData
): Promise<ContentResult> {
  await requireAdmin();
  const s = (k: string) => String(formData.get(k) ?? "").trim();

  const value: GeneralContent = {
    name: s("name"),
    brand: s("brand"),
    tagline: s("tagline"),
    description: s("description"),
    phone: s("phone"),
    email: s("email"),
    address: s("address"),
    addressNote: s("addressNote"),
    facebook: s("facebook"),
    zalo: s("zalo"),
    slogan: s("slogan"),
  };

  if (!value.name || !value.phone) {
    return fail("Vui lòng nhập tối thiểu Tên thương hiệu và Số điện thoại.");
  }

  try {
    await saveSetting("general", value);
    return ok("Đã lưu thông tin chung.");
  } catch (error) {
    console.error("saveGeneral error:", error);
    return fail("Không thể lưu. Hãy kiểm tra kết nối cơ sở dữ liệu.");
  }
}

export async function saveHome(
  _prev: ContentResult,
  formData: FormData
): Promise<ContentResult> {
  await requireAdmin();
  const s = (k: string) => String(formData.get(k) ?? "").trim();

  const stats: StatItem[] = [];
  for (let i = 0; i < 4; i++) {
    const value = s(`stat_value_${i}`);
    const label = s(`stat_label_${i}`);
    if (value || label) stats.push({ value, label });
  }

  // Ảnh banner: tải lên file mới, dán URL, hoặc giữ ảnh cũ
  let heroImage: string | null | undefined = undefined;
  const heroFile = formData.get("heroFile");
  const heroUrl = s("heroUrl");
  if (heroFile instanceof File && heroFile.size > 0) {
    if (/\.(png|jpe?g|gif|webp)$/i.test(heroFile.name)) {
      const { saveUpload } = await import("@/lib/storage");
      const key = await saveUpload(heroFile, "media");
      heroImage = `/media/${key.replace(/^media\//, "")}`;
    }
  } else if (heroUrl) {
    heroImage = heroUrl;
  }
  if (heroImage === undefined) {
    const existing = await prisma.siteSetting.findUnique({ where: { key: "home" } });
    if (existing && typeof existing.value === "object" && existing.value !== null) {
      heroImage = ((existing.value as Record<string, unknown>).heroImage as string | null) ?? null;
    } else {
      heroImage = null;
    }
  }

  const value = {
    heroEyebrow: s("heroEyebrow"),
    heroTitleLead: s("heroTitleLead"),
    heroTitleHighlight: s("heroTitleHighlight"),
    heroTitleRest: s("heroTitleRest"),
    heroSubtitle: s("heroSubtitle"),
    heroProof: s("heroProof"),
    heroImage,
    statsTitle: s("statsTitle"),
    stats,
  };

  if (!value.heroTitleHighlight && !value.heroTitleLead) {
    return fail("Vui lòng nhập tiêu đề trang chủ.");
  }

  try {
    await saveSetting("home", value);
    return ok("Đã lưu nội dung trang chủ.");
  } catch (error) {
    console.error("saveHome error:", error);
    return fail("Không thể lưu. Hãy kiểm tra kết nối cơ sở dữ liệu.");
  }
}

function parseArray<T>(formData: FormData, key: string): T[] {
  try {
    const raw = String(formData.get(key) ?? "[]");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

/** Tải 1 ảnh hoặc video lên, trả về URL công khai + loại media. */
export async function uploadMedia(
  formData: FormData
): Promise<{ url?: string; type?: "image" | "video"; error?: string }> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Chưa chọn tệp." };
  }
  const isImage = /\.(png|jpe?g|gif|webp)$/i.test(file.name);
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(file.name);
  if (!isImage && !isVideo) {
    return { error: "Chỉ chấp nhận ảnh (png, jpg, gif, webp) hoặc video (mp4, webm, mov)." };
  }
  try {
    const { saveUpload } = await import("@/lib/storage");
    const key = await saveUpload(file, "media");
    return { url: `/media/${key.replace(/^media\//, "")}`, type: isVideo ? "video" : "image" };
  } catch (error) {
    console.error("uploadMedia error:", error);
    return { error: "Không thể tải tệp lên." };
  }
}

export async function saveAbout(
  _prev: ContentResult,
  formData: FormData
): Promise<ContentResult> {
  await requireAdmin();
  const s = (k: string) => String(formData.get(k) ?? "").trim();

  // Handle portrait image
  let portrait: string | null | undefined = undefined;
  const portraitFile = formData.get("portraitFile");
  const portraitUrl = s("portraitUrl");
  if (portraitFile instanceof File && portraitFile.size > 0) {
    const lower = portraitFile.name.toLowerCase();
    if (/\.(png|jpe?g|gif|webp)$/.test(lower)) {
      const { saveUpload } = await import("@/lib/storage");
      const key = await saveUpload(portraitFile, "media");
      portrait = `/media/${key.replace(/^media\//, "")}`;
    }
  } else if (portraitUrl) {
    portrait = portraitUrl;
  }

  const value: Record<string, unknown> = {
    title: s("title"),
    intro: s("intro"),
    philosophy: s("philosophy"),
    highlights: parseArray<string>(formData, "highlights"),
    activities: parseArray<{ type: string; url: string; caption?: string }>(formData, "activities"),
  };
  if (portrait !== undefined) value.portrait = portrait;
  // keep existing portrait if nothing new is provided
  if (portrait === undefined) {
    const existing = await prisma.siteSetting.findUnique({ where: { key: "about" } });
    if (existing && typeof existing.value === "object" && existing.value !== null) {
      value.portrait = (existing.value as Record<string, unknown>).portrait ?? null;
    }
  }

  if (!value.title) return fail("Vui lòng nhập tiêu đề trang Giới thiệu.");
  try {
    await saveSetting("about", value);
    return ok("Đã lưu nội dung trang Giới thiệu.");
  } catch (error) {
    console.error("saveAbout error:", error);
    return fail("Không thể lưu. Kiểm tra kết nối cơ sở dữ liệu.");
  }
}

export async function savePrograms(
  _prev: ContentResult,
  formData: FormData
): Promise<ContentResult> {
  await requireAdmin();
  const s = (k: string) => String(formData.get(k) ?? "").trim();
  const splitItems = (t: string) =>
    t.split(",").map((x) => x.trim()).filter(Boolean);

  const rawSkill = parseArray<{ title: string; itemsText?: string; items?: string[] }>(
    formData,
    "skillGroups"
  );
  const rawTeaching = parseArray<{ age: string; title: string; itemsText?: string; items?: string[] }>(
    formData,
    "teaching"
  );

  const value = {
    heroTitle: s("heroTitle"),
    heroDesc: s("heroDesc"),
    skillGroups: rawSkill.map((g) => ({
      title: g.title,
      items: g.items ?? splitItems(g.itemsText ?? ""),
    })),
    teaching: rawTeaching.map((t) => ({
      age: t.age,
      title: t.title,
      items: t.items ?? splitItems(t.itemsText ?? ""),
    })),
    audiences: parseArray<{ title: string; desc: string }>(formData, "audiences"),
    outcomes: parseArray<string>(formData, "outcomes"),
    compliance: s("compliance"),
  };
  if (!value.heroTitle) return fail("Vui lòng nhập tiêu đề trang Chương trình.");
  try {
    await saveSetting("programs", value);
    return ok("Đã lưu nội dung trang Chương trình.");
  } catch (error) {
    console.error("savePrograms error:", error);
    return fail("Không thể lưu. Kiểm tra kết nối cơ sở dữ liệu.");
  }
}

export async function saveJourney(
  _prev: ContentResult,
  formData: FormData
): Promise<ContentResult> {
  await requireAdmin();
  const s = (k: string) => String(formData.get(k) ?? "").trim();
  const value = {
    heroTitle: s("heroTitle"),
    heroDesc: s("heroDesc"),
    items: parseArray<{ before: string; after: string }>(formData, "items"),
    stories: parseArray<{ name: string; grade: string; quote: string; before: string; after: string }>(
      formData,
      "stories"
    ),
    gallery: parseArray<{ type: string; url: string; caption?: string }>(formData, "gallery"),
  };
  if (!value.heroTitle) return fail("Vui lòng nhập tiêu đề trang Hành trình.");
  try {
    await saveSetting("journey", value);
    return ok("Đã lưu nội dung trang Hành trình.");
  } catch (error) {
    console.error("saveJourney error:", error);
    return fail("Không thể lưu. Kiểm tra kết nối cơ sở dữ liệu.");
  }
}

export async function saveExperience(
  _prev: ContentResult,
  formData: FormData
): Promise<ContentResult> {
  await requireAdmin();
  const s = (k: string) => String(formData.get(k) ?? "").trim();
  const value = {
    heroTitle: s("heroTitle"),
    heroDesc: s("heroDesc"),
    experiences: parseArray<{ title: string; desc: string }>(formData, "experiences"),
    gallery: parseArray<{ type: string; url: string; caption?: string }>(formData, "gallery"),
  };
  if (!value.heroTitle) return fail("Vui lòng nhập tiêu đề trang Trải nghiệm.");
  try {
    await saveSetting("experience", value);
    return ok("Đã lưu nội dung trang Trải nghiệm.");
  } catch (error) {
    console.error("saveExperience error:", error);
    return fail("Không thể lưu. Kiểm tra kết nối cơ sở dữ liệu.");
  }
}

export async function savePartner(
  _prev: ContentResult,
  formData: FormData
): Promise<ContentResult> {
  await requireAdmin();
  const s = (k: string) => String(formData.get(k) ?? "").trim();
  const value = {
    heroTitle: s("heroTitle"),
    heroDesc: s("heroDesc"),
    forms: parseArray<{ title: string; desc: string }>(formData, "forms"),
    audiences: parseArray<string>(formData, "audiences"),
    ctaTitle: s("ctaTitle"),
    ctaDesc: s("ctaDesc"),
  };
  if (!value.heroTitle) return fail("Vui lòng nhập tiêu đề trang Hợp tác.");
  try {
    await saveSetting("partner", value);
    return ok("Đã lưu nội dung trang Hợp tác.");
  } catch (error) {
    console.error("savePartner error:", error);
    return fail("Không thể lưu. Kiểm tra kết nối cơ sở dữ liệu.");
  }
}
