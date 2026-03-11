"use client";

import { DataTable } from "@/components/shared/data-table";
import type { FacetedFilter } from "@/components/shared/data-table-toolbar";
import { mockOrders } from "@/lib/mock/orders";
import { orderColumns } from "./columns";

const statusFilter: FacetedFilter = {
  columnId: "status",
  title: "Status",
  options: [
    { label: "Pending", value: "pending" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Refunded", value: "refunded" },
  ],
};

const paymentFilter: FacetedFilter = {
  columnId: "paymentStatus",
  title: "Payment",
  options: [
    { label: "Pending", value: "pending" },
    { label: "Paid", value: "paid" },
    { label: "Failed", value: "failed" },
    { label: "Refunded", value: "refunded" },
  ],
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and track customer orders
        </p>
      </div>

      <DataTable
        columns={orderColumns}
        data={mockOrders}
        searchKey="orderNumber"
        searchPlaceholder="Search orders..."
        facetedFilters={[statusFilter, paymentFilter]}
      />
    </div>
  );
}
