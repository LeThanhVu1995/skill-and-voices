import Link from "next/link";
import { ClipboardList, Users2, Eye, EyeOff, Trash2, Paperclip, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CreateAssignmentForm } from "@/components/admin/CreateAssignmentForm";
import { toggleAssignmentPublished, deleteAssignment } from "../actions";

function fmt(d: Date | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

async function getData() {
  try {
    return await prisma.assignment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { submissions: true } },
        submissions: { where: { status: "SUBMITTED" }, select: { id: true } },
      },
    });
  } catch {
    return [];
  }
}

export default async function AssignmentsAdminPage() {
  const items = await getData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-950">Bài tập</h1>
        <p className="mt-1.5 text-brand-950/60">
          Đăng bài tập và xem bài làm của học sinh để phê bình.
        </p>
      </div>

      <div className="mb-8">
        <CreateAssignmentForm />
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-20 text-center">
          <ClipboardList className="h-12 w-12 text-brand-200" />
          <p className="mt-4 font-semibold text-brand-900">Chưa có bài tập nào</p>
          <p className="mt-1 text-sm text-brand-950/55">Hãy đăng bài tập đầu tiên cho học sinh.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((a) => {
            const pending = a.submissions.length;
            return (
              <div key={a.id} className="rounded-3xl border border-brand-100 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-lg font-bold text-brand-950">{a.title}</h3>
                      {a.grade && (
                        <span className="rounded-full bg-ocean-50 px-2.5 py-0.5 text-xs font-semibold text-ocean-700">
                          {a.grade}
                        </span>
                      )}
                      {!a.published && (
                        <span className="rounded-full bg-brand-950/10 px-2.5 py-0.5 text-xs font-semibold text-brand-950/60">
                          Đã ẩn
                        </span>
                      )}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-brand-950/65">{a.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-brand-950/55">
                      <span className="flex items-center gap-1.5">
                        <Users2 className="h-4 w-4" /> {a._count.submissions} bài nộp
                      </span>
                      {pending > 0 && (
                        <span className="flex items-center gap-1.5 font-semibold text-brand-600">
                          {pending} bài chờ phê bình
                        </span>
                      )}
                      {a.dueDate && <span>Hạn nộp: {fmt(a.dueDate)}</span>}
                      {a.attachment && (
                        <span className="flex items-center gap-1.5">
                          <Paperclip className="h-4 w-4" /> Có đính kèm
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <form action={toggleAssignmentPublished}>
                      <input type="hidden" name="id" value={a.id} />
                      <button
                        type="submit"
                        title={a.published ? "Ẩn bài" : "Hiện bài"}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-700 hover:bg-brand-50"
                      >
                        {a.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                    </form>
                    <form action={deleteAssignment}>
                      <input type="hidden" name="id" value={a.id} />
                      <button
                        type="submit"
                        title="Xóa bài tập"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-500 hover:bg-brand-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>

                <Link
                  href={`/admin/bai-tap/${a.id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  Xem bài làm &amp; phê bình <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
