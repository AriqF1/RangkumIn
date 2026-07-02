"use client";

import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-12 pb-10">
      <div className="max-w-3xl space-y-8">
        <div className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
            AI Receipt Workspace
          </p>

          <h1 className="text-5xl font-black tracking-tight leading-none md:text-7xl">
            Receipt
            <br />
            Intelligence.
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Extract printed text from receipts directly in your browser and
            transform it into structured data for expense tracking and AI
            processing.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge variant="secondary">Client-side OCR</Badge>
          <Badge variant="secondary">Privacy First</Badge>
          <Badge variant="secondary">AI Ready</Badge>
        </div>
      </div>
    </section>
  );
}
