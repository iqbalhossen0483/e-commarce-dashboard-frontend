"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Table } from "@tanstack/react-table";
import { Search, X, SlidersHorizontal, Columns3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface FacetedFilter {
  columnId: string;
  title: string;
  options: { label: string; value: string }[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  facetedFilters?: FacetedFilter[];
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
  facetedFilters,
}: DataTableToolbarProps<TData>) {
  const [searchValue, setSearchValue] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const isFiltered = table.getState().columnFilters.length > 0;

  useEffect(() => {
    if (!searchKey) return;

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      table.getColumn(searchKey)?.setFilterValue(searchValue || undefined);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchValue, searchKey, table]);

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-1 items-center gap-2">
        {/* Search */}
        {searchKey && (
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
        )}

        {/* Faceted Filters */}
        {facetedFilters?.map((filter) => (
          <FacetedFilterDropdown
            key={filter.columnId}
            table={table}
            filter={filter}
          />
        ))}

        {/* Active filter tags + clear */}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              table.resetColumnFilters();
              setSearchValue("");
            }}
            className="h-8 px-2 text-xs"
          >
            Reset
            <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Column visibility */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8")}
        >
          <Columns3 className="mr-2 h-4 w-4" />
          Columns
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {table
            .getAllColumns()
            .filter((col) => col.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {formatColumnId(column.id)}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function FacetedFilterDropdown<TData>({
  table,
  filter,
}: {
  table: Table<TData>;
  filter: FacetedFilter;
}) {
  const column = table.getColumn(filter.columnId);
  const selectedValues = new Set(
    (column?.getFilterValue() as string[] | undefined) ?? [],
  );

  const toggleValue = (value: string) => {
    const next = new Set(selectedValues);
    if (next.has(value)) {
      next.delete(value);
    } else {
      next.add(value);
    }
    column?.setFilterValue(next.size ? Array.from(next) : undefined);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 border-dashed")}
      >
        <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
        {filter.title}
        {selectedValues.size > 0 && (
          <Badge variant="secondary" className="ml-2 rounded-sm px-1.5 text-xs">
            {selectedValues.size}
          </Badge>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {filter.options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedValues.has(option.value)}
            onCheckedChange={() => toggleValue(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
        {selectedValues.size > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={false}
              onCheckedChange={() => column?.setFilterValue(undefined)}
            >
              Clear filters
            </DropdownMenuCheckboxItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function formatColumnId(id: string) {
  return id
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}
