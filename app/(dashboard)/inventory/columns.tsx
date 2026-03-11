"use client";

import { StatusBadge } from "@/components/shared/status-badge";
import type { InventoryItem } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";

export const inventoryColumns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-muted">
          {row.original.productImage && (
            <img
              src={row.original.productImage}
              alt={row.original.productName}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div>
          <Link
            href={`/products/${row.original.productId}/edit`}
            className="font-medium text-primary hover:underline"
          >
            {row.original.productName}
          </Link>
          <p className="text-xs text-muted-foreground">{row.original.sku}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "currentStock",
    header: "Stock",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.currentStock}</span>
    ),
  },
  {
    accessorKey: "lowStockThreshold",
    header: "Low Stock At",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "lastRestockedAt",
    header: "Last Restocked",
    cell: ({ row }) =>
      row.original.lastRestockedAt
        ? format(new Date(row.original.lastRestockedAt), "MMM d, yyyy")
        : "—",
  },
];
