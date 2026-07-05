"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScanText,
  Sparkles,
  ShieldCheck,
  FileJson,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    id: "ocr",
    title: "Instant Text Extraction",
    subtitle: "Tesseract.js in the browser",
    description:
      "Upload a photo of your receipt, and our system will instantly read every line of text without sending the image to a server. Fast and responsive.",
    icon: ScanText,
    visualMockup:
      "Starting local scanning process...\n[OK] Tesseract Engine Loaded\n[OK] Extracting text from image...",
  },
  {
    id: "ai",
    title: "AI Structuring",
    subtitle: "Clean up raw text",
    description:
      "Messy text from receipts is automatically structured by AI. We intelligently categorize item names, quantities, prices, and totals.",
    icon: Sparkles,
    visualMockup:
      "Analyzing raw text...\n[OK] Detecting entities (Item, Price, Date)\n[OK] Structuring data...",
  },
  {
    id: "json",
    title: "Ready as JSON",
    subtitle: "Ready-to-use format",
    description:
      "The final result is presented in a structured JSON format. It's incredibly easy to copy and integrate directly into your financial apps or database.",
    icon: FileJson,
    visualMockup:
      '{\n  "merchant": "Supermarket",\n  "date": "2023-10-27",\n  "items": [\n    { "name": "Coffee", "price": 45000 }\n  ],\n  "total": 45000\n}',
  },
  {
    id: "privacy",
    title: "Guaranteed Privacy",
    subtitle: "100% Local Processing",
    description:
      "Privacy is our priority. Your receipts are processed entirely on your own device (client-side). No traces left behind.",
    icon: ShieldCheck,
    visualMockup:
      "[SECURITY LOG]\n>> All OCR processing is done on the client side.\n>> No data is uploaded.\n>> Secure connection.",
  },
];

export default function TabbedFeatures() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="space-y-12 py-8">
      {/* Header Section */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          RangkumIn Processing Flow
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          From Receipts to Structured Data.
        </h2>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        <div className="flex w-full snap-x snap-mandatory flex-row gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar lg:w-1/3 lg:flex-col lg:overflow-visible lg:pb-0">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === activeTab;

            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                className={`group relative flex w-full min-w-[280px] flex-shrink-0 snap-center items-start gap-4 rounded-2xl p-5 text-left transition-all sm:min-w-[320px] lg:min-w-0 lg:w-full ${
                  isActive
                    ? "bg-card shadow-sm border border-border ring-1 ring-primary/10"
                    : "hover:bg-muted/50 border border-transparent"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute bottom-0 left-0 top-0 hidden w-1 rounded-l-2xl bg-white lg:block"
                    initial={false}
                  />
                )}

                <div
                  className={`mt-1 rounded-xl p-2 transition-colors ${isActive ? "bg-transparent text-primary" : "bg-muted text-muted-foreground group-hover:text-foreground"}`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <h3
                    className={`font-semibold ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                  >
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.subtitle}
                  </p>
                </div>

                <div
                  className={`hidden lg:block mt-2 transition-transform ${isActive ? "translate-x-1 text-primary opacity-100" : "text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-50"}`}
                >
                  <ChevronRight className="h-5 w-5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column -> Large Visual Showcase */}
        <div className="relative w-full overflow-hidden rounded-3xl border bg-card shadow-sm lg:w-2/3 min-h-[400px] lg:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col justify-between bg-muted/10 p-6 lg:p-10"
            >
              {/* Description */}
              <div className="max-w-xl space-y-4">
                <h4 className="text-2xl font-bold">
                  {features[activeTab].title}
                </h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {features[activeTab].description}
                </p>
              </div>

              <div className="mt-8 flex flex-1 w-full items-start justify-start overflow-hidden rounded-2xl border bg-zinc-950 shadow-inner">
                <div className="w-full flex-col flex">
                  <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-zinc-700" />
                    <div className="h-3 w-3 rounded-full bg-zinc-700" />
                    <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  </div>
                  <pre className="p-4 md:p-6 font-mono text-sm md:text-base text-zinc-300 whitespace-pre-wrap">
                    {features[activeTab].visualMockup}
                  </pre>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
