import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "vs_session";

function getSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET ?? "");
}

async function readSession(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { sub: string; role: "ADMIN" | "STUDENT"; name?: string };
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await readSession(req);

  const isAdminArea = pathname.startsWith("/admin");
  const isStudentArea = pathname.startsWith("/hoc-tap");

  if (!isAdminArea && !isStudentArea) return NextResponse.next();

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/dang-nhap";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Khu vực quản trị chỉ dành cho ADMIN
  if (isAdminArea && session.role !== "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/hoc-tap";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/hoc-tap/:path*"],
};
