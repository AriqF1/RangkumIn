"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ScanSearch,
  ImagePlus,
  RefreshCcw,
  CheckCircle2,
  FileImage,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelected: (file: File) => Promise<void>;
}

export default function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(url);
    await onImageSelected(file);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    await handleFile(file);
  };

  const extension = selectedFile?.name.split(".").pop()?.toUpperCase() ?? "";

  return (
    <>
      <input
        id="receipt-upload"
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          await handleFile(file);
          e.target.value = "";
        }}
      />

      {!selectedFile ? (
        // Empty State: Drag & Drop Area
        <label
          htmlFor="receipt-upload"
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          className={cn(
            "group relative overflow-hidden transition-all duration-300 ease-out",
            "flex w-full h-full min-h-[360px] cursor-pointer flex-col items-center justify-center p-8 text-center bg-background/50 border-2 border-dashed",
            dragging
              ? "border-primary bg-primary/5"
              : "border-border/60 hover:border-foreground/30 hover:bg-muted/40",
          )}
        >
          <div
            className={cn(
              "relative flex h-16 w-16 items-center justify-center rounded-sm border border-border/60 transition-all duration-300",
              dragging
                ? "border-primary bg-primary text-primary-foreground scale-110"
                : "bg-muted group-hover:-translate-y-1 group-hover:bg-background",
            )}
          >
            <ScanSearch className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>

          <div className="relative mt-6 space-y-2">
            <h3 className="text-lg font-medium tracking-tight text-foreground">
              Select or drop receipt
            </h3>
            <p className="mx-auto max-w-sm text-sm text-muted-foreground leading-relaxed">
              Upload an image of your receipt to begin extraction. High contrast
              images work best.
            </p>
          </div>

          <div className="absolute bottom-6 flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground group-hover:text-foreground/70 transition-colors">
            <ImagePlus className="h-3.5 w-3.5" />
            Click to browse files
          </div>
        </label>
      ) : (
        // Active State: Preview & Metadata
        <div className="w-full h-full min-h-[360px] flex flex-col md:flex-row items-center justify-center gap-8 bg-background border border-border/60 p-6 md:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Receipt Preview Container */}
          <div className="relative flex-shrink-0 w-full max-w-[200px] aspect-[1/1.4] bg-muted/30 border border-border/80 shadow-sm overflow-hidden flex items-center justify-center p-2">
            {previewUrl ? (
              <div className="relative w-full h-full overflow-hidden border border-border/40">
                <Image
                  src={previewUrl}
                  alt="Receipt Preview"
                  fill
                  className="object-cover object-top opacity-90"
                />
                {/* Simulated scanning line animation overlay */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary/60 shadow-[0_0_8px_rgba(var(--primary),0.8)] animate-[scan_3s_ease-in-out_infinite]" />
              </div>
            ) : (
              <FileImage className="h-8 w-8 text-muted-foreground/30" />
            )}
          </div>

          {/* Metadata & Actions */}
          <div className="flex flex-col flex-1 w-full max-w-md items-start text-left space-y-5 z-10">
            <div className="flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">
                Image Loaded
              </span>
            </div>

            <div className="space-y-1.5 w-full">
              <h3
                className="text-base font-medium text-foreground truncate max-w-full"
                title={selectedFile.name}
              >
                {selectedFile.name}
              </h3>
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></span>
                  {extension}
                </span>
                <span className="text-border">|</span>
                <span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Image acquired. Processing pipeline initialized. The engine is
              extracting raw text before structuring the data.
            </p>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-2 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border bg-background hover:bg-muted hover:text-foreground h-9 px-4 py-2"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Load Different Image
            </button>
          </div>
        </div>
      )}
    </>
  );
}
