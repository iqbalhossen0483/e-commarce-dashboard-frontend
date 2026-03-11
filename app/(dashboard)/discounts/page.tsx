"use client";

import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { mockDiscounts } from "@/lib/mock/discounts";
import { Plus } from "lucide-react";
import Link from "next/link";
import { discountColumns } from "./columns";

export default function DiscountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Discounts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage discount codes and promotions
          </p>
        </div>
        <Link href="/discounts/new">
          <Button>
            <Plus className="mr-1.5 h-4 w-4" />
            Create Discount
          </Button>
        </Link>
      </div>

      <DataTable
        columns={discountColumns}
        data={mockDiscounts}
        searchKey="code"
        searchPlaceholder="Search discount codes..."
        facetedFilters={[
          {
            columnId: "status",
            title: "Status",
            options: [
              { label: "Active", value: "active" },
              { label: "Scheduled", value: "scheduled" },
              { label: "Expired", value: "expired" },
            ],
          },
          {
            columnId: "type",
            title: "Type",
            options: [
              { label: "Percentage", value: "percentage" },
              { label: "Fixed Amount", value: "fixed_amount" },
              { label: "Free Shipping", value: "free_shipping" },
            ],
          },
        ]}
      />
    </div>
  );
}
