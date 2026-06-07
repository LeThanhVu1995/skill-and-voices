import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, Home, LogOut, GraduationCap } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { requireUser } from "@/lib/auth";
import { logout } from "@/app/auth-actions";

export const metadata: Metadata = {
  title: "Khu vực học tập",
  robots: { index: false, follow: false },
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-brand-50/30">
      <header className="sticky top-0 z-40 border-b border-brand-100 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-5xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Logo />
          <div className="flex items-center gap-2">
            <Link href="/tro-choi" className="hidden btn-outline sm:inline-flex">
              <Gamepad2 className="h-4 w-4" /> Trò chơi
            </Link>
            <Link href="/" className="hidden btn-outline sm:inline-flex">
              <Home className="h-4 w-4" /> Trang chủ
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-brand-100 bg-white px-2 py-1.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                {user.name.charAt(0)}
              </span>
              <span className="hidden pr-1 text-sm font-semibold text-brand-900 sm:block">
                {user.name}
              </span>
              <form action={logout}>
                <button
                  type="submit"
                  aria-label="Đăng xuất"
                  title="Đăng xuất"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-brand-600 hover:bg-brand-50"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:py-10">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-cream">
            <GraduationCap className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm text-brand-950/55">Xin chào{user.grade ? ` · ${user.grade}` : ""},</p>
            <p className="text-lg font-bold text-brand-950">{user.name}</p>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
