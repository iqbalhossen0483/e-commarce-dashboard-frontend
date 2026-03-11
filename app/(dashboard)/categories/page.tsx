"use client";

import { CategoryTree } from "@/components/products/category-tree";
import { CategoryFormModal } from "@/components/products/category-form-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCategories } from "@/lib/mock/categories";
import type { Category } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CategoriesPage() {
  const [categories] = useState(mockCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);

  const handleAddRoot = () => {
    setEditingCategory(null);
    setParentId(null);
    setModalOpen(true);
  };

  const handleAddChild = (parentId: string) => {
    setEditingCategory(null);
    setParentId(parentId);
    setModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setParentId(null);
    setModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    console.log("Delete category:", category.id);
  };

  const handleSave = (data: {
    name: string;
    slug: string;
    description: string;
    parentId: string | null;
  }) => {
    if (editingCategory) {
      console.log("Update category:", editingCategory.id, data);
    } else {
      console.log("Create category:", data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize your products into categories
          </p>
        </div>
        <Button onClick={handleAddRoot}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Category Tree</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No categories yet. Create your first category to get started.
            </p>
          ) : (
            <CategoryTree
              categories={categories}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddChild={handleAddChild}
            />
          )}
        </CardContent>
      </Card>

      <CategoryFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        category={editingCategory}
        parentId={parentId}
        onSave={handleSave}
      />
    </div>
  );
}
