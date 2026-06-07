"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  createSession,
  destroySession,
  verifyPassword,
  type Role,
} from "@/lib/auth";

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

  if (!email || !password) {
    return { error: "Vui lòng nhập email và mật khẩu." };
  }

  let role: Role = "STUDENT";
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.active) {
      return { error: "Tài khoản không tồn tại hoặc đã bị khóa." };
    }
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return { error: "Email hoặc mật khẩu không đúng." };
    }
    role = user.role as Role;
    await createSession({
      id: user.id,
      name: user.name,
      email: user.email,
      role,
      grade: user.grade,
    });
  } catch (error) {
    console.error("login error:", error);
    return {
      error:
        "Không kết nối được cơ sở dữ liệu. Vui lòng kiểm tra cấu hình và thử lại.",
    };
  }

  const fallback = role === "ADMIN" ? "/admin" : "/hoc-tap";
  const target = next && next.startsWith("/") ? next : fallback;
  redirect(target);
}

export async function logout() {
  destroySession();
  redirect("/dang-nhap");
}
