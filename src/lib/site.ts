export const site = {
  name: "Cô Duyên",
  brand: "Voice & Skill",
  tagline: "Kỹ năng thuyết trình & Giao tiếp tự tin",
  description:
    "Đồng hành cùng phụ huynh xây dựng sự tự tin, khả năng thuyết trình và phương pháp học tập cho trẻ từ mầm non, tiền tiểu học đến THCS.",
  phone: "0776 116 918",
  email: "huynhduyen18813@gmail.com",
  address: "179 Lò Siêu, P. Bình Thới, TP.HCM",
  addressNote: "Lớp học VOICE AND SKILL",
  facebook: "https://www.facebook.com/share/17TBcN89s7/",
  zalo: "https://zalo.me/0776116918",
  youtube: "",
  modes: ["Học trực tiếp tại lớp (5–8 em/ca)", "Kèm 1 - 1 Online", "Kèm 1 - 1 tại nhà"],
  slogan: "Tự tin hôm nay - Tỏa sáng ngày mai",
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Chương trình", href: "/chuong-trinh" },
  { label: "Lịch khai giảng", href: "/lich-khai-giang" },
  { label: "Hành trình", href: "/hanh-trinh" },
  { label: "Trải nghiệm", href: "/trai-nghiem" },
  { label: "Trò chơi", href: "/tro-choi" },
  { label: "Góc phụ huynh", href: "/goc-phu-huynh" },
  { label: "Hợp tác", href: "/hop-tac" },
];

/** Danh sách đầy đủ dùng ở chân trang (gồm cả Hành trình, Trải nghiệm). */
export const footerLinks: NavItem[] = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Chương trình", href: "/chuong-trinh" },
  { label: "Lịch khai giảng", href: "/lich-khai-giang" },
  { label: "Hành trình", href: "/hanh-trinh" },
  { label: "Trò chơi", href: "/tro-choi" },
  { label: "Trải nghiệm", href: "/trai-nghiem" },
  { label: "Góc phụ huynh", href: "/goc-phu-huynh" },
  { label: "Hợp tác", href: "/hop-tac" },
];
