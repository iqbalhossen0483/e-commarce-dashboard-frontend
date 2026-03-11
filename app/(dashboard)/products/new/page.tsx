"use client";

import { ProductFormBasic } from "@/components/products/product-form-basic";
import { ProductFormPricing } from "@/components/products/product-form-pricing";
import { ProductFormOrganization } from "@/components/products/product-form-organization";
import { ProductFormMedia } from "@/components/products/product-form-media";
import { ProductFormVariants } from "@/components/products/product-form-variants";
import { ProductFormInventory } from "@/components/products/product-form-inventory";
import { ProductFormSEO } from "@/components/products/product-form-seo";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  productDefaultValues,
  type ProductFormValues,
} from "@/validators/product";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductCreatePage() {
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaultValues,
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Create product:", data);
    router.push("/products");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/products">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Add Product</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Create a new product in your catalog
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/products">
            <Button type="button" variant="outline">
              Discard
            </Button>
          </Link>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Save Product
          </Button>
        </div>
      </div>

      {/* Form sections */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ProductFormBasic form={form} />
          <ProductFormMedia />
          <ProductFormPricing form={form} />
          <ProductFormVariants form={form} />
        </div>
        <div className="space-y-6">
          <ProductFormOrganization form={form} />
          <ProductFormInventory form={form} />
          <ProductFormSEO form={form} />
        </div>
      </div>
    </form>
  );
}
