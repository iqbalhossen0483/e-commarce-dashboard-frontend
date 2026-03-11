"use client";

import { DataTable } from "@/components/shared/data-table";
import { mockReviews } from "@/lib/mock/reviews";
import type { Review, ReviewStatus } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { createReviewColumns } from "./columns";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const handleStatusChange = useCallback((id: string, status: ReviewStatus) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  }, []);

  const columns = useMemo(
    () => createReviewColumns(handleStatusChange),
    [handleStatusChange]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage customer reviews and ratings
        </p>
      </div>

      <DataTable
        columns={columns}
        data={reviews}
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
