import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  BarChart3,
  Warehouse,
  Ticket,
  Star,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/types";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: Role[];
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["super_admin", "admin", "seller", "support"],
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        title: "Products",
        href: "/dashboard/products",
        icon: Package,
        roles: ["super_admin", "admin", "seller"],
      },
      {
        title: "Categories",
        href: "/dashboard/categories",
        icon: FolderTree,
        roles: ["super_admin", "admin"],
      },
      {
        title: "Inventory",
        href: "/dashboard/inventory",
        icon: Warehouse,
        roles: ["super_admin", "admin", "seller"],
      },
    ],
  },
  {
    label: "Sales",
    items: [
      {
        title: "Orders",
        href: "/dashboard/orders",
        icon: ShoppingCart,
        roles: ["super_admin", "admin", "seller", "support"],
      },
      {
        title: "Customers",
        href: "/dashboard/customers",
        icon: Users,
        roles: ["super_admin", "admin", "support"],
      },
      {
        title: "Discounts",
        href: "/dashboard/discounts",
        icon: Ticket,
        roles: ["super_admin", "admin"],
      },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        title: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
        roles: ["super_admin", "admin", "seller"],
      },
      {
        title: "Reviews",
        href: "/dashboard/reviews",
        icon: Star,
        roles: ["super_admin", "admin", "support"],
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        roles: ["super_admin", "admin", "seller"],
      },
    ],
  },
];
