"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquareText,
  Handshake,
  ClipboardList,
  Users,
  Gamepad2,
  FileText,
  Settings2,
  CalendarDays,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";
import { logout } from "@/app/auth-actions";

const links = [
  { href: "/admin", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/admin/noi-dung", label: "Nội dung trang", icon: Settings2 },
  { href: "/admin/tu-van", label: "Đăng ký tư vấn", icon: MessageSquareText },
  { href: "/admin/hop-tac", label: "Yêu cầu hợp tác", icon: Handshake },
  { href: "/admin/lich-hoc", label: "Lịch khai giảng", icon: CalendarDays },
  { href: "/admin/bai-tap", label: "Bài tập", icon: ClipboardList },
  { href: "/admin/bai-viet", label: "Bài viết", icon: FileText },
  { href: "/admin/hoc-sinh", label: "Học sinh", icon: Users },
  { href: "/admin/tro-choi", label: "Trò chơi", icon: Gamepad2 },
];

export function AdminSidebar({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <nav className="flex flex-col gap-1">
      {links.map((l) => {
        const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
              active
                ? "bg-brand-700 text-white shadow-soft"
                : "text-cream/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <l.icon className="h-5 w-5" />
            {l.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-brand-100 bg-white px-5 py-3 lg:hidden">
        <span className="font-script text-2xl text-brand-700">Cô Duyên</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-100 text-brand-700"
          aria-label="Mở menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-72 flex-col bg-brand-950 p-5">
            <div className="flex items-center justify-between">
              <span className="font-script text-2xl text-gold-200">Cô Duyên</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-cream/70"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex-1 overflow-y-auto">
              <NavLinks />
            </div>
            <SidebarFooter name={name} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-brand-950 p-6 lg:flex">
        <div>
          <span className="font-script text-3xl text-gold-200">Cô Duyên</span>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/50">
            Trang quản trị
          </p>
        </div>
        <div className="mt-8 flex-1 overflow-y-auto">
          <NavLinks />
        </div>
        <SidebarFooter name={name} />
      </aside>
    </>
  );
}

function SidebarFooter({ name }: { name: string }) {
  return (
    <div className="mt-6 border-t border-white/10 pt-5">
      <div className="flex items-center gap-3 px-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-shine font-display font-bold text-brand-900">
          {name.charAt(0)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-cream/50">Giáo viên</p>
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-cream/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Home className="h-4 w-4" /> Xem website
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-cream/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Đăng xuất
          </button>
        </form>
      </div>
    </div>
  );
}
