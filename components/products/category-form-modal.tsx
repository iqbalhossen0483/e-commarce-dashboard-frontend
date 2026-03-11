"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockCategories } from "@/lib/mock/categories";
import type { Category } from "@/types";
import { useEffect, useState } from "react";

interface CategoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  parentId?: string | null;
  onSave: (data: {
    name: string;
    slug: string;
    description: string;
    parentId: string | null;
  }) => void;
}

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function flattenCategories(
  categories: Category[],
  depth = 0,
): { id: string; name: string; depth: number }[] {
  const result: { id: string; name: string; depth: number }[] = [];
  for (const cat of categories) {
    result.push({ id: cat.id, name: cat.name, depth });
    if (cat.children) {
      result.push(...flattenCategories(cat.children, depth + 1));
    }
  }
  return result;
}

const flatCategories = flattenCategories(mockCategories);

export function CategoryFormModal({
  open,
  onOpenChange,
  category,
  parentId,
  onSave,
}: CategoryFormModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);

  const isEditing = !!category;

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSlug(category.slug);
      setDescription(category.description ?? "");
      setSelectedParentId(category.parentId);
    } else {
      setName("");
      setSlug("");
      setDescription("");
      setSelectedParentId(parentId ?? null);
    }
  }, [category, parentId, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      slug,
      description,
      parentId: selectedParentId,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>
          {isEditing ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Update the category details below."
            : "Fill in the details to create a new category."}
        </DialogDescription>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="cat-name">Name</Label>
            <Input
              id="cat-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!isEditing) {
                  setSlug(generateSlug(e.target.value));
                }
              }}
              placeholder="e.g. Electronics"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cat-slug">Slug</Label>
            <Input
              id="cat-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="electronics"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cat-parent">Parent Category</Label>
            <select
              id="cat-parent"
              className="h-8 w-full rounded-lg border border-border bg-background px-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
              value={selectedParentId ?? ""}
              onChange={(e) =>
                setSelectedParentId(e.target.value || null)
              }
            >
              <option value="">None (root category)</option>
              {flatCategories
                .filter((c) => c.id !== category?.id)
                .map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {"—".repeat(cat.depth)} {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cat-desc">Description</Label>
            <textarea
              id="cat-desc"
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <DialogClose
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Cancel
            </DialogClose>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Create Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
