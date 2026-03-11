"use client";

import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Discount, DiscountStatus } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Ban, MoreHorizontal, Pause, Play } from "lucide-react";

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

export const createDiscountColumns = (
  onStatusChange: (id: string, status: DiscountStatus) => void
): ColumnDef<Discount>[] => [
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
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const { id, status } = row.original;
      if (status === "expired") return null;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "h-8 w-8",
            })}
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {(status === "active" || status === "scheduled") && (
              <DropdownMenuItem onClick={() => onStatusChange(id, "paused")}>
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </DropdownMenuItem>
            )}
            {status === "paused" && (
              <DropdownMenuItem onClick={() => onStatusChange(id, "active")}>
                <Play className="mr-2 h-4 w-4" />
                Resume
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => onStatusChange(id, "expired")}
            >
              <Ban className="mr-2 h-4 w-4" />
              Stop
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
