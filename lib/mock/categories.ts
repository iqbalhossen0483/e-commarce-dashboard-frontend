import type { Category } from "@/types";

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and gadgets",
    parentId: null,
    productCount: 2,
    order: 1,
    children: [
      { id: "cat-2", name: "Phones", slug: "phones", parentId: "cat-1", productCount: 2, order: 1 },
      { id: "cat-3", name: "Laptops", slug: "laptops", parentId: "cat-1", productCount: 1, order: 2 },
      { id: "cat-4", name: "Tablets", slug: "tablets", parentId: "cat-1", productCount: 1, order: 3 },
    ],
  },
  {
    id: "cat-5",
    name: "Accessories",
    slug: "accessories",
    description: "Gadgets and accessories",
    parentId: null,
    productCount: 3,
    order: 2,
  },
  {
    id: "cat-6",
    name: "Clothing",
    slug: "clothing",
    description: "Fashion and apparel",
    parentId: null,
    productCount: 0,
    order: 3,
    children: [
      { id: "cat-7", name: "Men's Clothing", slug: "mens-clothing", parentId: "cat-6", productCount: 3, order: 1 },
      { id: "cat-8", name: "Women's Clothing", slug: "womens-clothing", parentId: "cat-6", productCount: 1, order: 2 },
    ],
  },
  {
    id: "cat-9",
    name: "Home & Living",
    slug: "home-living",
    description: "Home appliances and decor",
    parentId: null,
    productCount: 1,
    order: 4,
  },
];
