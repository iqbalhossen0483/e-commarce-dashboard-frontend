"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProducts } from "@/lib/mock/products";
import { AlertTriangle, Package } from "lucide-react";
import Link from "next/link";

export function LowStockAlerts() {
  const lowStockProducts = mockProducts
    .filter((p) => p.trackInventory && p.stock <= p.lowStockThreshold)
    .sort((a, b) => a.stock - b.stock);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Low Stock Alerts</CardTitle>
        {lowStockProducts.length > 0 && (
          <span className="flex items-center gap-1 text-xs font-medium text-destructive">
            <AlertTriangle className="h-3.5 w-3.5" />
            {lowStockProducts.length} items
          </span>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {lowStockProducts.length === 0 ? (
          <p className="text-sm text-muted-foreground">All products are well stocked.</p>
        ) : (
          lowStockProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}/edit`}
              className="flex items-center gap-3 rounded-md p-1 transition-colors hover:bg-muted"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.sku}</p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${
                    product.stock === 0
                      ? "text-destructive"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                </p>
                <p className="text-xs text-muted-foreground">
                  Threshold: {product.lowStockThreshold}
                </p>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
}
