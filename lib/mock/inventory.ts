import type { InventoryItem, StockMovement } from "@/types";
import { mockProducts } from "./products";

export const mockInventory: InventoryItem[] = mockProducts.map((p) => {
  const status =
    p.stock === 0
      ? "out_of_stock"
      : p.stock <= p.lowStockThreshold
        ? "low_stock"
        : "in_stock";

  return {
    id: `inv-${p.id}`,
    productId: p.id,
    productName: p.name,
    productImage: p.images[0] || "",
    sku: p.sku,
    currentStock: p.stock,
    lowStockThreshold: p.lowStockThreshold,
    status,
    lastRestockedAt: p.updatedAt,
  };
});

export const mockStockMovements: StockMovement[] = [
  { id: "sm-1", productId: "prod-1", type: "in", quantity: 50, reason: "Supplier restock", createdBy: "Admin", createdAt: "2026-03-10T14:00:00Z" },
  { id: "sm-2", productId: "prod-1", type: "out", quantity: 3, reason: "Order #ORD-2026-001", createdBy: "System", createdAt: "2026-03-10T16:30:00Z" },
  { id: "sm-3", productId: "prod-3", type: "in", quantity: 20, reason: "Supplier restock", createdBy: "Admin", createdAt: "2026-03-09T10:00:00Z" },
  { id: "sm-4", productId: "prod-4", type: "out", quantity: 5, reason: "Order #ORD-2026-003", createdBy: "System", createdAt: "2026-03-09T11:00:00Z" },
  { id: "sm-5", productId: "prod-8", type: "adjustment", quantity: -2, reason: "Damaged in warehouse", createdBy: "Admin", createdAt: "2026-03-08T09:00:00Z" },
  { id: "sm-6", productId: "prod-12", type: "in", quantity: 30, reason: "Supplier restock", createdBy: "Admin", createdAt: "2026-03-07T15:00:00Z" },
  { id: "sm-7", productId: "prod-5", type: "out", quantity: 2, reason: "Order #ORD-2026-005", createdBy: "System", createdAt: "2026-03-07T12:00:00Z" },
  { id: "sm-8", productId: "prod-2", type: "in", quantity: 25, reason: "Supplier restock", createdBy: "Admin", createdAt: "2026-03-06T10:00:00Z" },
  { id: "sm-9", productId: "prod-6", type: "adjustment", quantity: 5, reason: "Inventory count correction", createdBy: "Admin", createdAt: "2026-03-05T14:00:00Z" },
  { id: "sm-10", productId: "prod-10", type: "out", quantity: 1, reason: "Order #ORD-2026-010", createdBy: "System", createdAt: "2026-03-05T09:00:00Z" },
];
