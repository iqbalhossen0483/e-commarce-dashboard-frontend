"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTopProducts } from "@/lib/mock/analytics";
import { Package } from "lucide-react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

export function TopProductsWidget() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Top Products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockTopProducts.map((product, index) => (
          <div key={product.id} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {index + 1}
            </span>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground">
                {product.unitsSold} sold
              </p>
            </div>
            <p className="shrink-0 text-sm font-medium">
              {formatCurrency(product.revenue)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
