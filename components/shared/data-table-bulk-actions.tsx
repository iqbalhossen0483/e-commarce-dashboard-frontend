"use client";

import { Button } from "@/components/ui/button";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface BulkAction<TData> {
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  onClick: (rows: TData[]) => void;
}

interface DataTableBulkActionsProps<TData> {
  table: Table<TData>;
  actions: BulkAction<TData>[];
}

export function DataTableBulkActions<TData>({
  table,
  actions,
}: DataTableBulkActionsProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const count = selectedRows.length;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2">
      <span className="text-sm font-medium">
        {count} row{count !== 1 ? "s" : ""} selected
      </span>

      <div className="ml-auto flex items-center gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant={action.variant ?? "outline"}
              size="sm"
              className="h-8"
              onClick={() => action.onClick(selectedRows.map((r) => r.original))}
            >
              {Icon && <Icon className="mr-1.5 h-3.5 w-3.5" />}
              {action.label}
            </Button>
          );
        })}

        <Button
          variant="ghost"
          size="sm"
          className="h-8"
          onClick={() => table.toggleAllRowsSelected(false)}
        >
          <X className="mr-1 h-3.5 w-3.5" />
          Clear
        </Button>
      </div>
    </div>
  );
}
