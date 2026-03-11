import { z } from "zod/v4";

const variantSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Variant name is required"),
  sku: z.string().min(1, "Variant SKU is required"),
  price: z.number().min(0, "Price must be positive"),
  stock: z.number().int().min(0, "Stock must be non-negative"),
  options: z.record(z.string(), z.string()),
});

const seoSchema = z.object({
  metaTitle: z.string().max(70, "Meta title should be under 70 characters").optional().or(z.literal("")),
  metaDescription: z.string().max(160, "Meta description should be under 160 characters").optional().or(z.literal("")),
  urlHandle: z.string().optional().or(z.literal("")),
});

export const productSchema = z.object({
  // Basic Info
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional().or(z.literal("")),
  status: z.enum(["draft", "active", "archived"]),

  // Pricing
  price: z.number().min(0, "Price must be positive"),
  compareAtPrice: z.number().min(0).optional(),
  costPrice: z.number().min(0).optional(),

  // Organization
  categoryId: z.string().min(1, "Category is required"),
  tags: z.array(z.string()),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional().or(z.literal("")),

  // Inventory
  trackInventory: z.boolean(),
  stock: z.number().int().min(0, "Stock must be non-negative"),
  lowStockThreshold: z.number().int().min(0),

  // Variants
  variants: z.array(variantSchema),

  // SEO
  seo: seoSchema.optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const productDefaultValues: ProductFormValues = {
  name: "",
  slug: "",
  description: "",
  status: "draft",
  price: 0,
  compareAtPrice: undefined,
  costPrice: undefined,
  categoryId: "",
  tags: [],
  sku: "",
  barcode: "",
  trackInventory: true,
  stock: 0,
  lowStockThreshold: 10,
  variants: [],
  seo: {
    metaTitle: "",
    metaDescription: "",
    urlHandle: "",
  },
};
