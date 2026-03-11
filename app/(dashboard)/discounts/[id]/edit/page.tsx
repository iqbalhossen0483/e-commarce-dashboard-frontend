"use client";

import { DiscountFormComponent } from "@/components/discounts/discount-form";
import { Button } from "@/components/ui/button";
import { mockDiscounts } from "@/lib/mock/discounts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditDiscountPage() {
  const params = useParams();
  const discountId = params.id as string;
  const discount = mockDiscounts.find((d) => d.id === discountId);

  if (!discount) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold">Discount not found</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The discount you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/discounts" className="mt-4">
          <Button variant="outline">Back to Discounts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/discounts">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit {discount.code}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Update discount settings
          </p>
        </div>
      </div>

      <DiscountFormComponent discount={discount} />
    </div>
  );
}
