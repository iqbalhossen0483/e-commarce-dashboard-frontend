"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormReturn } from "react-hook-form";
import type { ProductFormValues } from "@/validators/product";

interface Props {
  form: UseFormReturn<ProductFormValues>;
}

export function ProductFormInventory({ form }: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const trackInventory = watch("trackInventory");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Inventory</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="rounded border-input"
            checked={trackInventory}
            onChange={(e) => setValue("trackInventory", e.target.checked)}
          />
          Track inventory for this product
        </label>

        {trackInventory && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                placeholder="0"
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <p className="text-xs text-destructive">
                  {errors.stock.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
              <Input
                id="lowStockThreshold"
                type="number"
                min="0"
                placeholder="10"
                {...register("lowStockThreshold", { valueAsNumber: true })}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
