"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ScanSearch, ImagePlus, RefreshCcw, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ImageUploaderProps {
  onImageSelected: (file: File) => Promise<void>;
}

export default function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [dragging, setDragging] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleBrowse = () => {
    inputRef.current?.click();
  };

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

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
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
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          await handleFile(file);
        }}
      />

      {!selectedFile ? (
        <div
          onClick={handleBrowse}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          className={cn(
            "group relative overflow-hidden rounded-[28px] border-2 border-dashed transition-all duration-300 ease-out",
            "flex min-h-[460px] cursor-pointer flex-col items-center justify-center px-8 text-center",
            dragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/40 hover:bg-muted/30",
          )}
        >
          {/* Background Glow */}

          <div
            className={cn(
              "absolute inset-0 opacity-0 transition-opacity duration-500",
              dragging && "opacity-100",
            )}
          >
            <div className="absolute inset-x-0 top-0 h-32 bg-primary/5 blur-3xl" />
          </div>

          {/* Icon */}

          <div
            className={cn(
              "relative flex h-24 w-24 items-center justify-center rounded-full border transition-all duration-300",
              dragging
                ? "border-primary bg-primary text-primary-foreground scale-110"
                : "bg-muted group-hover:-translate-y-1",
            )}
          >
            <ScanSearch className="h-10 w-10" />
          </div>

          {/* Title */}

          <div className="relative mt-8 space-y-3">
            <h3 className="text-3xl font-bold tracking-tight">
              Upload Receipt
            </h3>

            <p className="mx-auto max-w-md text-base leading-7 text-muted-foreground">
              Drag & drop a receipt image or click anywhere to browse from your
              device.
            </p>
          </div>

          {/* Badges */}

          <div className="relative mt-8 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">JPG</Badge>
            <Badge variant="secondary">PNG</Badge>
            <Badge variant="secondary">WEBP</Badge>
            <Badge variant="secondary">JPEG</Badge>
          </div>

          {/* Bottom */}

          <div className="absolute bottom-8 flex items-center gap-2 text-sm text-muted-foreground">
            <ImagePlus className="h-4 w-4" />
            Click to browse your files
          </div>
        </div>
      ) : (
        <div className="rounded-[28px] border bg-card p-8">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Preview */}

            <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl border">
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Receipt Preview"
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Metadata */}

            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                <span className="font-semibold">Ready for OCR</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold break-all">
                {selectedFile.name}
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge variant="secondary">{extension} Image</Badge>

                <Badge variant="secondary">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Badge>
              </div>

              <p className="mt-6 max-w-lg leading-7 text-muted-foreground">
                Your receipt has been uploaded successfully. Continue to OCR
                extraction to convert the image into structured text.
              </p>

              <div className="mt-auto pt-8">
                <Button
                  variant="outline"
                  onClick={handleBrowse}
                  className="rounded-xl"
                >
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Replace Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
