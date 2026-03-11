"use client";

import { BulkStockUpdate } from "@/components/inventory/bulk-stock-update";
import { LowStockConfig } from "@/components/inventory/low-stock-config";
import { StockMovementHistory } from "@/components/inventory/stock-movement-history";
import { DataTable } from "@/components/shared/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockInventory } from "@/lib/mock/inventory";
import type { InventoryItem } from "@/types";
import { useState } from "react";
import { inventoryColumns } from "./columns";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);

  const handleBulkUpdate = (updates: { id: string; quantity: number }[]) => {
    setInventory((prev) =>
      prev.map((item) => {
        const update = updates.find((u) => u.id === item.id);
        if (!update) return item;
        const newStock = update.quantity;
        const status =
          newStock === 0
            ? "out_of_stock"
            : newStock <= item.lowStockThreshold
              ? "low_stock"
              : "in_stock";
        return { ...item, currentStock: newStock, status };
      }),
    );
  };

  const handleUpdateThreshold = (id: string, threshold: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const status =
          item.currentStock === 0
            ? "out_of_stock"
            : item.currentStock <= threshold
              ? "low_stock"
              : "in_stock";
        return { ...item, lowStockThreshold: threshold, status };
      }),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inventory</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage stock levels and track movements
        </p>
      </div>

      <Tabs defaultValue="overview" className="flex-col">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bulk-update">Bulk Update</TabsTrigger>
          <TabsTrigger value="movements">Movements</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <DataTable
            columns={inventoryColumns}
            data={inventory}
            searchKey="productName"
            searchPlaceholder="Search products..."
            facetedFilters={[
              {
                columnId: "status",
                title: "Status",
                options: [
                  { label: "In Stock", value: "in_stock" },
                  { label: "Low Stock", value: "low_stock" },
                  { label: "Out of Stock", value: "out_of_stock" },
                ],
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="bulk-update" className="mt-4">
          <BulkStockUpdate items={inventory} onUpdate={handleBulkUpdate} />
        </TabsContent>

        <TabsContent value="movements" className="mt-4">
          <StockMovementHistory />
        </TabsContent>

        <TabsContent value="alerts" className="mt-4">
          <LowStockConfig
            items={inventory}
            onUpdateThreshold={handleUpdateThreshold}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
