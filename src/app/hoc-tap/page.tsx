import Link from "next/link";
import { ClipboardList, CheckCircle2, Clock, Star, ArrowRight, Gamepad2, AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

function fmt(d: Date | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

async function getAssignments(studentId: string, grade: string | null | undefined) {
  try {
    const where =
      grade && grade.trim()
        ? { published: true, OR: [{ grade: null }, { grade }] }
        : { published: true, grade: null };
    const items = await prisma.assignment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { submissions: { where: { studentId } } },
    });
    return { items, ok: true };
  } catch {
    return { items: [], ok: false };
  }
}

export default async function StudentDashboard() {
  const user = await requireUser();
  const { items, ok } = await getAssignments(user.id, user.grade);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-brand-950">Bài tập của con</h1>
        <Link href="/tro-choi" className="btn-gold sm:hidden">
          <Gamepad2 className="h-4 w-4" /> Chơi trò chơi
        </Link>
      </div>

      {!ok && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-gold-200 bg-gold-50 p-4 text-sm text-gold-800">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>Chưa kết nối được cơ sở dữ liệu. Vui lòng thử lại sau.</p>
        </div>
      )}

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-20 text-center">
          <ClipboardList className="h-12 w-12 text-brand-200" />
          <p className="mt-4 font-semibold text-brand-900">Chưa có bài tập nào</p>
          <p className="mt-1 text-sm text-brand-950/55">Cô sẽ giao bài tập sớm thôi. Trong lúc chờ, con có thể chơi trò chơi học tập nhé!</p>
          <Link href="/tro-choi" className="btn-primary mt-5">
            <Gamepad2 className="h-4 w-4" /> Khám phá trò chơi
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((a) => {
            const sub = a.submissions[0];
            const status = !sub ? "todo" : sub.status === "GRADED" ? "graded" : "submitted";
            return (
              <Link
                key={a.id}
                href={`/hoc-tap/bai-tap/${a.id}`}
                className="group block rounded-3xl border border-brand-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-brand-950 group-hover:text-brand-700">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-brand-950/60">{a.description}</p>
                    {a.dueDate && (
                      <p className="mt-2 text-xs text-brand-950/50">Hạn nộp: {fmt(a.dueDate)}</p>
                    )}
                  </div>
                  <StatusPill status={status} grade={sub?.grade ?? null} />
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  {status === "todo" ? "Làm bài ngay" : status === "graded" ? "Xem phê bình của cô" : "Xem bài đã nộp"}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatusPill({ status, grade }: { status: string; grade: string | null }) {
  if (status === "graded") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
        <Star className="h-3.5 w-3.5" /> Đã phê bình{grade ? ` · ${grade}` : ""}
      </span>
    );
  }
  if (status === "submitted") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-700">
        <Clock className="h-3.5 w-3.5" /> Đã nộp
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
      <CheckCircle2 className="h-3.5 w-3.5" /> Chưa làm
    </span>
  );
}
