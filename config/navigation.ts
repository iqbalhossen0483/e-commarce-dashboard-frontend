import type { Role } from "@/types";
import {
  BarChart3,
  FolderTree,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Star,
  Ticket,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

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
        href: "/products",
        icon: Package,
        roles: ["super_admin", "admin", "seller"],
      },
      {
        title: "Categories",
        href: "/categories",
        icon: FolderTree,
        roles: ["super_admin", "admin"],
      },
      {
        title: "Inventory",
        href: "/inventory",
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
        href: "/orders",
        icon: ShoppingCart,
        roles: ["super_admin", "admin", "seller", "support"],
      },
      {
        title: "Customers",
        href: "/customers",
        icon: Users,
        roles: ["super_admin", "admin", "support"],
      },
      {
        title: "Discounts",
        href: "/discounts",
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
        href: "/analytics",
        icon: BarChart3,
        roles: ["super_admin", "admin", "seller"],
      },
      {
        title: "Reviews",
        href: "/reviews",
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
        href: "/settings",
        icon: Settings,
        roles: ["super_admin", "admin", "seller"],
      },
    ],
  },
];
