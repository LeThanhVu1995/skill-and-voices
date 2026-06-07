"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { saveUpload } from "@/lib/storage";

export type SubmitResult = { status: "idle" | "success" | "error"; message: string };

export async function submitAssignment(
  _prev: SubmitResult,
  formData: FormData
): Promise<SubmitResult> {
  const user = await requireUser();
  const assignmentId = String(formData.get("assignmentId") ?? "");
  const content = String(formData.get("content") ?? "").trim();
  const file = formData.get("attachment");

  if (!assignmentId) {
    return { status: "error", message: "Thiếu thông tin bài tập." };
  }
  if (!content) {
    return { status: "error", message: "Vui lòng nhập nội dung bài làm." };
  }

  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
    });
    if (!assignment || !assignment.published) {
      return { status: "error", message: "Bài tập không tồn tại hoặc đã đóng." };
    }

    let attachment: string | null = null;
    if (file instanceof File && file.size > 0) {
      attachment = await saveUpload(file, "submissions");
    }

    // Mỗi học sinh chỉ có 1 bài nộp cho mỗi bài tập -> nộp lại sẽ cập nhật
    await prisma.submission.upsert({
      where: {
        assignmentId_studentId: { assignmentId, studentId: user.id },
      },
      update: {
        content,
        ...(attachment ? { attachment } : {}),
        status: "SUBMITTED",
        grade: null,
        feedback: null,
        gradedAt: null,
        submittedAt: new Date(),
      },
      create: {
        assignmentId,
        studentId: user.id,
        content,
        attachment,
      },
    });

    revalidatePath("/hoc-tap");
    revalidatePath(`/hoc-tap/bai-tap/${assignmentId}`);
    revalidatePath(`/admin/bai-tap/${assignmentId}`);
    return { status: "success", message: "Đã nộp bài thành công! Chờ cô phê bình nhé." };
  } catch (error) {
    console.error("submitAssignment error:", error);
    return { status: "error", message: "Không thể nộp bài. Vui lòng thử lại." };
  }
}
