"use client";

import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import { updateGameThumbnail } from "@/app/admin/actions";

export function GameThumbForm({ id }: { id: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} action={updateGameThumbnail}>
      <input type="hidden" name="id" value={id} />
      <label
        title="Đổi ảnh thumbnail"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-brand-100 text-brand-700 hover:bg-brand-50"
      >
        <ImagePlus className="h-4 w-4" />
        <input
          type="file"
          name="thumbnail"
          accept=".png,.jpg,.jpeg,.gif,.webp"
          className="hidden"
          onChange={() => formRef.current?.requestSubmit()}
        />
      </label>
    </form>
  );
}
