"use client";

import { DiscountFormComponent } from "@/components/discounts/discount-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewDiscountPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/discounts">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Create Discount</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Set up a new discount code
          </p>
        </div>
      </div>

      <DiscountFormComponent />
    </div>
  );
}
