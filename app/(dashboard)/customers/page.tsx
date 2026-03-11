"use client";

import { DataTable } from "@/components/shared/data-table";
import { mockCustomers } from "@/lib/mock/customers";
import { customerColumns } from "./columns";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View and manage your customers
        </p>
      </div>

      <DataTable
        columns={customerColumns}
        data={mockCustomers}
        searchKey="name"
        searchPlaceholder="Search customers..."
      />
    </div>
  );
}
