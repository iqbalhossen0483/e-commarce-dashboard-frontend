"use client";

import { CategoryFormModal } from "@/components/products/category-form-modal";
import { CategoryTree } from "@/components/products/category-tree";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCategories } from "@/lib/mock/categories";
import type { Category } from "@/types";
import { Plus } from "lucide-react";
import { useCallback, useState } from "react";

let nextId = 100;

function addCategoryToTree(
  categories: Category[],
  parentId: string | null,
  newCat: Category,
): Category[] {
  if (!parentId) return [...categories, newCat];
  return categories.map((cat) => {
    if (cat.id === parentId) {
      return { ...cat, children: [...(cat.children ?? []), newCat] };
    }
    if (cat.children) {
      return {
        ...cat,
        children: addCategoryToTree(cat.children, parentId, newCat),
      };
    }
    return cat;
  });
}

function updateCategoryInTree(
  categories: Category[],
  id: string,
  data: { name: string; slug: string; description: string },
): Category[] {
  return categories.map((cat) => {
    if (cat.id === id) {
      return {
        ...cat,
        name: data.name,
        slug: data.slug,
        description: data.description,
      };
    }
    if (cat.children) {
      return { ...cat, children: updateCategoryInTree(cat.children, id, data) };
    }
    return cat;
  });
}

function deleteCategoryFromTree(
  categories: Category[],
  id: string,
): Category[] {
  return categories
    .filter((cat) => cat.id !== id)
    .map((cat) => {
      if (cat.children) {
        return { ...cat, children: deleteCategoryFromTree(cat.children, id) };
      }
      return cat;
    });
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);

  const handleAddRoot = () => {
    setEditingCategory(null);
    setParentId(null);
    setModalOpen(true);
  };

  const handleAddChild = (pid: string) => {
    setEditingCategory(null);
    setParentId(pid);
    setModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setParentId(null);
    setModalOpen(true);
  };

  const handleDelete = useCallback((category: Category) => {
    setCategories((prev) => deleteCategoryFromTree(prev, category.id));
  }, []);

  const handleSave = useCallback(
    (data: {
      name: string;
      slug: string;
      description: string;
      parentId: string | null;
    }) => {
      if (editingCategory) {
        setCategories((prev) =>
          updateCategoryInTree(prev, editingCategory.id, data),
        );
      } else {
        const newCat: Category = {
          id: `cat-${nextId++}`,
          name: data.name,
          slug: data.slug,
          description: data.description,
          parentId: data.parentId,
          productCount: 0,
          order: 0,
        };
        setCategories((prev) => addCategoryToTree(prev, data.parentId, newCat));
      }
    },
    [editingCategory],
  );

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
