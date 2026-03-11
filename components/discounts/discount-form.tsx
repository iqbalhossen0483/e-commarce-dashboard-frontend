"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Discount } from "@/types";
import { type DiscountForm, discountSchema } from "@/validators/discount";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

interface DiscountFormProps {
  discount?: Discount;
}

export function DiscountFormComponent({ discount }: DiscountFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<DiscountForm>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      code: discount?.code ?? "",
      type: discount?.type ?? "percentage",
      value: discount?.value ?? 0,
      minOrderAmount: discount?.minOrderAmount ?? undefined,
      maxDiscountCap: discount?.maxDiscountCap ?? undefined,
      usageLimit: discount?.usageLimit ?? undefined,
      usageLimitPerCustomer: discount?.usageLimitPerCustomer ?? undefined,
      applicableProductIds: discount?.applicableProductIds ?? [],
      applicableCategoryIds: discount?.applicableCategoryIds ?? [],
      startDate: discount?.startDate?.split("T")[0] ?? "",
      endDate: discount?.endDate?.split("T")[0] ?? "",
    },
  });

  const discountType = watch("type");

  const onSubmit = (data: DiscountForm) => {
    console.log("Discount form submitted:", data);
    router.push("/discounts");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Discount Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="code">Discount Code</Label>
              <Input
                id="code"
                placeholder="e.g. SUMMER25"
                {...register("code")}
              />
              {errors.code && (
                <p className="text-xs text-destructive">{errors.code.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Type</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                      <SelectItem value="free_shipping">
                        Free Shipping
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {discountType !== "free_shipping" && (
              <div className="space-y-1.5">
                <Label htmlFor="value">
                  {discountType === "percentage" ? "Percentage (%)" : "Amount ($)"}
                </Label>
                <Input
                  id="value"
                  type="number"
                  step={discountType === "percentage" ? "1" : "0.01"}
                  {...register("value")}
                />
                {errors.value && (
                  <p className="text-xs text-destructive">
                    {errors.value.message}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="minOrderAmount">Min Order Amount</Label>
                <Input
                  id="minOrderAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register("minOrderAmount")}
                />
              </div>
              {discountType === "percentage" && (
                <div className="space-y-1.5">
                  <Label htmlFor="maxDiscountCap">Max Discount Cap</Label>
                  <Input
                    id="maxDiscountCap"
                    type="number"
                    step="0.01"
                    placeholder="No limit"
                    {...register("maxDiscountCap")}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Usage & Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usage & Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="usageLimit">Total Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  placeholder="Unlimited"
                  {...register("usageLimit")}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="usageLimitPerCustomer">Per Customer</Label>
                <Input
                  id="usageLimitPerCustomer"
                  type="number"
                  placeholder="Unlimited"
                  {...register("usageLimitPerCustomer")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="startDate">Start Date</Label>
                <Input id="startDate" type="date" {...register("startDate")} />
                {errors.startDate && (
                  <p className="text-xs text-destructive">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" {...register("endDate")} />
                {errors.endDate && (
                  <p className="text-xs text-destructive">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/discounts")}
        >
          Cancel
        </Button>
        <Button type="submit">
          <Save className="mr-1.5 h-4 w-4" />
          {discount ? "Update Discount" : "Create Discount"}
        </Button>
      </div>
    </form>
  );
}
