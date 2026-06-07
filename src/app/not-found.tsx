import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-hero-radial">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="container-x relative text-center">
        <p className="font-display text-[7rem] font-bold leading-none text-brand-700/90 sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 text-2xl font-bold text-brand-950 sm:text-3xl">
          Không tìm thấy trang
        </h1>
        <p className="mx-auto mt-4 max-w-md text-brand-950/60">
          Trang bạn đang tìm có thể đã được di chuyển hoặc không còn tồn tại.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" /> Về trang chủ
          </Link>
          <Link href="/lien-he" className="btn-outline">
            <ArrowLeft className="h-4 w-4" /> Liên hệ tư vấn
          </Link>
        </div>
      </div>
    </section>
  );
}
