"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin, hashPassword } from "@/lib/auth";
import {
  saveUpload,
  saveGameHtml,
  deleteStoredFile,
  slugify,
} from "@/lib/storage";

export type ActionResult = { status: "idle" | "success" | "error"; message: string };

const ok = (message: string): ActionResult => ({ status: "success", message });
const fail = (message: string): ActionResult => ({ status: "error", message });

const LEAD_STATUSES = ["NEW", "CONTACTED", "CONVERTED", "CLOSED"] as const;

/* ---------------- Leads ---------------- */

export async function updateConsultationStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!LEAD_STATUSES.includes(status as never)) return;
  await prisma.consultation.update({
    where: { id },
    data: { status: status as never },
  });
  revalidatePath("/admin/tu-van");
  revalidatePath("/admin");
}

export async function updatePartnershipStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!LEAD_STATUSES.includes(status as never)) return;
  await prisma.partnership.update({
    where: { id },
    data: { status: status as never },
  });
  revalidatePath("/admin/hop-tac");
  revalidatePath("/admin");
}

/* ---------------- Assignments ---------------- */

export async function createAssignment(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const admin = await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const grade = String(formData.get("grade") ?? "").trim();
  const dueRaw = String(formData.get("dueDate") ?? "").trim();
  const file = formData.get("attachment");

  if (!title || !description) {
    return fail("Vui lòng nhập tiêu đề và nội dung bài tập.");
  }

  try {
    let attachment: string | null = null;
    if (file instanceof File && file.size > 0) {
      attachment = await saveUpload(file, "assignments");
    }
    await prisma.assignment.create({
      data: {
        title,
        description,
        grade: grade || null,
        dueDate: dueRaw ? new Date(dueRaw) : null,
        attachment,
        authorId: admin.id,
      },
    });
    revalidatePath("/admin/bai-tap");
    revalidatePath("/hoc-tap");
    return ok("Đã đăng bài tập thành công.");
  } catch (error) {
    console.error("createAssignment error:", error);
    return fail("Không thể đăng bài tập. Vui lòng thử lại.");
  }
}

export async function toggleAssignmentPublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const current = await prisma.assignment.findUnique({ where: { id } });
  if (!current) return;
  await prisma.assignment.update({
    where: { id },
    data: { published: !current.published },
  });
  revalidatePath("/admin/bai-tap");
  revalidatePath("/hoc-tap");
}

export async function deleteAssignment(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const assignment = await prisma.assignment.findUnique({ where: { id } });
  if (assignment?.attachment) await deleteStoredFile(assignment.attachment);
  await prisma.assignment.delete({ where: { id } });
  revalidatePath("/admin/bai-tap");
  revalidatePath("/hoc-tap");
}

/* ---------------- Grading (Phê bình) ---------------- */

export async function gradeSubmission(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const id = String(formData.get("submissionId") ?? "");
  const grade = String(formData.get("grade") ?? "").trim();
  const feedback = String(formData.get("feedback") ?? "").trim();

  if (!feedback && !grade) {
    return fail("Vui lòng nhập điểm hoặc lời phê bình.");
  }
  try {
    const submission = await prisma.submission.update({
      where: { id },
      data: {
        grade: grade || null,
        feedback: feedback || null,
        status: "GRADED",
        gradedAt: new Date(),
      },
    });
    revalidatePath(`/admin/bai-tap/${submission.assignmentId}`);
    revalidatePath("/hoc-tap");
    return ok("Đã lưu phê bình cho học sinh.");
  } catch (error) {
    console.error("gradeSubmission error:", error);
    return fail("Không thể lưu phê bình. Vui lòng thử lại.");
  }
}

/* ---------------- Students ---------------- */

export async function createStudent(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const grade = String(formData.get("grade") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return fail("Vui lòng nhập đầy đủ họ tên, email và mật khẩu.");
  }
  if (password.length < 6) {
    return fail("Mật khẩu cần tối thiểu 6 ký tự.");
  }
  try {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return fail("Email này đã được sử dụng.");
    await prisma.user.create({
      data: {
        name,
        email,
        grade: grade || null,
        role: "STUDENT",
        passwordHash: await hashPassword(password),
      },
    });
    revalidatePath("/admin/hoc-sinh");
    return ok(`Đã tạo tài khoản cho học sinh ${name}.`);
  } catch (error) {
    console.error("createStudent error:", error);
    return fail("Không thể tạo tài khoản. Vui lòng thử lại.");
  }
}

export async function toggleStudentActive(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user || user.role === "ADMIN") return;
  await prisma.user.update({ where: { id }, data: { active: !user.active } });
  revalidatePath("/admin/hoc-sinh");
}

export async function resetStudentPassword(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const password = String(formData.get("password") ?? "");
  if (password.length < 6) return;
  await prisma.user.update({
    where: { id },
    data: { passwordHash: await hashPassword(password) },
  });
  revalidatePath("/admin/hoc-sinh");
}

/* ---------------- Games ---------------- */

export async function uploadGame(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const file = formData.get("file");

  if (!title) return fail("Vui lòng nhập tên trò chơi.");
  if (!(file instanceof File) || file.size === 0) {
    return fail("Vui lòng chọn file HTML của trò chơi.");
  }
  const lower = file.name.toLowerCase();
  if (!lower.endsWith(".html") && !lower.endsWith(".htm")) {
    return fail("Chỉ chấp nhận file .html hoặc .htm.");
  }

  try {
    let slug = slugify(title) || "tro-choi";
    // đảm bảo slug duy nhất
    const existing = await prisma.game.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now().toString(36)}`;

    const filePath = await saveGameHtml(slug, file);

    let thumbnail: string | null = null;
    const thumb = formData.get("thumbnail");
    if (thumb instanceof File && thumb.size > 0 && /\.(png|jpe?g|gif|webp)$/i.test(thumb.name)) {
      thumbnail = await saveUpload(thumb, "media");
    }

    await prisma.game.create({
      data: {
        slug,
        title,
        description: description || null,
        category: category || "Trò chơi",
        filePath,
        thumbnail,
      },
    });
    revalidatePath("/admin/tro-choi");
    revalidatePath("/tro-choi");
    return ok("Đã tải lên trò chơi thành công.");
  } catch (error) {
    console.error("uploadGame error:", error);
    return fail("Không thể tải lên trò chơi. Vui lòng thử lại.");
  }
}

export async function toggleGamePublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const game = await prisma.game.findUnique({ where: { id } });
  if (!game) return;
  await prisma.game.update({ where: { id }, data: { published: !game.published } });
  revalidatePath("/admin/tro-choi");
  revalidatePath("/tro-choi");
}

export async function deleteGame(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const game = await prisma.game.findUnique({ where: { id } });
  if (game?.filePath) await deleteStoredFile(game.filePath);
  await prisma.game.delete({ where: { id } });
  revalidatePath("/admin/tro-choi");
  revalidatePath("/tro-choi");
}

export async function updateGameThumbnail(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const thumb = formData.get("thumbnail");
  if (!(thumb instanceof File) || thumb.size === 0) return;
  if (!/\.(png|jpe?g|gif|webp)$/i.test(thumb.name)) return;
  const game = await prisma.game.findUnique({ where: { id } });
  if (!game) return;
  if (game.thumbnail) {
    await deleteStoredFile(game.thumbnail);
  }
  const thumbnail = await saveUpload(thumb, "media");
  await prisma.game.update({ where: { id }, data: { thumbnail } });
  revalidatePath("/admin/tro-choi");
  revalidatePath("/tro-choi");
}

/* ---------------- Blog (Góc phụ huynh) ---------------- */

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = base || "bai-viet";
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

async function resolveCover(formData: FormData): Promise<string | null | undefined> {
  const file = formData.get("coverFile");
  const url = String(formData.get("coverUrl") ?? "").trim();
  if (file instanceof File && file.size > 0) {
    const lower = file.name.toLowerCase();
    if (/\.(png|jpe?g|gif|webp)$/.test(lower)) {
      return await saveUpload(file, "media");
    }
  }
  if (url) return url;
  return undefined; // không thay đổi
}

export async function createPost(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || "Đồng hành cùng con";
  const published = formData.get("published") === "on";

  if (!title || !excerpt || !content) {
    return fail("Vui lòng nhập tiêu đề, mô tả ngắn và nội dung.");
  }

  try {
    const slug = await uniqueSlug(slugify(title));
    const cover = await resolveCover(formData);
    await prisma.post.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        category,
        coverImage: cover ?? null,
        readTime: estimateReadTime(content),
        published,
        publishedAt: new Date(),
      },
    });
    revalidatePath("/admin/bai-viet");
    revalidatePath("/goc-phu-huynh");
    return ok("Đã tạo bài viết thành công.");
  } catch (error) {
    console.error("createPost error:", error);
    return fail("Không thể tạo bài viết. Vui lòng thử lại.");
  }
}

export async function updatePost(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim() || "Đồng hành cùng con";
  const published = formData.get("published") === "on";

  if (!id || !title || !excerpt || !content) {
    return fail("Vui lòng nhập đầy đủ thông tin.");
  }

  try {
    const current = await prisma.post.findUnique({ where: { id } });
    if (!current) return fail("Không tìm thấy bài viết.");

    const cover = await resolveCover(formData);
    // nếu tải ảnh mới và có ảnh cũ -> xóa ảnh cũ
    if (cover !== undefined && current.coverImage) {
      await deleteStoredFile(current.coverImage);
    }

    const slug =
      slugify(title) !== current.slug
        ? await uniqueSlug(slugify(title), id)
        : current.slug;

    await prisma.post.update({
      where: { id },
      data: {
        title,
        excerpt,
        content,
        category,
        slug,
        readTime: estimateReadTime(content),
        published,
        ...(cover !== undefined ? { coverImage: cover } : {}),
      },
    });
    revalidatePath("/admin/bai-viet");
    revalidatePath("/goc-phu-huynh");
    revalidatePath(`/goc-phu-huynh/${slug}`);
    return ok("Đã cập nhật bài viết.");
  } catch (error) {
    console.error("updatePost error:", error);
    return fail("Không thể cập nhật bài viết. Vui lòng thử lại.");
  }
}

export async function togglePostPublished(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return;
  await prisma.post.update({ where: { id }, data: { published: !post.published } });
  revalidatePath("/admin/bai-viet");
  revalidatePath("/goc-phu-huynh");
}

export async function deletePost(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const post = await prisma.post.findUnique({ where: { id } });
  if (post?.coverImage) {
    await deleteStoredFile(post.coverImage);
  }
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/bai-viet");
  revalidatePath("/goc-phu-huynh");
}
