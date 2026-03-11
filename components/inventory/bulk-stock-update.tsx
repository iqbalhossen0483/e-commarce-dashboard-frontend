"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InventoryItem } from "@/types";
import { Package } from "lucide-react";
import { useState } from "react";

interface BulkStockUpdateProps {
  items: InventoryItem[];
  onUpdate: (updates: { id: string; quantity: number }[]) => void;
}

export function BulkStockUpdate({ items, onUpdate }: BulkStockUpdateProps) {
  const [updates, setUpdates] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setUpdates((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    const parsed = Object.entries(updates)
      .filter(([, v]) => v !== "" && !isNaN(Number(v)))
      .map(([id, v]) => ({ id, quantity: Number(v) }));
    if (parsed.length > 0) {
      onUpdate(parsed);
      setUpdates({});
    }
  };

  const hasChanges = Object.values(updates).some(
    (v) => v !== "" && !isNaN(Number(v))
  );

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          Bulk Stock Update
        </CardTitle>
        <Button size="sm" disabled={!hasChanges} onClick={handleSave}>
          <Package className="mr-1.5 h-3.5 w-3.5" />
          Apply Changes
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-lg border border-border p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {item.productName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Current: {item.currentStock} units
                </p>
              </div>
              <input
                type="number"
                placeholder="New qty"
                className="w-24 rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                value={updates[item.id] ?? ""}
                onChange={(e) => handleChange(item.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
