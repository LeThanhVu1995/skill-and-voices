"use client";

import { useState } from "react";
import { Facebook, Link2, Check } from "lucide-react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => (typeof window !== "undefined" ? window.location.href : "");

  const shareFacebook = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-brand-950/60">Chia sẻ:</span>
      <button
        onClick={shareFacebook}
        aria-label="Chia sẻ Facebook"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-700 transition-colors hover:bg-brand-50"
      >
        <Facebook className="h-4 w-4" />
      </button>
      <button
        onClick={copyLink}
        aria-label="Sao chép liên kết"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-700 transition-colors hover:bg-brand-50"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
