// User & Auth
export type Role = "super_admin" | "admin" | "seller" | "support";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  isActive: boolean;
  lastActiveAt: string;
  createdAt: string;
}

// Products
export type ProductStatus = "draft" | "active" | "archived";

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  options: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  sku: string;
  barcode?: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  categoryId: string;
  categoryName: string;
  tags: string[];
  images: string[];
  variants: ProductVariant[];
  stock: number;
  lowStockThreshold: number;
  trackInventory: boolean;
  status: ProductStatus;
  seo: {
    metaTitle: string;
    metaDescription: string;
    urlHandle: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Categories
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId: string | null;
  children?: Category[];
  productCount: number;
  order: number;
}

// Orders
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  variantName?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderEvent {
  id: string;
  status: OrderStatus;
  note?: string;
  createdBy: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  notes: string[];
  timeline: OrderEvent[];
  createdAt: string;
  updatedAt: string;
}

// Customers
export interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  totalSpent: number;
  orderCount: number;
  averageOrderValue: number;
  tags: string[];
  notes: string[];
  createdAt: string;
}

// Reviews
export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  customerId: string;
  customerName: string;
  rating: number;
  title: string;
  body: string;
  status: ReviewStatus;
  reply?: string;
  createdAt: string;
}

// Discounts
export type DiscountType = "percentage" | "fixed_amount" | "free_shipping";
export type DiscountStatus = "active" | "scheduled" | "paused" | "expired";

export interface Discount {
  id: string;
  code: string;
  type: DiscountType;
  value: number;
  minOrderAmount?: number;
  maxDiscountCap?: number;
  usageLimit?: number;
  usageLimitPerCustomer?: number;
  usageCount: number;
  applicableProductIds: string[];
  applicableCategoryIds: string[];
  startDate: string;
  endDate: string;
  status: DiscountStatus;
  createdAt: string;
}

// Inventory
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  currentStock: number;
  lowStockThreshold: number;
  status: StockStatus;
  lastRestockedAt?: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: "in" | "out" | "adjustment";
  quantity: number;
  reason: string;
  createdBy: string;
  createdAt: string;
}

// Notifications
export type NotificationType =
  | "new_order"
  | "low_stock"
  | "new_customer"
  | "new_review"
  | "order_status";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// Analytics
export interface KPIData {
  label: string;
  value: number;
  previousValue: number;
  changePercent: number;
  trend: "up" | "down" | "neutral";
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface SalesByCategory {
  category: string;
  revenue: number;
  percentage: number;
}

export interface TopProduct {
  id: string;
  name: string;
  image: string;
  unitsSold: number;
  revenue: number;
}

export interface ActivityItem {
  id: string;
  type: "order" | "stock" | "customer" | "review";
  message: string;
  timestamp: string;
}
