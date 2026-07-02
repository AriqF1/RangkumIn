import {
  Cpu,
  ShieldCheck,
  Sparkles,
  ScanText,
  ArrowUpRight,
} from "lucide-react";

import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Receipt OCR",
    description:
      "Extract printed text from receipt images using Tesseract.js directly inside the browser.",
    icon: ScanText,
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "AI Ready",
    description:
      "Prepare extracted text for Gemini or OpenAI structured processing.",
    icon: Sparkles,
  },
  {
    title: "Privacy First",
    description: "OCR runs locally without uploading images to your server.",
    icon: ShieldCheck,
  },
  {
    title: "Performance",
    description: "Optimized for modern browsers with responsive processing.",
    icon: Cpu,
    className: "lg:col-span-2",
  },
];

export default function FeatureGrid() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground uppercase tracking-widest">
          Features
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Built for fast receipt processing.
        </h2>
      </div>

      <div className="grid auto-rows-[220px] gap-5 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <Card
              key={feature.title}
              className={`group rounded-3xl p-8 transition-all hover:-translate-y-1 hover:shadow-lg ${feature.className ?? ""}`}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                    <Icon className="h-6 w-6" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 opacity-0 transition group-hover:opacity-100" />
                </div>

                <div className="mt-auto space-y-3">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>

                  <p className="leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
