import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Paperclip, FileText, Users2, CheckCircle2, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { GradeForm } from "@/components/admin/GradeForm";

function fmt(d: Date) {
  return new Date(d).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function getData(id: string) {
  try {
    return await prisma.assignment.findUnique({
      where: { id },
      include: {
        submissions: {
          orderBy: { submittedAt: "desc" },
          include: { student: { select: { name: true, grade: true } } },
        },
      },
    });
  } catch {
    return null;
  }
}

export default async function AssignmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const a = await getData(params.id);
  if (!a) notFound();

  const graded = a.submissions.filter((s) => s.status === "GRADED").length;

  return (
    <div>
      <Link
        href="/admin/bai-tap"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách bài tập
      </Link>

      <div className="mt-5 rounded-3xl border border-brand-100 bg-white p-6">
        <h1 className="text-2xl font-bold text-brand-950">{a.title}</h1>
        {a.grade && (
          <span className="mt-2 inline-flex rounded-full bg-ocean-50 px-2.5 py-0.5 text-xs font-semibold text-ocean-700">
            {a.grade}
          </span>
        )}
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-brand-950/75">
          {a.description}
        </p>
        {a.attachment && (
          <a
            href={a.attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-100 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            <Paperclip className="h-4 w-4" /> Tải file đề bài
          </a>
        )}
        <div className="mt-5 flex flex-wrap gap-5 border-t border-brand-50 pt-4 text-sm text-brand-950/60">
          <span className="flex items-center gap-1.5">
            <Users2 className="h-4 w-4" /> {a.submissions.length} bài nộp
          </span>
          <span className="flex items-center gap-1.5 text-green-700">
            <CheckCircle2 className="h-4 w-4" /> {graded} đã phê bình
          </span>
          <span className="flex items-center gap-1.5 text-brand-600">
            <Clock className="h-4 w-4" /> {a.submissions.length - graded} chờ phê bình
          </span>
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-lg font-bold text-brand-950">Bài làm của học sinh</h2>

      {a.submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-16 text-center">
          <FileText className="h-12 w-12 text-brand-200" />
          <p className="mt-4 font-semibold text-brand-900">Chưa có học sinh nộp bài</p>
        </div>
      ) : (
        <div className="space-y-5">
          {a.submissions.map((s) => (
            <div key={s.id} className="rounded-3xl border border-brand-100 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display font-bold text-white">
                    {s.student.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-brand-900">{s.student.name}</p>
                    <p className="text-xs text-brand-950/55">
                      {s.student.grade ? `${s.student.grade} · ` : ""}Nộp lúc {fmt(s.submittedAt)}
                    </p>
                  </div>
                </div>
                {s.status === "GRADED" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Đã phê bình
                    {s.grade ? ` · ${s.grade}` : ""}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                    <Clock className="h-3.5 w-3.5" /> Chờ phê bình
                  </span>
                )}
              </div>

              <div className="mt-4 whitespace-pre-wrap rounded-2xl bg-cream/70 p-4 text-sm leading-relaxed text-brand-950/80">
                {s.content}
              </div>

              {s.attachment && (
                <a
                  href={s.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border border-brand-100 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
                >
                  <Paperclip className="h-4 w-4" /> Xem file học sinh nộp
                </a>
              )}

              <GradeForm submissionId={s.id} grade={s.grade} feedback={s.feedback} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
