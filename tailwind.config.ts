import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Đỏ đô - màu chủ đạo
        brand: {
          50: "#fdf3f3",
          100: "#fce4e4",
          200: "#facdcd",
          300: "#f5a8a8",
          400: "#ed7474",
          500: "#e04747",
          600: "#cc2b2b",
          700: "#ab2020",
          800: "#8e1f1f",
          900: "#7a1e1e",
          950: "#420c0c",
        },
        // Vàng ánh kim - điểm nhấn
        gold: {
          50: "#fbf8ef",
          100: "#f6edcf",
          200: "#ecd99c",
          300: "#e2c069",
          400: "#daab45",
          500: "#c9912f",
          600: "#b17126",
          700: "#925322",
          800: "#794321",
          900: "#67381f",
          950: "#3b1d0e",
        },
        // Xanh dương - màu phụ từ logo
        ocean: {
          50: "#eff7ff",
          100: "#dbedfe",
          200: "#bfe0fe",
          300: "#93cdfd",
          400: "#60b0fa",
          500: "#3b90f6",
          600: "#2572eb",
          700: "#1d5bd8",
          800: "#1e4baf",
          900: "#1e418a",
          950: "#172a54",
        },
        cream: "#fff9f2",
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-dancing)", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(123, 30, 30, 0.18)",
        gold: "0 10px 40px -12px rgba(201, 145, 47, 0.45)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(120% 120% at 80% 0%, rgba(224,71,71,0.10) 0%, rgba(255,249,242,0) 55%)",
        "gold-shine":
          "linear-gradient(120deg, #e2c069 0%, #f6edcf 45%, #c9912f 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        brand: {
          css: {
            "--tw-prose-body": theme("colors.brand.950 / 0.82"),
            "--tw-prose-headings": theme("colors.brand.950"),
            "--tw-prose-lead": theme("colors.brand.950 / 0.7"),
            "--tw-prose-links": theme("colors.brand.700"),
            "--tw-prose-bold": theme("colors.brand.900"),
            "--tw-prose-counters": theme("colors.gold.600"),
            "--tw-prose-bullets": theme("colors.brand.400"),
            "--tw-prose-hr": theme("colors.brand.100"),
            "--tw-prose-quotes": theme("colors.brand.800"),
            "--tw-prose-quote-borders": theme("colors.gold.400"),
            "--tw-prose-captions": theme("colors.brand.950 / 0.55"),
            "--tw-prose-code": theme("colors.brand.800"),
            "--tw-prose-pre-bg": theme("colors.brand.950"),
            "--tw-prose-th-borders": theme("colors.brand.200"),
            "--tw-prose-td-borders": theme("colors.brand.100"),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
