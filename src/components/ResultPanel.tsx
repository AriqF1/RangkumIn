"use client";

import {
  Loader2,
  CheckCircle2,
  ScanText,
  Sparkles,
  FileText,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  loading: boolean;
  status: string;
  rawText: string;
}

export default function ResultPanel({ loading, status, rawText }: Props) {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Result
        </p>

        <h2 className="mt-2 text-3xl font-bold">Receipt Processing</h2>
      </div>

      <Card className="rounded-3xl p-8">
        {/* Step */}

        <div className="grid gap-4 md:grid-cols-3">
          <Step
            icon={<CheckCircle2 className="h-5 w-5 text-green-500" />}
            title="Upload"
            subtitle="Image received"
          />

          <Step
            icon={
              loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ScanText className="h-5 w-5" />
              )
            }
            title="OCR"
            subtitle={loading ? "Scanning..." : "Completed"}
          />

          <Step
            icon={<Sparkles className="h-5 w-5" />}
            title="AI"
            subtitle="Ready"
          />
        </div>

        <Separator className="my-8" />

        {/* Status */}

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">OCR Status</h3>

            <p className="mt-1 text-sm text-muted-foreground">{status}</p>
          </div>

          <Badge>{loading ? "Processing" : "Completed"}</Badge>
        </div>

        {rawText && (
          <>
            <Separator className="my-8" />

            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />

                <h3 className="font-semibold">Raw OCR Output</h3>
              </div>

              <div className="rounded-2xl border bg-muted/40 p-5">
                <pre className="max-h-72 overflow-auto whitespace-pre-wrap font-mono text-sm leading-7">
                  {rawText}
                </pre>
              </div>
            </div>
          </>
        )}
      </Card>
    </section>
  );
}

interface StepProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function Step({ icon, title, subtitle }: StepProps) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="flex items-center gap-3">
        {icon}

        <div>
          <p className="font-medium">{title}</p>

          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
