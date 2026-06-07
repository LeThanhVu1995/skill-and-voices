"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, LogIn, LayoutDashboard, GraduationCap, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { navItems } from "@/lib/site";
import { logout } from "@/app/auth-actions";

type HeaderUser = { name: string; role: "ADMIN" | "STUDENT" } | null;
type Brand = { name: string; brand: string };

export function Header({
  user = null,
  brand,
}: {
  user?: HeaderUser;
  brand?: Brand;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const dashHref = user?.role === "ADMIN" ? "/admin" : "/hoc-tap";
  const dashLabel = user?.role === "ADMIN" ? "Quản trị" : "Khu vực học tập";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-brand-100/70 bg-cream/85 backdrop-blur-md shadow-[0_4px_24px_-12px_rgba(123,30,30,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Logo name={brand?.name} brand={brand?.brand} />

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors ${
                  active ? "text-brand-700" : "text-brand-950/70 hover:text-brand-700"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-gold-shine" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 xl:flex">
          {user ? (
            <>
              <Link href={dashHref} className="btn-outline">
                {user.role === "ADMIN" ? (
                  <LayoutDashboard className="h-4 w-4" />
                ) : (
                  <GraduationCap className="h-4 w-4" />
                )}
                {dashLabel}
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-700 transition-colors hover:bg-brand-50"
                  aria-label="Đăng xuất"
                  title="Đăng xuất"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/dang-nhap" className="btn-outline">
                <LogIn className="h-4 w-4" /> Đăng nhập
              </Link>
              <Link href="/lien-he" className="btn-gold">
                Đăng ký tư vấn
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-700 xl:hidden"
          aria-label="Mở menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden">
          <div className="container-x animate-fade-up pb-6">
            <div className="rounded-3xl border border-brand-100 bg-white p-4 shadow-soft">
              <nav className="flex flex-col">
                {navItems.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        active ? "bg-brand-50 text-brand-700" : "text-brand-950/70 hover:bg-cream"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-3 grid gap-2">
                {user ? (
                  <>
                    <Link href={dashHref} className="btn-primary w-full">
                      {dashLabel}
                    </Link>
                    <form action={logout}>
                      <button type="submit" className="btn-outline w-full">
                        <LogOut className="h-4 w-4" /> Đăng xuất
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link href="/dang-nhap" className="btn-primary w-full">
                      <LogIn className="h-4 w-4" /> Đăng nhập
                    </Link>
                    <Link href="/lien-he" className="btn-gold w-full">
                      Đăng ký tư vấn miễn phí
                    </Link>
                    <a href="tel:0123456789" className="btn-outline w-full">
                      <Phone className="h-4 w-4" /> Gọi ngay
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
