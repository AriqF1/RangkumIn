"use client";

import { useReceipt } from "@/hooks/useReceipt";
import type { Props } from "@/types/receipt";
import React, { useState } from "react";
import { formatWhatsappReceipt } from "@/utils/whatsapp";
import {
  Loader2,
  CheckCircle2,
  Sparkles,
  Copy,
  Plus,
  Trash2,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ResultPanel({
  loading,
  status,
  rawText,
  aiData,
}: Props) {
  const {
    editableData,
    setEditableData,
    handleItemChange,
    deleteItem,
    addItem,
  } = useReceipt(aiData);

  const [jumlahOrang, setJumlahOrang] = useState(1);
  const [copied, setCopied] = useState(false);

  const handleCopyWhatsApp = async () => {
    if (!editableData) return;

    const text = formatWhatsappReceipt(editableData, jumlahOrang);

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");

        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        document.execCommand("copy");

        document.body.removeChild(textArea);
      }

      console.log("Berhasil disalin");
    } catch (error) {
      console.error("Gagal menyalin:", error);
    }
  };

  return (
    <section className="space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Receipt Intelligence
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Processing Result
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground leading-7">
            Review the extracted receipt, edit structured data, and export the
            result in multiple formats.
          </p>
        </div>

        <Badge
          variant={loading ? "secondary" : "default"}
          className="rounded-full px-4 py-1"
        >
          {loading ? "Processing..." : "Completed"}
        </Badge>
      </div>

      <Card className="rounded-3xl p-8 bg-white border-slate-200 shadow-slate-200/50">
        {/* Stepper Status */}
        <div className="grid gap-5 lg:grid-cols-3">
          <Step
            icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
            title="Upload"
            subtitle="Image received"
          />
          <Step
            icon={
              loading && !rawText ? (
                <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              )
            }
            title="OCR Engine"
            subtitle={
              loading && !rawText
                ? "Scanning..."
                : rawText
                  ? "Text Extracted"
                  : "Waiting"
            }
          />
          <Step
            icon={
              loading && rawText ? (
                <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
              ) : editableData ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <Sparkles className="h-5 w-5 text-slate-400" />
              )
            }
            title="AI Parsing"
            subtitle={
              loading && rawText
                ? "Structuring JSON..."
                : editableData
                  ? "Data Ready"
                  : "Waiting"
            }
          />
        </div>

        <div className="my-10 h-px bg-border" />

        {/* Status */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              OCR Status
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {loading ? "Processing Receipt" : "Receipt Ready"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {status}
            </p>
          </div>

          <Badge
            variant={loading ? "secondary" : "default"}
            className="rounded-full px-4 py-1.5"
          >
            {loading ? "Processing..." : "Completed"}
          </Badge>
        </div>

        <div className="mt-10">
          <Tabs defaultValue="structured">
            <TabsList className="grid h-14 w-full grid-cols-4 rounded-2xl bg-muted/40 p-1">
              <TabsTrigger value="receipt" className="gap-2">
                📄
                <span>Receipt</span>
              </TabsTrigger>

              <TabsTrigger value="ocr" className="gap-2">
                📝
                <span>OCR Text</span>
              </TabsTrigger>

              <TabsTrigger value="structured" className="gap-2">
                🤖
                <span>Structured</span>
              </TabsTrigger>

              <TabsTrigger value="export" className="gap-2">
                📤
                <span>Export</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="receipt" className="mt-8">
              <div className="rounded-3xl border border-dashed p-12 text-center">
                <h3 className="text-lg font-semibold">Receipt Preview</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Coming in the next step.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="ocr" className="mt-8">
              <div className="rounded-3xl border border-dashed p-12 text-center">
                <h3 className="text-lg font-semibold">OCR Result</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  OCR text will be displayed here.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="structured" className="mt-8">
              {editableData && (
                <div className="mt-10 space-y-6 animate-in fade-in duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="space-y-1">
                      <Input
                        className="bg-slate-50 border-transparent hover:border-slate-200 transition-colors font-bold text-xl text-slate-900 h-10 px-3 w-64 focus-visible:ring-slate-300 focus-visible:bg-white shadow-sm"
                        value={editableData.nama_toko || ""}
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            nama_toko: e.target.value,
                          })
                        }
                        placeholder="Nama Toko"
                      />
                      <Input
                        type="date"
                        className="bg-transparent border-transparent hover:border-slate-200 transition-colors text-sm text-slate-500 h-8 px-3 w-40 mt-1 focus-visible:ring-slate-300 focus-visible:bg-white"
                        value={editableData.tanggal || ""}
                        onChange={(e) =>
                          setEditableData({
                            ...editableData,
                            tanggal: e.target.value,
                          })
                        }
                      />
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-200 hover:bg-slate-50 text-slate-700 self-start sm:self-auto shadow-sm"
                      onClick={addItem}
                    >
                      <Plus className="h-4 w-4 mr-1.5" /> Tambah Item
                    </Button>
                  </div>

                  <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white">
                    <Table>
                      <TableHeader className="bg-slate-50/80 border-b border-slate-200">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-slate-600 font-semibold">
                            Nama Menu / Item
                          </TableHead>
                          <TableHead className="w-24 text-slate-600 font-semibold text-center">
                            Qty
                          </TableHead>
                          <TableHead className="w-40 text-slate-600 font-semibold">
                            Harga Satuan
                          </TableHead>
                          <TableHead className="w-40 text-slate-600 font-semibold text-right">
                            Subtotal
                          </TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {editableData.item_belanja.map((item, index) => (
                          <TableRow
                            key={index}
                            className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                          >
                            <TableCell>
                              <Input
                                value={item.nama}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "nama",
                                    e.target.value,
                                  )
                                }
                                className="bg-transparent border-transparent hover:border-slate-200 p-2 h-auto text-slate-900 focus-visible:ring-slate-200 focus-visible:bg-white shadow-none"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.qty}
                                onChange={(e) =>
                                  handleItemChange(index, "qty", e.target.value)
                                }
                                className="bg-white border-slate-200 text-center text-slate-900 h-9 px-2 shadow-sm focus-visible:ring-slate-200"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.harga}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "harga",
                                    e.target.value,
                                  )
                                }
                                className="bg-white border-slate-200 text-slate-900 h-9 px-3 shadow-sm focus-visible:ring-slate-200"
                              />
                            </TableCell>
                            <TableCell className="text-right font-medium text-slate-700">
                              Rp{" "}
                              {(item.harga * item.qty).toLocaleString("id-ID")}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                onClick={() => deleteItem(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {/* Row Total */}
                        <TableRow className="hover:bg-transparent border-none bg-slate-50/80">
                          <TableCell
                            colSpan={3}
                            className="font-bold text-slate-700 text-right py-4"
                          >
                            Grand Total:
                          </TableCell>
                          <TableCell className="text-right font-black text-emerald-600 text-lg py-4">
                            Rp{" "}
                            {editableData.total_harga.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* ================= MODUL SPLIT BILL & ACTION ================= */}
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center shadow-sm">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="text-amber-500">⚡</span> Mode Patungan
                        (Split Bill)
                      </h4>
                      <p className="text-sm text-slate-500">
                        Bagi rata total struk tanpa ribet kalkulator.
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <Input
                          type="number"
                          min={1}
                          value={jumlahOrang}
                          onChange={(e) =>
                            setJumlahOrang(Math.max(1, Number(e.target.value)))
                          }
                          className="w-20 bg-white border-slate-200 text-slate-900 font-medium shadow-sm"
                        />
                        <span className="text-sm text-slate-500 font-medium">
                          Orang
                        </span>
                        {jumlahOrang > 1 && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1.5 rounded-md border border-emerald-200">
                            @ Rp{" "}
                            {Math.round(
                              editableData.total_harga / jumlahOrang,
                            ).toLocaleString("id-ID")}{" "}
                            / orang
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3">
                      <Button
                        className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 font-semibold shadow-md transition-all active:scale-95"
                        onClick={handleCopyWhatsApp}
                      >
                        {copied ? (
                          <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        {copied ? "Tersalin!" : "Salin Format WA"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="export" className="mt-8">
              <div className="rounded-3xl border border-dashed p-12 text-center">
                <h3 className="text-lg font-semibold">Export Center</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Export options will be available here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
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
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-100 shadow-sm">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-sm text-slate-800">{title}</p>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
