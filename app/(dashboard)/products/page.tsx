"use client";

import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/mock/products";
import type { Product } from "@/types";
import { Plus, Trash2, Download } from "lucide-react";
import Link from "next/link";
import { productColumns } from "./columns";
import type { BulkAction } from "@/components/shared/data-table-bulk-actions";
import type { FacetedFilter } from "@/components/shared/data-table-toolbar";

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  options: [
    { label: "Active", value: "active" },
    { label: "Draft", value: "draft" },
    { label: "Archived", value: "archived" },
  ],
};

const categoryFilter: FacetedFilter = {
  columnId: "categoryName",
  title: "Category",
  options: Array.from(new Set(mockProducts.map((p) => p.categoryName))).map(
    (cat) => ({ label: cat, value: cat }),
  ),
};

const bulkActions: BulkAction<Product>[] = [
  {
    label: "Delete",
    icon: Trash2,
    variant: "destructive",
    onClick: (rows) => {
      console.log("Delete", rows.length, "products");
    },
  },
  {
    label: "Export",
    icon: Download,
    variant: "outline",
    onClick: (rows) => {
      console.log("Export", rows.length, "products");
    },
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your product catalog
          </p>
        </div>
        <Link href="/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <DataTable
        columns={productColumns}
        data={mockProducts}
        searchKey="name"
        searchPlaceholder="Search products..."
        facetedFilters={[statusFilter, categoryFilter]}
        bulkActions={bulkActions}
      />
    </div>
  );
}
