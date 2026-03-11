"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormReturn } from "react-hook-form";
import type { ProductFormValues } from "@/validators/product";

interface Props {
  form: UseFormReturn<ProductFormValues>;
}

export function ProductFormPricing({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Pricing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-xs text-destructive">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="compareAtPrice">Compare-at Price ($)</Label>
            <Input
              id="compareAtPrice"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("compareAtPrice", { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="costPrice">Cost Price ($)</Label>
            <Input
              id="costPrice"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("costPrice", { valueAsNumber: true })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
