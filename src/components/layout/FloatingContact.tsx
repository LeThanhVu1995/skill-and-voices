"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Facebook, X, Headphones } from "lucide-react";

type Props = {
  phone: string;
  zalo: string;
  facebook: string;
};

export function FloatingContact({ phone, zalo, facebook }: Props) {
  const [open, setOpen] = useState(false);
  const tel = phone.replace(/\s/g, "");

  const items = [
    {
      label: "Gọi điện",
      href: `tel:${tel}`,
      icon: Phone,
      cls: "bg-brand-600 hover:bg-brand-700",
      external: false,
    },
    {
      label: "Nhắn Zalo",
      href: zalo,
      icon: MessageCircle,
      cls: "bg-ocean-500 hover:bg-ocean-600",
      external: true,
    },
    {
      label: "Facebook",
      href: facebook,
      icon: Facebook,
      cls: "bg-[#1877f2] hover:bg-[#0f63d6]",
      external: true,
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      {/* Expanded items */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {items.map((it) => {
          const Icon = it.icon;
          const content = (
            <span className="group flex items-center gap-2">
              <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-900 shadow-soft">
                {it.label}
              </span>
              <span className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg ${it.cls}`}>
                <Icon className="h-5 w-5" />
              </span>
            </span>
          );
          return it.external ? (
            <a key={it.label} href={it.href} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          ) : (
            <a key={it.label} href={it.href}>
              {content}
            </a>
          );
        })}
        <Link href="/lien-he" onClick={() => setOpen(false)}>
          <span className="group flex items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-brand-900 shadow-soft">
              Đăng ký tư vấn
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-shine text-brand-900 shadow-gold">
              <Headphones className="h-5 w-5" />
            </span>
          </span>
        </Link>
      </div>

      {/* Main FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Đóng liên hệ nhanh" : "Liên hệ nhanh"}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-white shadow-soft transition-transform hover:scale-105"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/50" />
        )}
        {open ? <X className="relative h-6 w-6" /> : <MessageCircle className="relative h-6 w-6" />}
      </button>
    </div>
  );
}
