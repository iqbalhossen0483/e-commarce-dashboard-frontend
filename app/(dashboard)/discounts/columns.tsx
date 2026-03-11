"use client";

import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import type { Discount } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

function formatValue(discount: Discount) {
  switch (discount.type) {
    case "percentage":
      return `${discount.value}%`;
    case "fixed_amount":
      return `$${discount.value.toFixed(2)}`;
    case "free_shipping":
      return "Free Shipping";
  }
}

export const discountColumns: ColumnDef<Discount>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <span className="font-mono font-medium">{row.original.code}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs capitalize">
        {row.original.type.replace("_", " ")}
      </Badge>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <span className="font-medium">{formatValue(row.original)}</span>
    ),
  },
  {
    accessorKey: "usageCount",
    header: "Usage",
    cell: ({ row }) => {
      const d = row.original;
      return (
        <span className="text-muted-foreground">
          {d.usageCount}
          {d.usageLimit ? ` / ${d.usageLimit}` : ""}
        </span>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Period",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {format(new Date(row.original.startDate), "MMM d")} –{" "}
        {format(new Date(row.original.endDate), "MMM d, yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
];
