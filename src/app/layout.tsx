import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coduyen-voiceskill.vn"),
  title: {
    default: `${site.name} - ${site.brand} | ${site.tagline}`,
    template: `%s | ${site.name} - ${site.brand}`,
  },
  description: site.description,
  keywords: [
    "Cô Duyên",
    "Voice & Skill",
    "kỹ năng thuyết trình",
    "luyện giọng cho trẻ",
    "kỹ năng giao tiếp tiểu học",
    "phát triển sự tự tin cho trẻ",
  ],
  openGraph: {
    title: `${site.name} - ${site.brand}`,
    description: site.description,
    type: "website",
    locale: "vi_VN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${playfair.variable} ${dancing.variable}`}
    >
      <body className="min-h-screen bg-cream font-sans">{children}</body>
    </html>
  );
}
