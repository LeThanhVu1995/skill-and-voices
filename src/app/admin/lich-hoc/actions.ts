"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export type ScheduleResult = { status: "idle" | "success" | "error"; message: string };

const ok = (m: string): ScheduleResult => ({ status: "success", message: m });
const fail = (m: string): ScheduleResult => ({ status: "error", message: m });

export async function createSchedule(
  _prev: ScheduleResult,
  formData: FormData
): Promise<ScheduleResult> {
  await requireAdmin();
  const s = (k: string) => String(formData.get(k) ?? "").trim();
  const name = s("name");
  const capacity = parseInt(s("capacity"), 10);
  const startRaw = s("startDate");

  if (!name) return fail("Vui lòng nhập tên lớp / khóa học.");

  try {
    await prisma.classSchedule.create({
      data: {
        name,
        ageGroup: s("ageGroup") || null,
        mode: s("mode") || null,
        schedule: s("schedule") || null,
        startDate: startRaw ? new Date(startRaw) : null,
        capacity: Number.isFinite(capacity) && capacity > 0 ? capacity : 8,
        note: s("note") || null,
        order: parseInt(s("order"), 10) || 0,
      },
    });
    revalidatePath("/admin/lich-hoc");
    revalidatePath("/lich-khai-giang");
    return ok("Đã thêm lớp vào lịch khai giảng.");
  } catch (error) {
    console.error("createSchedule error:", error);
    return fail("Không thể lưu. Kiểm tra kết nối cơ sở dữ liệu.");
  }
}

export async function toggleSchedulePublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const cur = await prisma.classSchedule.findUnique({ where: { id } });
  if (!cur) return;
  await prisma.classSchedule.update({ where: { id }, data: { published: !cur.published } });
  revalidatePath("/admin/lich-hoc");
  revalidatePath("/lich-khai-giang");
}

export async function deleteSchedule(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.classSchedule.delete({ where: { id } });
  revalidatePath("/admin/lich-hoc");
  revalidatePath("/lich-khai-giang");
}

export async function updateSchedule(
  _prev: ScheduleResult,
  formData: FormData
): Promise<ScheduleResult> {
  await requireAdmin();
  const s = (k: string) => String(formData.get(k) ?? "").trim();
  const id = s("id");
  const name = s("name");
  const capacity = parseInt(s("capacity"), 10);
  const startRaw = s("startDate");

  if (!id) return fail("Thiếu thông tin lớp.");
  if (!name) return fail("Vui lòng nhập tên lớp / khóa học.");

  try {
    await prisma.classSchedule.update({
      where: { id },
      data: {
        name,
        ageGroup: s("ageGroup") || null,
        mode: s("mode") || null,
        schedule: s("schedule") || null,
        startDate: startRaw ? new Date(startRaw) : null,
        capacity: Number.isFinite(capacity) && capacity > 0 ? capacity : 8,
        note: s("note") || null,
        order: parseInt(s("order"), 10) || 0,
      },
    });
    revalidatePath("/admin/lich-hoc");
    revalidatePath("/lich-khai-giang");
    return ok("Đã cập nhật lớp.");
  } catch (error) {
    console.error("updateSchedule error:", error);
    return fail("Không thể lưu. Kiểm tra kết nối cơ sở dữ liệu.");
  }
}
