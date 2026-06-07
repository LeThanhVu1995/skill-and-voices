import { Users, Lock, Power } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { CreateStudentForm } from "@/components/admin/CreateStudentForm";
import { toggleStudentActive, resetStudentPassword } from "../actions";

function fmt(d: Date) {
  return new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

async function getData() {
  try {
    return await prisma.user.findMany({
      where: { role: "STUDENT" },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { submissions: true } } },
    });
  } catch {
    return [];
  }
}

export default async function StudentsAdminPage() {
  const students = await getData();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-950">Học sinh</h1>
        <p className="mt-1.5 text-brand-950/60">
          Quản lý tài khoản học sinh ({students.length}).
        </p>
      </div>

      <div className="mb-8">
        <CreateStudentForm />
      </div>

      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-200 bg-white py-20 text-center">
          <Users className="h-12 w-12 text-brand-200" />
          <p className="mt-4 font-semibold text-brand-900">Chưa có học sinh</p>
          <p className="mt-1 text-sm text-brand-950/55">Tạo tài khoản để học sinh có thể làm bài tập.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-50 bg-brand-50/40 text-left text-xs font-semibold uppercase tracking-wider text-brand-500">
                  <th className="px-5 py-4">Học sinh</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Lớp</th>
                  <th className="px-5 py-4">Bài nộp</th>
                  <th className="px-5 py-4">Trạng thái</th>
                  <th className="px-5 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-brand-50 last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                          {s.name.charAt(0)}
                        </span>
                        <div>
                          <p className="font-semibold text-brand-900">{s.name}</p>
                          <p className="text-xs text-brand-950/50">Tạo {fmt(s.createdAt)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-brand-950/70">{s.email}</td>
                    <td className="px-5 py-4 text-brand-950/70">{s.grade ?? "—"}</td>
                    <td className="px-5 py-4 text-brand-950/70">{s._count.submissions}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          s.active ? "bg-green-100 text-green-700" : "bg-brand-950/10 text-brand-950/60"
                        }`}
                      >
                        {s.active ? "Đang hoạt động" : "Đã khóa"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <ResetPassword id={s.id} />
                        <form action={toggleStudentActive}>
                          <input type="hidden" name="id" value={s.id} />
                          <button
                            type="submit"
                            title={s.active ? "Khóa tài khoản" : "Mở khóa"}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-700 hover:bg-brand-50"
                          >
                            <Power className="h-4 w-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function ResetPassword({ id }: { id: string }) {
  return (
    <form action={resetStudentPassword} className="flex items-center gap-1">
      <input type="hidden" name="id" value={id} />
      <input
        name="password"
        type="text"
        minLength={6}
        placeholder="Mật khẩu mới"
        className="w-28 rounded-xl border border-brand-100 px-2.5 py-1.5 text-xs outline-none focus:border-brand-400"
      />
      <button
        type="submit"
        title="Đặt lại mật khẩu"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand-100 text-brand-700 hover:bg-brand-50"
      >
        <Lock className="h-4 w-4" />
      </button>
    </form>
  );
}
