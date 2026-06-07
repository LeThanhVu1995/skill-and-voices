import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Paperclip, Star, Clock, Quote } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { SubmitAssignmentForm } from "@/components/forms/SubmitAssignmentForm";

function fmt(d: Date) {
  return new Date(d).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function getData(id: string, studentId: string) {
  try {
    const assignment = await prisma.assignment.findUnique({ where: { id } });
    if (!assignment) return { assignment: null, submission: null };
    const submission = await prisma.submission.findUnique({
      where: { assignmentId_studentId: { assignmentId: id, studentId } },
    });
    return { assignment, submission };
  } catch {
    return { assignment: null, submission: null };
  }
}

export default async function StudentAssignmentPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireUser();
  const { assignment, submission } = await getData(params.id, user.id);
  if (!assignment || !assignment.published) notFound();

  const graded = submission?.status === "GRADED";

  return (
    <div>
      <Link
        href="/hoc-tap"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách bài tập
      </Link>

      {/* Đề bài */}
      <div className="mt-5 rounded-3xl border border-brand-100 bg-white p-6">
        <h1 className="text-2xl font-bold text-brand-950">{assignment.title}</h1>
        {assignment.grade && (
          <span className="mt-2 inline-flex rounded-full bg-ocean-50 px-2.5 py-0.5 text-xs font-semibold text-ocean-700">
            {assignment.grade}
          </span>
        )}
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-brand-950/80">
          {assignment.description}
        </p>
        {assignment.attachment && (
          <a
            href={`/api/files/${assignment.attachment}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-100 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
          >
            <Paperclip className="h-4 w-4" /> Tải file đề bài
          </a>
        )}
      </div>

      {/* Phê bình của cô */}
      {graded && (
        <div className="mt-6 rounded-3xl border border-gold-200 bg-gold-50/60 p-6">
          <div className="flex items-center gap-2 text-gold-700">
            <Quote className="h-5 w-5" />
            <h2 className="text-lg font-bold">Lời phê bình của cô</h2>
          </div>
          {submission?.grade && (
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-bold text-gold-700">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" /> {submission.grade}
            </p>
          )}
          {submission?.feedback && (
            <p className="mt-3 whitespace-pre-wrap font-display text-lg italic leading-relaxed text-brand-900">
              “{submission.feedback}”
            </p>
          )}
          {submission?.gradedAt && (
            <p className="mt-3 text-xs text-brand-950/50">Phê bình lúc {fmt(submission.gradedAt)}</p>
          )}
        </div>
      )}

      {/* Bài đã nộp */}
      {submission && (
        <div className="mt-6 rounded-3xl border border-brand-100 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-brand-950">Bài con đã nộp</h2>
            <span className="inline-flex items-center gap-1.5 text-xs text-brand-950/55">
              <Clock className="h-3.5 w-3.5" /> {fmt(submission.submittedAt)}
            </span>
          </div>
          <div className="mt-3 whitespace-pre-wrap rounded-2xl bg-cream/70 p-4 text-sm leading-relaxed text-brand-950/80">
            {submission.content}
          </div>
          {submission.attachment && (
            <a
              href={`/api/files/${submission.attachment}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl border border-brand-100 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              <Paperclip className="h-4 w-4" /> File đã đính kèm
            </a>
          )}
        </div>
      )}

      {/* Form nộp / nộp lại */}
      <div className="mt-6 rounded-3xl border border-brand-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-brand-950">
          {submission ? "Nộp lại bài" : "Làm bài"}
        </h2>
        {graded && (
          <p className="mb-4 rounded-2xl bg-brand-50/60 p-3 text-sm text-brand-950/60">
            Con có thể chỉnh sửa và nộp lại bài sau khi xem phê bình của cô.
          </p>
        )}
        <SubmitAssignmentForm
          assignmentId={assignment.id}
          defaultContent={submission?.content ?? ""}
          resubmit={Boolean(submission)}
        />
      </div>
    </div>
  );
}
