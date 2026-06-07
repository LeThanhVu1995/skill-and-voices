import { cache } from "react";
import { prisma } from "./prisma";
import { site } from "./site";
import {
  stats as defaultStats,
  programGroups,
  teachingContent,
  audiences as defaultAudiences,
  experiences as defaultExperiences,
  journeyItems,
  aboutHighlights,
  philosophy,
  complianceNote,
  partnerForms as defaultPartnerForms,
  partnerAudiences as defaultPartnerAudiences,
} from "./content";

export type GeneralContent = {
  name: string;
  brand: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  addressNote: string;
  facebook: string;
  zalo: string;
  slogan: string;
};

export type StatItem = { value: string; label: string };

export type HomeContent = {
  heroEyebrow: string;
  heroTitleLead: string;
  heroTitleHighlight: string;
  heroTitleRest: string;
  heroSubtitle: string;
  heroProof: string;
  heroImage: string | null;
  statsTitle: string;
  stats: StatItem[];
};

export type AboutContent = {
  title: string;
  intro: string;
  philosophy: string;
  highlights: string[];
  activities: MediaItem[];
  portrait: string | null;
};

export type SkillGroup = { title: string; items: string[] };
export type AgeGroup = { age: string; title: string; items: string[] };
export type AudienceItem = { title: string; desc: string };

export type ProgramsContent = {
  heroTitle: string;
  heroDesc: string;
  skillGroups: SkillGroup[];
  teaching: AgeGroup[];
  audiences: AudienceItem[];
  outcomes: string[];
  compliance: string;
};

export type JourneyItem = { before: string; after: string };
export type Story = { name: string; grade: string; quote: string; before: string; after: string };

export type JourneyContent = {
  heroTitle: string;
  heroDesc: string;
  items: JourneyItem[];
  stories: Story[];
  gallery: MediaItem[];
};

export type ExperienceItem = { title: string; desc: string };

export type MediaItem = { type: "image" | "video"; url: string; caption?: string };

export type ExperienceContent = {
  heroTitle: string;
  heroDesc: string;
  experiences: ExperienceItem[];
  gallery: MediaItem[];
};

export type PartnerFormItem = { title: string; desc: string };

export type PartnerContent = {
  heroTitle: string;
  heroDesc: string;
  forms: PartnerFormItem[];
  audiences: string[];
  ctaTitle: string;
  ctaDesc: string;
};

export type SiteContent = {
  general: GeneralContent;
  home: HomeContent;
  about: AboutContent;
  programs: ProgramsContent;
  journey: JourneyContent;
  experience: ExperienceContent;
  partner: PartnerContent;
};

export const defaultContent: SiteContent = {
  general: {
    name: site.name,
    brand: site.brand,
    tagline: site.tagline,
    description: site.description,
    phone: site.phone,
    email: site.email,
    address: site.address,
    addressNote: site.addressNote,
    facebook: site.facebook,
    zalo: site.zalo,
    slogan: site.slogan,
  },
  home: {
    heroEyebrow: "Cô Duyên · Voice & Skill",
    heroTitleLead: "Giúp trẻ",
    heroTitleHighlight: "tự tin giao tiếp",
    heroTitleRest: ", thuyết trình mạch lạc & phát triển tư duy",
    heroSubtitle:
      "Đồng hành cùng phụ huynh xây dựng sự tự tin, khả năng diễn đạt và phương pháp học tập cho trẻ từ mầm non, tiền tiểu học đến THCS. Lớp nhỏ 5–8 em hoặc kèm 1 - 1 (online & trực tiếp).",
    heroProof: "1.200+ học sinh đã tự tin hơn cùng Cô Duyên",
    heroImage: null,
    statsTitle: "Thành quả của các con",
    stats: defaultStats.map((s) => ({ value: s.value, label: s.label })),
  },
  about: {
    title: "Người đồng hành cùng sự trưởng thành của trẻ",
    intro:
      "Là giáo viên Tiểu học, Cô Duyên chuyên đào tạo kỹ năng thuyết trình, giao tiếp và luyện giọng, đồng thời tư vấn tâm lý và đồng hành cùng phụ huynh giúp các con từ mầm non, tiền tiểu học đến THCS tự tin thể hiện bản thân và xây dựng thói quen học tập tích cực.",
    philosophy,
    highlights: [...aboutHighlights],
    activities: [
      { type: "image", url: "", caption: "Dạy học" },
      { type: "image", url: "", caption: "Tổ chức hoạt động" },
      { type: "image", url: "", caption: "Chuyên đề kỹ năng" },
      { type: "image", url: "", caption: "Sinh hoạt câu lạc bộ" },
    ] as MediaItem[],
    portrait: null,
  },
  programs: {
    heroTitle: "Phát triển kỹ năng & đồng hành học tập cùng con",
    heroDesc:
      "Tập trung vào kỹ năng thuyết trình, giao tiếp, tự tin và phương pháp học tập cho trẻ từ mầm non, tiền tiểu học đến THCS.",
    skillGroups: programGroups.map((g) => ({ title: g.title, items: [...g.items] })),
    teaching: teachingContent.map((t) => ({ age: t.age, title: t.title, items: [...t.items] })),
    audiences: defaultAudiences.map((a) => ({ title: a.title, desc: a.desc })),
    outcomes: [
      "Phát âm rõ ràng, nói đủ ý và mạch lạc",
      "Tự tin trình bày trước lớp và đám đông",
      "Biết lắng nghe, phản biện và bảo vệ quan điểm",
      "Hình thành thói quen đọc hiểu và tự học hiệu quả",
    ],
    compliance: complianceNote,
  },
  journey: {
    heroTitle: "Những bước tiến nhỏ - Những thay đổi lớn",
    heroDesc:
      "Mỗi học sinh là một câu chuyện riêng. Hãy cùng nhìn lại hành trình các con đã trưởng thành từng ngày.",
    items: journeyItems.map((j) => ({ before: j.before, after: j.after })),
    stories: [
      {
        name: "Bé Minh Anh",
        grade: "Lớp 3",
        quote: "Con không còn sợ khi đứng trước lớp nữa. Con thích được kể chuyện cho các bạn nghe!",
        before: "Rụt rè, hay cúi mặt khi nói",
        after: "Chủ động thuyết trình trước lớp",
      },
      {
        name: "Bé Bảo Nam",
        grade: "Lớp 5",
        quote: "Con biết cách sắp xếp ý để nói cho rõ ràng, các bạn hiểu con muốn nói gì.",
        before: "Nói nhỏ, diễn đạt lủng củng",
        after: "Trình bày mạch lạc, rõ ý",
      },
      {
        name: "Bé Khánh Vy",
        grade: "Lớp 2",
        quote: "Con vui lắm vì được làm quen nhiều bạn mới và dám giơ tay phát biểu.",
        before: "Ngại giao tiếp, ít bạn bè",
        after: "Hòa đồng, tích cực tham gia",
      },
    ],
    gallery: [] as MediaItem[],
  },
  experience: {
    heroTitle: "Học qua trải nghiệm - Trưởng thành qua thực hành",
    heroDesc:
      "Kiến thức trở nên sống động khi các con được trực tiếp tham gia, khám phá và thể hiện bản thân.",
    experiences: defaultExperiences.map((e) => ({ title: e.title, desc: e.desc })),
    gallery: [
      { type: "image", url: "", caption: "Dã ngoại mùa hè" },
      { type: "image", url: "", caption: "Tham quan bảo tàng" },
      { type: "image", url: "", caption: "Hoạt động nhóm" },
      { type: "image", url: "", caption: "Sân khấu kể chuyện" },
      { type: "image", url: "", caption: "Ngày hội kỹ năng" },
      { type: "image", url: "", caption: "Thuyết trình thực tế" },
    ] as MediaItem[],
  },
  partner: {
    heroTitle: "Kết nối và đồng hành cùng nhà trường",
    heroDesc:
      "Voice & Skill sẵn sàng hợp tác với các trường học và đơn vị giáo dục để mang kỹ năng đến gần hơn với học sinh.",
    forms: defaultPartnerForms.map((f) => ({ title: f.title, desc: f.desc })),
    audiences: defaultPartnerAudiences.map((a) => a.label),
    ctaTitle: "Gửi yêu cầu hợp tác cùng Voice & Skill",
    ctaDesc: "Để lại thông tin, chúng tôi sẽ liên hệ để trao đổi phương án phù hợp.",
  },
};

function mergeGroup<T>(fallback: T, override: unknown): T {
  if (override && typeof override === "object") {
    return { ...fallback, ...(override as Partial<T>) };
  }
  return fallback;
}

/** Chuẩn hóa danh sách media: chấp nhận cả dữ liệu cũ dạng chuỗi. */
function normalizeMedia(value: unknown): MediaItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((m): MediaItem | null => {
      if (typeof m === "string") return { type: "image", url: "", caption: m };
      if (m && typeof m === "object") {
        const o = m as Record<string, unknown>;
        return {
          type: o.type === "video" ? "video" : "image",
          url: typeof o.url === "string" ? o.url : "",
          caption: typeof o.caption === "string" ? o.caption : "",
        };
      }
      return null;
    })
    .filter((x): x is MediaItem => x !== null);
}

const KEYS = ["general", "home", "about", "programs", "journey", "experience", "partner"] as const;

/** Lấy toàn bộ nội dung trang (DB ghi đè lên mặc định). Cache theo từng request. */
export const getContent = cache(async (): Promise<SiteContent> => {
  try {
    const rows = await prisma.siteSetting.findMany({ where: { key: { in: [...KEYS] } } });
    const map = new Map(rows.map((r) => [r.key, r.value]));
    return {
      general: mergeGroup(defaultContent.general, map.get("general")),
      home: mergeGroup(defaultContent.home, map.get("home")),
      about: normalizeAbout(mergeGroup(defaultContent.about, map.get("about"))),
      programs: mergeGroup(defaultContent.programs, map.get("programs")),
      journey: normalizeJourney(mergeGroup(defaultContent.journey, map.get("journey"))),
      experience: normalizeExperience(mergeGroup(defaultContent.experience, map.get("experience"))),
      partner: mergeGroup(defaultContent.partner, map.get("partner")),
    };
  } catch {
    return defaultContent;
  }
});

function normalizeExperience(e: ExperienceContent): ExperienceContent {
  return { ...e, gallery: normalizeMedia(e.gallery) };
}

function normalizeAbout(a: AboutContent): AboutContent {
  return { ...a, activities: normalizeMedia(a.activities) };
}

function normalizeJourney(j: JourneyContent): JourneyContent {
  return { ...j, gallery: normalizeMedia(j.gallery) };
}
