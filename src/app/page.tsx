"use client";

import { useState } from "react";
import { createWorker } from "tesseract.js";

import { ReceiptItem, ReceiptData } from "@/types/receipt";
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
  const [aiData, setAiData] = useState<ReceiptData | null>(null);

  const handleImageSelected = async (file: File) => {
    setLoading(true);
    setRawText("");
    setAiData(null);
    setStatus("Initializing OCR Engine...");

    try {
      const worker = await createWorker(["ind", "eng"]);
      setStatus("Sedang memindai gambar struk...");

      const {
        data: { text },
      } = await worker.recognize(file);
      await worker.terminate();

      // Tampilkan teks mentah di layar log terlebih dahulu
      setRawText(text);

      // 2. Kirim teks mentah hasil scan ke Backend Next.js untuk diproses AI
      setStatus(
        "Teks berhasil diekstrak! Sedang merapikan data dengan Gemini AI...",
      );

      const res = await fetch("/api/parse-receipt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rawText: text }),
      });

      if (!res.ok) throw new Error("Gagal memproses API AI");

      const parsedData: ReceiptData = await res.json();

      setAiData(parsedData);
      setStatus("Selesai! Data belanjaan lo udah rapi.");
    } catch (error) {
      console.error("Proses Error:", error);
      setStatus("Waduh, gagal memproses data. Coba upload ulang.");
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
              <Pipeline
                loading={loading}
                rawText={rawText}
                isAiProcessing={!!aiData}
                structuredData={aiData}
              />
            </div>
          </div>
        </section>

        {(rawText || aiData) && (
          <section className="mx-auto max-w-7xl px-6 py-8">
            <ResultPanel
              loading={loading}
              status={status}
              rawText={rawText}
              aiData={aiData} //
            />
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
