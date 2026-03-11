"use client";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { LowStockAlerts } from "@/components/dashboard/low-stock-alerts";
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { TopProductsWidget } from "@/components/dashboard/top-products-widget";
import { StatCard } from "@/components/shared/stat-card";
import { mockKPIs } from "@/lib/mock/analytics";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";

const kpiIcons = [DollarSign, ShoppingCart, Users, TrendingUp];

function formatKPIValue(label: string, value: number): string {
  if (label === "Total Revenue") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  }
  if (label === "Conversion Rate") {
    return `${value}%`;
  }
  return value.toLocaleString();
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome to your e-commerce dashboard.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi, index) => (
          <StatCard
            key={kpi.label}
            title={kpi.label}
            value={formatKPIValue(kpi.label, kpi.value)}
            icon={kpiIcons[index]}
            trend={kpi.trend}
            changePercent={kpi.changePercent}
            comparison="vs last period"
          />
        ))}
      </div>

      {/* Revenue Chart + Recent Orders */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <RevenueChart />
        </div>
        <div className="lg:col-span-3">
          <TopProductsWidget />
        </div>
      </div>

      {/* Recent Orders Table */}
      <RecentOrdersTable />

      {/* Low Stock + Activity Feed */}
      <div className="grid gap-6 md:grid-cols-2">
        <LowStockAlerts />
        <ActivityFeed />
      </div>
    </div>
  );
}
