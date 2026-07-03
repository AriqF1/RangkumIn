import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { rawText } = await request.json();

    if (!rawText) {
      return NextResponse.json(
        { error: "Teks mentah kosong" },
        { status: 400 },
      );
    }

    // Menggunakan model Gemini 1.5 Flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Kamu adalah sistem AI parser struk belanja Indonesia yang sangat presisi. 
      Tugasmu adalah mengubah teks mentah hasil scan OCR struk menjadi format data JSON bersih.
      
      Aturan Wajib:
      1. Output HARUS berupa valid JSON object string.
      2. JANGAN sertakan teks pengantar, JANGAN berikan penutup, keluarkan murni object JSON saja.
      3. Bersihkan nominal harga dari simbol "Rp", titik, atau koma separator. Ubah menjadi tipe data NUMBER murni.

      Wajib ikuti struktur JSON berikut secara persis:
      {
        "nama_toko": "String nama toko",
        "tanggal": "YYYY-MM-DD atau null jika tidak ada",
        "item_belanja": [
          { "nama": "Nama menu/barang", "harga": 0, "qty": 1 }
        ],
        "total_harga": 0
      }

      Berikut adalah teks mentah OCR struk belanja yang harus kamu rapikan:
      ---
      ${rawText}
      ---`,
    });

    let responseText = response.text?.trim() || "{}";

    // 🔥 ANTISIPASI: Jika AI nakal dan tetap memberikan bungkus markdown ```json ... ```
    if (responseText.startsWith("```")) {
      responseText = responseText
        .replace(/^```json/, "") // Hapus pembuka ```json
        .replace(/^```/, "") // Hapus pembuka ``` jika tanpa tulisan json
        .replace(/```$/, "") // Hapus penutup ```
        .trim();
    }

    // Konversi string respon menjadi objek JSON asli
    const parsedJson = JSON.parse(responseText);

    return NextResponse.json(parsedJson);
  } catch (error: any) {
    // Ini akan mencetak eror asli di terminal laptop kamu agar gampang di-debug
    console.error("🔴 DETAIL ERROR DI BACKEND API:", error);

    return NextResponse.json(
      { error: "Gagal memproses data lewat AI", message: error.message },
      { status: 500 },
    );
  }
}
