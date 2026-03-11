"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormReturn } from "react-hook-form";
import type { ProductFormValues } from "@/validators/product";

interface Props {
  form: UseFormReturn<ProductFormValues>;
}

export function ProductFormSEO({ form }: Props) {
  const { register, watch } = form;

  const metaTitle = watch("seo.metaTitle") ?? "";
  const metaDescription = watch("seo.metaDescription") ?? "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">SEO</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="seo.metaTitle">Meta Title</Label>
            <span
              className={`text-xs ${metaTitle.length > 70 ? "text-destructive" : "text-muted-foreground"}`}
            >
              {metaTitle.length}/70
            </span>
          </div>
          <Input
            id="seo.metaTitle"
            placeholder="Page title for search engines"
            {...register("seo.metaTitle")}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="seo.metaDescription">Meta Description</Label>
            <span
              className={`text-xs ${metaDescription.length > 160 ? "text-destructive" : "text-muted-foreground"}`}
            >
              {metaDescription.length}/160
            </span>
          </div>
          <textarea
            id="seo.metaDescription"
            rows={3}
            placeholder="Brief description for search results"
            className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 resize-none"
            {...register("seo.metaDescription")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="seo.urlHandle">URL Handle</Label>
          <Input
            id="seo.urlHandle"
            placeholder="product-url-handle"
            {...register("seo.urlHandle")}
          />
        </div>
      </CardContent>
    </Card>
  );
}
