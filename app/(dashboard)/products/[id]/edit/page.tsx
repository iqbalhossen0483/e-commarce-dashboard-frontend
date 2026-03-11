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
  type ProductFormValues,
} from "@/validators/product";
import { mockProducts } from "@/lib/mock/products";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function ProductEditPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const product = mockProducts.find((p) => p.id === productId);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          description: product.description,
          status: product.status,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          costPrice: product.costPrice,
          categoryId: product.categoryId,
          tags: product.tags,
          sku: product.sku,
          barcode: product.barcode ?? "",
          trackInventory: product.trackInventory,
          stock: product.stock,
          lowStockThreshold: product.lowStockThreshold,
          variants: product.variants,
          seo: product.seo,
        }
      : undefined,
  });

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold">Product not found</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/products" className="mt-4">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }

  const onSubmit = (data: ProductFormValues) => {
    console.log("Update product:", data);
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
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {product.name}
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
            Save Changes
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
