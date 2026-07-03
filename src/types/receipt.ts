export interface ReceiptItem {
  nama: string;
  harga: number;
  qty: number;
}

export interface ReceiptData {
  nama_toko: string | null;
  tanggal: string | null;
  item_belanja: ReceiptItem[];
  total_harga: number;
}

export interface Props {
  loading: boolean;
  status: string;
  rawText: string;
  aiData: ReceiptData | null;
}
