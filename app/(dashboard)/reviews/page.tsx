"use client";

import { DataTable } from "@/components/shared/data-table";
import { mockReviews } from "@/lib/mock/reviews";
import { reviewColumns } from "./columns";

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage customer reviews and ratings
        </p>
      </div>

      <DataTable
        columns={reviewColumns}
        data={mockReviews}
        searchKey="productName"
        searchPlaceholder="Search by product..."
        facetedFilters={[
          {
            columnId: "status",
            title: "Status",
            options: [
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ],
          },
        ]}
      />
    </div>
  );
}
