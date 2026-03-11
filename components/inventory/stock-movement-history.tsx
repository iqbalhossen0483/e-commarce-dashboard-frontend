"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockStockMovements } from "@/lib/mock/inventory";
import { mockProducts } from "@/lib/mock/products";
import { format } from "date-fns";
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";

const typeConfig = {
  in: { icon: ArrowDown, label: "Stock In", variant: "default" as const, color: "text-success" },
  out: { icon: ArrowUp, label: "Stock Out", variant: "secondary" as const, color: "text-destructive" },
  adjustment: { icon: RefreshCw, label: "Adjustment", variant: "outline" as const, color: "text-warning" },
};

interface StockMovementHistoryProps {
  productId?: string;
}

export function StockMovementHistory({ productId }: StockMovementHistoryProps) {
  const movements = productId
    ? mockStockMovements.filter((m) => m.productId === productId)
    : mockStockMovements;

  const sorted = [...movements].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Stock Movement History
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        {sorted.length === 0 ? (
          <p className="px-6 pb-6 text-sm text-muted-foreground">
            No stock movements recorded.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Type</TableHead>
                {!productId && <TableHead>Product</TableHead>}
                <TableHead>Quantity</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>By</TableHead>
                <TableHead className="pr-6">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((movement) => {
                const config = typeConfig[movement.type];
                const Icon = config.icon;
                const product = mockProducts.find(
                  (p) => p.id === movement.productId
                );

                return (
                  <TableRow key={movement.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-3.5 w-3.5 ${config.color}`} />
                        <Badge variant={config.variant} className="text-xs">
                          {config.label}
                        </Badge>
                      </div>
                    </TableCell>
                    {!productId && (
                      <TableCell className="text-sm">
                        {product?.name ?? movement.productId}
                      </TableCell>
                    )}
                    <TableCell>
                      <span
                        className={`font-medium ${
                          movement.type === "in"
                            ? "text-success"
                            : movement.type === "out"
                              ? "text-destructive"
                              : ""
                        }`}
                      >
                        {movement.type === "in" ? "+" : movement.type === "out" ? "-" : ""}
                        {Math.abs(movement.quantity)}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {movement.reason}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {movement.createdBy}
                    </TableCell>
                    <TableCell className="pr-6 text-sm text-muted-foreground">
                      {format(new Date(movement.createdAt), "MMM d, yyyy")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
