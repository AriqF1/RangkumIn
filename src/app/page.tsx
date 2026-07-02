"use client";

import { useState } from "react";
import { createWorker } from "tesseract.js";

import Navbar from "@/components/Navbar";
import Hero from "@/components/HeroT";
import Workspace from "@/components/WorkspaceT";
import Pipeline from "@/components/Pipeline";
import FeatureGrid from "@/components/FeatureGrid";
import ResultPanel from "@/components/ResultPanel";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [rawText, setRawText] = useState("");

  const handleImageSelected = async (file: File) => {
    setLoading(true);
    setRawText("");
    setStatus("Initializing OCR Engine...");

    try {
      const worker = await createWorker(["eng", "ind"]);

      setStatus("Scanning receipt...");

      const {
        data: { text },
      } = await worker.recognize(file);

      await worker.terminate();

      setRawText(text);

      setStatus("Receipt scanned successfully.");
    } catch (error) {
      console.error(error);

      setStatus("Failed to process image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-background pt-24">
        {/* Hero */}

        <Hero />

        {/* Workspace */}

        <section id="workspace" className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Workspace onImageSelected={handleImageSelected} />
            </div>

            <div className="lg:col-span-4">
              <Pipeline loading={loading} rawText={rawText} />
            </div>
          </div>
        </section>

        {/* Result */}

        {rawText && (
          <section className="mx-auto max-w-7xl px-6 py-8">
            <ResultPanel loading={loading} status={status} rawText={rawText} />
          </section>
        )}

        {/* Feature */}

        <section id="features" className="mx-auto max-w-7xl px-6 py-16">
          <FeatureGrid />
        </section>

        <Footer />
      </main>
    </>
  );
}
