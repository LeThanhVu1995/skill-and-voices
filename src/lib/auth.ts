import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const COOKIE_NAME = "vs_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 ngày

export type Role = "ADMIN" | "STUDENT";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  grade?: string | null;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("Thiếu biến môi trường AUTH_SECRET");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

type SessionPayload = JWTPayload & {
  sub: string;
  name: string;
  email: string;
  role: Role;
};

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(getSecret());

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function destroySession() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

/** Lấy thông tin phiên từ cookie (nhẹ, không truy vấn DB). */
export async function getSession(): Promise<SessionUser | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, getSecret());
    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/** Lấy người dùng đầy đủ từ DB (đảm bảo còn active). */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) return null;
  try {
    const user = await prisma.user.findUnique({ where: { id: session.id } });
    if (!user || !user.active) return null;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as Role,
      grade: user.grade,
    };
  } catch {
    return session;
  }
}

export const COOKIE = COOKIE_NAME;

/** Bắt buộc đã đăng nhập, nếu không sẽ chuyển tới trang đăng nhập. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/dang-nhap");
  }
  return user;
}

/** Bắt buộc là ADMIN. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/dang-nhap");
  }
  if (user.role !== "ADMIN") {
    redirect("/hoc-tap");
  }
  return user;
}
