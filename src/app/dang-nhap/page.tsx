import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { LoginForm } from "@/components/forms/LoginForm";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Đăng nhập",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const session = await getSession();
  if (session) {
    redirect(session.role === "ADMIN" ? "/admin" : "/hoc-tap");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-radial px-5 py-12">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-gold-200/40 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          <ArrowLeft className="h-4 w-4" /> Về trang chủ
        </Link>

        <div className="rounded-[2rem] border border-brand-100 bg-white p-8 shadow-soft sm:p-10">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="mt-7 text-center text-2xl font-bold text-brand-950">
            Đăng nhập hệ thống
          </h1>
          <p className="mt-2 text-center text-sm text-brand-950/60">
            Dành cho giáo viên và học sinh Voice &amp; Skill
          </p>

          <div className="mt-7">
            <LoginForm next={searchParams.next} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-brand-950/50">
          Chưa có tài khoản học sinh? Vui lòng liên hệ Cô Duyên để được cấp.
        </p>
      </div>
    </div>
  );
}
