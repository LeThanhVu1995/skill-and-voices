import Link from "next/link";
import {
  MessageSquareText,
  Handshake,
  ClipboardList,
  Users,
  Gamepad2,
  FileText,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

async function getStats() {
  try {
    const [newConsult, newPartner, assignments, students, games, pendingGrading, posts] =
      await Promise.all([
        prisma.consultation.count({ where: { status: "NEW" } }),
        prisma.partnership.count({ where: { status: "NEW" } }),
        prisma.assignment.count(),
        prisma.user.count({ where: { role: "STUDENT" } }),
        prisma.game.count(),
        prisma.submission.count({ where: { status: "SUBMITTED" } }),
        prisma.post.count(),
      ]);
    return { newConsult, newPartner, assignments, students, games, pendingGrading, posts, ok: true };
  } catch {
    return {
      newConsult: 0,
      newPartner: 0,
      assignments: 0,
      students: 0,
      games: 0,
      pendingGrading: 0,
      posts: 0,
      ok: false,
    };
  }
}

export default async function AdminDashboard() {
  const s = await getStats();

  const cards = [
    { label: "Đăng ký tư vấn mới", value: s.newConsult, icon: MessageSquareText, href: "/admin/tu-van", accent: "bg-brand-50 text-brand-700" },
    { label: "Yêu cầu hợp tác mới", value: s.newPartner, icon: Handshake, href: "/admin/hop-tac", accent: "bg-gold-50 text-gold-600" },
    { label: "Bài chờ phê bình", value: s.pendingGrading, icon: ClipboardList, href: "/admin/bai-tap", accent: "bg-ocean-50 text-ocean-600" },
    { label: "Tổng bài tập", value: s.assignments, icon: ClipboardList, href: "/admin/bai-tap", accent: "bg-brand-50 text-brand-700" },
    { label: "Bài viết", value: s.posts, icon: FileText, href: "/admin/bai-viet", accent: "bg-gold-50 text-gold-600" },
    { label: "Học sinh", value: s.students, icon: Users, href: "/admin/hoc-sinh", accent: "bg-brand-50 text-brand-700" },
    { label: "Trò chơi", value: s.games, icon: Gamepad2, href: "/admin/tro-choi", accent: "bg-ocean-50 text-ocean-600" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-950">Tổng quan</h1>
        <p className="mt-1.5 text-brand-950/60">
          Chào mừng trở lại! Đây là tình hình hoạt động của Voice &amp; Skill.
        </p>
      </div>

      {!s.ok && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-4 text-sm text-gold-800">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            Chưa kết nối được cơ sở dữ liệu. Hãy kiểm tra <code>DATABASE_URL</code> và chạy{" "}
            <code>npm run db:push</code> để bắt đầu sử dụng đầy đủ tính năng.
          </p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-3xl border border-brand-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.accent}`}>
                <c.icon className="h-6 w-6" />
              </span>
              <ArrowRight className="h-5 w-5 text-brand-200 transition-colors group-hover:text-brand-500" />
            </div>
            <p className="mt-5 text-3xl font-bold text-brand-950">{c.value}</p>
            <p className="mt-1 text-sm text-brand-950/60">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <QuickAction
          href="/admin/bai-tap"
          title="Đăng bài tập mới"
          desc="Tạo bài tập và giao cho học sinh theo lớp."
        />
        <QuickAction
          href="/admin/tro-choi"
          title="Tải lên trò chơi"
          desc="Thêm trò chơi học tập từ file HTML có sẵn."
        />
      </div>
    </div>
  );
}

function QuickAction({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-4 rounded-3xl border border-dashed border-brand-200 bg-white p-6 transition-colors hover:border-brand-400 hover:bg-brand-50/40"
    >
      <div>
        <p className="font-semibold text-brand-900">{title}</p>
        <p className="mt-1 text-sm text-brand-950/60">{desc}</p>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-brand-400" />
    </Link>
  );
}
