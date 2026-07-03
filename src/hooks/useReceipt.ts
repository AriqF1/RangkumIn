import { useEffect, useState } from "react";

import { ReceiptData, ReceiptItem } from "@/types/receipt";
import { calculateTotal } from "@/utils/receipt";

export function useReceipt(aiData: ReceiptData | null) {
  const [editableData, setEditableData] = useState<ReceiptData | null>(null);

  useEffect(() => {
    if (aiData) {
      setEditableData(aiData);
    }
  }, [aiData]);

  const handleItemChange = (
    index: number,
    field: keyof ReceiptItem,
    value: string | number,
  ) => {
    if (!editableData) return;

    const updatedItems = [...editableData.item_belanja];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "nama" ? value : Number(value),
    };

    setEditableData({
      ...editableData,
      item_belanja: updatedItems,
      total_harga: calculateTotal(updatedItems),
    });
  };

  const deleteItem = (index: number) => {
    if (!editableData) return;

    const updatedItems = editableData.item_belanja.filter(
      (_, i) => i !== index,
    );

    setEditableData({
      ...editableData,
      item_belanja: updatedItems,
      total_harga: calculateTotal(updatedItems),
    });
  };

  const addItem = () => {
    if (!editableData) return;

    setEditableData({
      ...editableData,
      item_belanja: [
        ...editableData.item_belanja,
        {
          nama: "Item Baru",
          harga: 0,
          qty: 1,
        },
      ],
    });
  };

  return {
    editableData,
    setEditableData,
    handleItemChange,
    deleteItem,
    addItem,
  };
}
