"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { InventoryItem } from "@/types";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

interface LowStockConfigProps {
  items: InventoryItem[];
  onUpdateThreshold: (id: string, threshold: number) => void;
}

export function LowStockConfig({ items, onUpdateThreshold }: LowStockConfigProps) {
  const [thresholds, setThresholds] = useState<Record<string, string>>({});

  const lowStockItems = items.filter(
    (item) => item.status === "low_stock" || item.status === "out_of_stock"
  );

  const handleSave = (id: string) => {
    const val = thresholds[id];
    if (val && !isNaN(Number(val)) && Number(val) >= 0) {
      onUpdateThreshold(id, Number(val));
      setThresholds((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <CardTitle className="text-base font-medium">
            Low Stock Alerts
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {lowStockItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            All products are sufficiently stocked.
          </p>
        ) : (
          <div className="space-y-3">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                <div
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    item.status === "out_of_stock"
                      ? "bg-destructive"
                      : "bg-warning"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {item.productName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.currentStock} in stock · Alert at{" "}
                    {item.lowStockThreshold}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    placeholder={item.lowStockThreshold.toString()}
                    className="w-20 rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                    value={thresholds[item.id] ?? ""}
                    onChange={(e) =>
                      setThresholds((prev) => ({
                        ...prev,
                        [item.id]: e.target.value,
                      }))
                    }
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!thresholds[item.id]}
                    onClick={() => handleSave(item.id)}
                  >
                    Set
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
