"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTopProducts } from "@/lib/mock/analytics";
import { mockProducts } from "@/lib/mock/products";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

export function TopProductsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Top Selling Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTopProducts.map((product, i) => (
            <div key={product.id} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {product.unitsSold} units sold
                </p>
              </div>
              <span className="text-sm font-semibold">
                {formatCurrency(product.revenue)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductPerformanceTable() {
  const products = mockProducts
    .filter((p) => p.status === "active")
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Product Stock Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {products.map((product) => {
            const pct = Math.min(
              100,
              (product.stock / (product.lowStockThreshold * 5)) * 100
            );
            const color =
              product.stock <= product.lowStockThreshold
                ? "bg-destructive"
                : product.stock <= product.lowStockThreshold * 2
                  ? "bg-warning"
                  : "bg-success";

            return (
              <div key={product.id} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate font-medium">{product.name}</span>
                  <span className="shrink-0 text-muted-foreground">
                    {product.stock} units
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
