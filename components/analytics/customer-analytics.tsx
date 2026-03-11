"use client";

import { ChartCard } from "@/components/shared/chart-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCustomers } from "@/lib/mock/customers";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

export function CustomerSpendingChart() {
  const data = mockCustomers
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 8)
    .map((c) => ({
      name: c.name.split(" ")[0],
      spent: c.totalSpent,
    }));

  return (
    <ChartCard
      title="Top Customers by Spending"
      description="Highest lifetime value customers"
    >
      {({ width, height }) => (
        <BarChart data={data} width={width} height={height} layout="vertical">
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) =>
              `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`
            }
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            width={70}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              color: "var(--popover-foreground)",
              fontSize: 13,
            }}
            formatter={(value) => [formatCurrency(Number(value)), "Spent"]}
          />
          <Bar dataKey="spent" fill="var(--chart-3)" radius={[0, 4, 4, 0]} />
        </BarChart>
      )}
    </ChartCard>
  );
}

export function CustomerOverview() {
  const totalCustomers = mockCustomers.length;
  const vipCount = mockCustomers.filter((c) => c.tags.includes("VIP")).length;
  const newCount = mockCustomers.filter((c) => c.tags.includes("new")).length;
  const avgSpent =
    mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / totalCustomers;
  const avgOrders =
    mockCustomers.reduce((sum, c) => sum + c.orderCount, 0) / totalCustomers;

  const stats = [
    { label: "Total Customers", value: totalCustomers.toString() },
    { label: "VIP Customers", value: vipCount.toString() },
    { label: "New Customers", value: newCount.toString() },
    { label: "Avg. Lifetime Value", value: formatCurrency(avgSpent) },
    { label: "Avg. Orders/Customer", value: avgOrders.toFixed(1) },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">
          Customer Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
