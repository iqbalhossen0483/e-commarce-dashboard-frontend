"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types";
import {
  ChevronRight,
  Folder,
  FolderOpen,
  GripVertical,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryTreeProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onAddChild: (parentId: string) => void;
}

export function CategoryTree({
  categories,
  onEdit,
  onDelete,
  onAddChild,
}: CategoryTreeProps) {
  return (
    <div className="space-y-0.5">
      {categories.map((category) => (
        <CategoryNode
          key={category.id}
          category={category}
          depth={0}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddChild={onAddChild}
        />
      ))}
    </div>
  );
}

interface CategoryNodeProps {
  category: Category;
  depth: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onAddChild: (parentId: string) => void;
}

function CategoryNode({
  category,
  depth,
  onEdit,
  onDelete,
  onAddChild,
}: CategoryNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = category.children && category.children.length > 0;

  return (
    <div>
      <div
        className="group flex items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-muted/50"
        style={{ paddingLeft: `${depth * 24 + 8}px` }}
      >
        <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground opacity-0 group-hover:opacity-100" />

        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded transition-transform",
            !hasChildren && "invisible",
          )}
        >
          <ChevronRight
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform",
              expanded && "rotate-90",
            )}
          />
        </button>

        {/* Icon */}
        {hasChildren && expanded ? (
          <FolderOpen className="h-4 w-4 shrink-0 text-primary" />
        ) : (
          <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}

        {/* Name + count */}
        <span className="flex-1 truncate text-sm font-medium">
          {category.name}
        </span>
        <span className="shrink-0 text-xs text-muted-foreground">
          {category.productCount} products
        </span>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-7 w-7 opacity-0 group-hover:opacity-100",
            )}
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onAddChild(category.id)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Subcategory
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(category)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(category)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div>
          {category.children!.map((child) => (
            <CategoryNode
              key={child.id}
              category={child}
              depth={depth + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
}
