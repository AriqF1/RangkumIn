import { ReceiptData } from "@/types/receipt";

export function formatWhatsappReceipt(
  receipt: ReceiptData,
  jumlahOrang: number,
): string {
  let text = `💸 *RangkumIn - Catatan Struk*\n`;
  text += `📍 *Toko:* ${receipt.nama_toko || "-"}\n`;
  text += `📅 *Tanggal:* ${receipt.tanggal || "-"}\n`;
  text += `───────────────────\n`;

  receipt.item_belanja.forEach((item) => {
    text += `• ${item.nama} (${item.qty}x) -> Rp ${(item.qty * item.harga).toLocaleString("id-ID")}\n`;
  });

  text += `───────────────────\n`;
  text += `💰 *Total:* Rp ${receipt.total_harga.toLocaleString("id-ID")}\n`;

  if (jumlahOrang > 1) {
    const perOrang = Math.round(receipt.total_harga / jumlahOrang);

    text += `👥 *Patungan (${jumlahOrang} orang):* Rp ${perOrang.toLocaleString("id-ID")}`;
  }

  return text;
}
