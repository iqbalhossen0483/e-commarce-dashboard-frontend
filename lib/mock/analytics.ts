import type { KPIData, ChartDataPoint, SalesByCategory, TopProduct, ActivityItem } from "@/types";

export const mockKPIs: KPIData[] = [
  { label: "Total Revenue", value: 48250.50, previousValue: 42180.00, changePercent: 14.4, trend: "up" },
  { label: "Orders", value: 156, previousValue: 132, changePercent: 18.2, trend: "up" },
  { label: "Customers", value: 89, previousValue: 95, changePercent: -6.3, trend: "down" },
  { label: "Conversion Rate", value: 3.2, previousValue: 2.8, changePercent: 14.3, trend: "up" },
];

export const mockRevenueData: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date("2026-02-10");
  date.setDate(date.getDate() + i);
  const base = 1200 + Math.sin(i / 3) * 400;
  const noise = Math.random() * 300 - 150;
  return {
    date: date.toISOString().split("T")[0],
    value: Math.round((base + noise) * 100) / 100,
    label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  };
});

export const mockOrdersChartData: ChartDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date("2026-02-10");
  date.setDate(date.getDate() + i);
  return {
    date: date.toISOString().split("T")[0],
    value: Math.floor(3 + Math.random() * 8),
    label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  };
});

export const mockSalesByCategory: SalesByCategory[] = [
  { category: "Electronics", revenue: 22450, percentage: 46.5 },
  { category: "Clothing", revenue: 12800, percentage: 26.5 },
  { category: "Accessories", revenue: 8900, percentage: 18.5 },
  { category: "Home & Living", revenue: 4100, percentage: 8.5 },
];

export const mockTopProducts: TopProduct[] = [
  { id: "prod-1", name: "iPhone 15 Pro Max", image: "/images/products/iphone-15-pro.jpg", unitsSold: 45, revenue: 53955 },
  { id: "prod-3", name: "MacBook Pro 16\" M3 Max", image: "/images/products/macbook-pro-16.jpg", unitsSold: 12, revenue: 41988 },
  { id: "prod-2", name: "Samsung Galaxy S24 Ultra", image: "/images/products/galaxy-s24.jpg", unitsSold: 28, revenue: 36372 },
  { id: "prod-10", name: "Dyson V15 Detect Vacuum", image: "/images/products/dyson-v15.jpg", unitsSold: 18, revenue: 13482 },
  { id: "prod-4", name: "Sony WH-1000XM5", image: "/images/products/sony-xm5.jpg", unitsSold: 32, revenue: 11168 },
];

export const mockActivityFeed: ActivityItem[] = [
  { id: "act-1", type: "order", message: "New order #ORD-2026-014 from David Kim ($4,903.91)", timestamp: "2026-03-11T07:00:00Z" },
  { id: "act-2", type: "order", message: "New order #ORD-2026-008 from Robert Martinez ($816.41)", timestamp: "2026-03-11T08:00:00Z" },
  { id: "act-3", type: "stock", message: "Patagonia Better Sweater Jacket is running low (5 left)", timestamp: "2026-03-10T15:00:00Z" },
  { id: "act-4", type: "customer", message: "New customer Robert Martinez registered", timestamp: "2026-02-28T10:00:00Z" },
  { id: "act-5", type: "order", message: "Order #ORD-2026-004 placed by James Wilson ($830.91)", timestamp: "2026-03-10T09:00:00Z" },
  { id: "act-6", type: "review", message: "New 5-star review on iPhone 15 Pro Max", timestamp: "2026-03-09T18:00:00Z" },
  { id: "act-7", type: "stock", message: "Mechanical Keyboard Pro is out of stock", timestamp: "2026-03-09T12:00:00Z" },
  { id: "act-8", type: "order", message: "Order #ORD-2026-011 status changed to Processing", timestamp: "2026-03-10T08:00:00Z" },
];
