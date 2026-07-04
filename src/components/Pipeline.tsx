"use client";

import { CheckCircle2, Circle, Loader2, Sparkles } from "lucide-react";

interface PipelineProps {
  loading: boolean;
  rawText: string;
  isAiProcessing?: boolean;
  structuredData?: object | null;
}

export default function Pipeline({
  loading,
  rawText,
  structuredData = null,
}: PipelineProps) {
  const uploadCompleted = loading || !!rawText;
  const ocrCompleted = !!rawText;
  const aiCompleted = !!structuredData;
  const jsonCompleted = !!structuredData;

  return (
    <div className="rounded-3xl border bg-card p-8">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Processing Pipeline</h3>

        <p className="text-sm text-muted-foreground">
          Track every step of receipt processing.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <Step title="Upload" completed={uploadCompleted} />

        <Connector />

        <Step
          title="OCR Extraction"
          active={loading}
          completed={ocrCompleted}
        />

        <Connector />

        <Step title="AI Structuring" active={loading} completed={aiCompleted} />

        <Connector />

        <Step title="JSON Output" active={loading} completed={jsonCompleted} />
      </div>

      {loading && (
        <div className="mt-8 rounded-2xl border bg-muted/40 p-4">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 animate-pulse" />
            Processing receipt...
          </div>
        </div>
      )}
    </div>
  );
}

function Connector() {
  return <div className="ml-3 h-6 w-px bg-border" />;
}

interface StepProps {
  title: string;
  active?: boolean;
  completed?: boolean;
}

function Step({ title, active, completed }: StepProps) {
  return (
    <div className="flex items-center gap-3">
      {completed ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : active ? (
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      ) : (
        <Circle className="h-5 w-5 text-muted-foreground" />
      )}

      <span className={completed ? "font-medium" : "text-muted-foreground"}>
        {title}
      </span>
    </div>
  );
}
