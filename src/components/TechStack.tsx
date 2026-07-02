import {
  Cpu,
  BrainCircuit,
  ScanText,
  Palette,
  Boxes,
  Sparkles,
} from "lucide-react";

import { Card } from "@/components/ui/card";

const stacks = [
  {
    title: "Next.js",
    subtitle: "App Router",
    icon: Boxes,
  },
  {
    title: "React 19",
    subtitle: "Modern UI",
    icon: Cpu,
  },
  {
    title: "Tailwind CSS",
    subtitle: "Utility-first",
    icon: Palette,
  },
  {
    title: "Tesseract.js",
    subtitle: "OCR Engine",
    icon: ScanText,
  },
  {
    title: "Gemini AI",
    subtitle: "Structured Output",
    icon: BrainCircuit,
  },
  {
    title: "shadcn/ui",
    subtitle: "UI Components",
    icon: Sparkles,
  },
];

export default function TechStack() {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Tech Stack
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Built with modern technologies.
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stacks.map((stack) => {
          const Icon = stack.icon;

          return (
            <Card
              key={stack.title}
              className="rounded-2xl p-5 transition hover:-translate-y-1"
            >
              <div className="space-y-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold">{stack.title}</h3>

                  <p className="text-sm text-muted-foreground">
                    {stack.subtitle}
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
