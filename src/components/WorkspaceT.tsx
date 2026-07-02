"use client";

import { ShieldCheck } from "lucide-react";

import ImageUploader from "@/components/ImageUploader";

interface WorkspaceProps {
  onImageSelected: (file: File) => Promise<void>;
}

export default function Workspace({ onImageSelected }: WorkspaceProps) {
  return (
    <section className="rounded-[28px] border bg-card">
      <div className="border-b px-8 py-7">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Workspace
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Upload Receipt
        </h2>

        <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
          Drag & drop a receipt image or choose one from your device. OCR
          processing happens directly inside your browser.
        </p>
      </div>

      <div className="p-8">
        <ImageUploader onImageSelected={onImageSelected} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t px-8 py-5">
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>JPG</span>

          <span>•</span>

          <span>PNG</span>

          <span>•</span>

          <span>WEBP</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          Client-side OCR
        </div>
      </div>
    </section>
  );
}
