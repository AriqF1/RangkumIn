"use client";

import {
  ShieldCheck,
  FileImage,
  Cpu,
  CheckCircle2,
  Circle,
  Loader2,
  Terminal,
} from "lucide-react";
import ImageUploader from "@/components/ImageUploader";

interface ProcessingWorkspaceProps {
  onImageSelected: (file: File) => Promise<void>;
  loading: boolean;
  rawText: string;
  structuredData: object | null;
}

export default function ProcessingWorkspace({
  onImageSelected,
  loading,
  rawText,
  structuredData,
}: ProcessingWorkspaceProps) {
  const hasRawText = !!rawText;
  const hasAiData = !!structuredData;

  const steps = {
    upload: {
      completed: loading || hasRawText || hasAiData,
      active: false,
    },
    ocr: {
      completed: hasRawText || hasAiData,
      active: loading && !hasRawText,
    },
    ai: {
      completed: hasAiData,
      active: loading && hasRawText && !hasAiData,
    },
    json: {
      completed: hasAiData,
      active: false,
    },
  };

  const sysStatus = loading ? "PROCESSING" : hasAiData ? "COMPLETE" : "READY";

  return (
    <section className="w-full border border-border bg-card shadow-sm rounded-sm overflow-hidden flex flex-col">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border bg-muted/30 px-5 py-4 gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="h-4 w-4 text-foreground" />
            <h2 className="text-sm font-semibold tracking-tight text-foreground uppercase">
              OCR Workspace
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Receipt extraction and structured data processing
          </p>
        </div>

        <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Local Processing
          </span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border">
        <div className="relative flex-1 lg:w-[65%] min-h-[360px] flex items-center justify-center bg-muted/10 p-6 sm:p-12 overflow-hidden">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          <div className="relative z-10 w-full max-w-lg">
            <ImageUploader onImageSelected={onImageSelected} />
          </div>
        </div>

        {/* Right: Pipeline Area (30-35%) */}
        <div className="lg:w-[35%] bg-background p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-8">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Processing Pipeline
            </h3>
          </div>

          <div className="relative border-l border-border/60 ml-2.5 pl-6 space-y-8 pb-4">
            <PipelineStep
              title="Upload"
              active={steps.upload.active}
              completed={steps.upload.completed}
            />
            <PipelineStep
              title="OCR Extraction"
              active={steps.ocr.active}
              completed={steps.ocr.completed}
            />
            <PipelineStep
              title="AI Structuring"
              active={steps.ai.active}
              completed={steps.ai.completed}
            />
            <PipelineStep
              title="JSON Output"
              active={steps.json.active}
              completed={steps.json.completed}
            />
          </div>
        </div>
      </div>

      <footer className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-border bg-muted/20 px-5 py-3 gap-3">
        <div className="flex items-center gap-4 text-[11px] font-mono text-muted-foreground">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            <FileImage className="h-3.5 w-3.5" />
            FORMATS
          </span>
          <span className="text-border">|</span>
          <span className="tracking-widest">JPG</span>
          <span className="tracking-widest">PNG</span>
          <span className="tracking-widest">WEBP</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
          <span>SYS_STATUS:</span>
          <span className="flex items-center gap-1.5 text-foreground font-medium tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              {sysStatus === "PROCESSING" && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                  sysStatus === "READY"
                    ? "bg-emerald-500"
                    : sysStatus === "PROCESSING"
                      ? "bg-amber-500"
                      : "bg-blue-500"
                }`}
              ></span>
            </span>
            {sysStatus}
          </span>
        </div>
      </footer>
    </section>
  );
}

// --- Sub-component for Pipeline Steps ---
function PipelineStep({
  title,
  active,
  completed,
}: {
  title: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="relative">
      {/* Icon indicator positioned over the border line */}
      <div className="absolute -left-[35px] top-0.5 bg-background">
        {completed ? (
          <CheckCircle2 className="h-5 w-5 text-foreground" />
        ) : active ? (
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground/40" />
        )}
      </div>

      <span
        className={`text-sm ${
          completed
            ? "font-medium text-foreground"
            : active
              ? "font-medium text-primary"
              : "text-muted-foreground"
        }`}
      >
        {title}
      </span>
    </div>
  );
}
