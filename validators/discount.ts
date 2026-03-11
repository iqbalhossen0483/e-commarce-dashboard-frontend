import { z } from "zod/v4";

export const discountSchema = z.object({
  code: z
    .string()
    .min(3, "Code must be at least 3 characters")
    .max(20, "Code must be at most 20 characters")
    .transform((v) => v.toUpperCase()),
  type: z.enum(["percentage", "fixed_amount", "free_shipping"]),
  value: z.number().min(0, "Value must be positive"),
  minOrderAmount: z.number().min(0).optional(),
  maxDiscountCap: z.number().min(0).optional(),
  usageLimit: z.number().int().min(0).optional(),
  usageLimitPerCustomer: z.number().int().min(0).optional(),
  applicableProductIds: z.array(z.string()),
  applicableCategoryIds: z.array(z.string()),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export type DiscountForm = z.infer<typeof discountSchema>;
