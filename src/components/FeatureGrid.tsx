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
    title: "Ekstraksi Teks Instan",
    subtitle: "Tesseract.js di dalam browser",
    description:
      "Upload foto struk belanja, dan sistem kami akan langsung membaca setiap baris teks tanpa perlu mengirim gambar ke server. Cepat dan responsif.",
    icon: ScanText,
    visualMockup:
      "Memulai proses pemindaian lokal...\n[OK] Tesseract Engine Loaded\n[OK] Mengekstrak teks dari gambar...",
  },
  {
    id: "ai",
    title: "AI Structuring",
    subtitle: "Rapikan teks mentah",
    description:
      "Teks yang berantakan dari struk otomatis disusun oleh AI. Kami mengkategorikan nama item, jumlah, harga, dan total secara cerdas.",
    icon: Sparkles,
    visualMockup:
      "Menganalisis teks mentah...\n[OK] Mendeteksi entitas (Item, Harga, Tanggal)\n[OK] Menyusun struktur data...",
  },
  {
    id: "json",
    title: "Ready as JSON",
    subtitle: "Format siap pakai",
    description:
      "Hasil akhir disajikan dalam format JSON terstruktur. Sangat mudah disalin dan diintegrasikan langsung ke aplikasi keuangan atau database-mu.",
    icon: FileJson,
    visualMockup:
      '{\n  "merchant": "Supermarket",\n  "date": "2023-10-27",\n  "items": [\n    { "name": "Kopi", "price": 45000 }\n  ],\n  "total": 45000\n}',
  },
  {
    id: "privacy",
    title: "Privasi Terjamin",
    subtitle: "100% Local Processing",
    description:
      "Privasi adalah prioritas. Struk belanjamu diproses sepenuhnya di perangkatmu sendiri (client-side). Tidak ada jejak yang ditinggalkan.",
    icon: ShieldCheck,
    visualMockup:
      "[SECURITY LOG]\n>> Semua pemrosesan OCR dilakukan di sisi klien.\n>> Tidak ada data yang diunggah.\n>> Koneksi aman.",
  },
];

export default function TabbedFeatures() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    // 1. Lebar box luar (outer box) sekarang menggunakan styling standar
    // tanpa pembatas max-w yang kaku, mengikuti section sebelumnya.
    <section className="space-y-12 py-10">
      {/* Header Section */}
      <div>
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Alur Pemrosesan RangkumIn
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Dari Struk Menjadi Data Terstruktur.
        </h2>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        {/* Kolom Kiri: Menu Navigasi Tabs */}
        {/* Perbaikan 3: snap-x, overflow-x-auto, dan scroll-smooth untuk mobile */}
        <div className="flex w-full snap-x snap-mandatory flex-row gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar lg:w-1/3 lg:flex-col lg:overflow-visible lg:pb-0">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = index === activeTab;

            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                // Menambahkan min-w-[280px] agar di mobile lebarnya konsisten dan bisa di-scroll dengan baik (flex-shrink-0)
                className={`group relative flex w-full min-w-[280px] flex-shrink-0 snap-center items-start gap-4 rounded-2xl p-5 text-left transition-all sm:min-w-[320px] lg:min-w-0 lg:w-full ${
                  isActive
                    ? "bg-card shadow-sm border border-border ring-1 ring-primary/10"
                    : "hover:bg-muted/50 border border-transparent"
                }`}
              >
                {/* Indikator aktif di sisi kiri (hanya desktop) */}
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute bottom-0 left-0 top-0 hidden w-1 rounded-l-2xl bg-primary lg:block"
                    initial={false}
                  />
                )}

                {/* Perbaikan 2: Warna ikon lebih netral dan monokrom, bukan warna-warni */}
                <div
                  className={`mt-1 rounded-xl p-2 transition-colors ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:text-foreground"}`}
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

        {/* Kolom Kanan: Visual Showcase Besar */}
        {/* Perbaikan 2: Menghapus gradien warna-warni, menggunakan warna netral (bg-card / bg-muted) */}
        <div className="relative w-full overflow-hidden rounded-3xl border bg-card shadow-sm lg:w-2/3 min-h-[400px] lg:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              // Latar belakang sekarang seragam dan bersih
              className="absolute inset-0 flex flex-col justify-between bg-muted/10 p-6 lg:p-10"
            >
              {/* Deskripsi */}
              <div className="max-w-xl space-y-4">
                <h4 className="text-2xl font-bold">
                  {features[activeTab].title}
                </h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {features[activeTab].description}
                </p>
              </div>

              {/* Area Tengah untuk Terminal / Code Window */}
              {/* Desain dibuat menyerupai jendela terminal/kode yang elegan */}
              <div className="mt-8 flex flex-1 w-full items-start justify-start overflow-hidden rounded-2xl border bg-zinc-950 shadow-inner">
                <div className="w-full flex-col flex">
                  {/* Header mock terminal */}
                  <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-zinc-700" />
                    <div className="h-3 w-3 rounded-full bg-zinc-700" />
                    <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  </div>
                  {/* Isi mock terminal */}
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
