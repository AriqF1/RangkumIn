import { ReceiptItem } from "@/types/receipt";

export function calculateTotal(items: ReceiptItem[]): number {
  return items.reduce((total, item) => total + item.harga * item.qty, 0);
}
