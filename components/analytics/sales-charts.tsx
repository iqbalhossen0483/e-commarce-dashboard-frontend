"use client";

import { ChartCard } from "@/components/shared/chart-card";
import {
  mockOrdersChartData,
  mockRevenueData,
  mockSalesByCategory,
} from "@/lib/mock/analytics";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

const periods = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
] as const;

function PeriodToggle({
  period,
  onChange,
}: {
  period: string;
  onChange: (p: "7d" | "30d") => void;
}) {
  return (
    <div className="flex gap-1">
      {periods.map((p) => (
        <button
          key={p.label}
          onClick={() => onChange(p.label)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            period === p.label
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

export function RevenueOverTimeChart() {
  const [period, setPeriod] = useState<"7d" | "30d">("30d");
  const days = periods.find((p) => p.label === period)!.days;
  const data = mockRevenueData.slice(-days);

  return (
    <ChartCard
      title="Revenue Over Time"
      description="Daily revenue trend"
      action={<PeriodToggle period={period} onChange={setPeriod} />}
    >
      {({ width, height }) => (
        <AreaChart data={data} width={width} height={height}>
          <defs>
            <linearGradient id="salesRevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--chart-1)"
                stopOpacity={0.3}
              />
              <stop
                offset="100%"
                stopColor="var(--chart-1)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) =>
              `$${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              color: "var(--popover-foreground)",
              fontSize: 13,
            }}
            formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--chart-1)"
            strokeWidth={2}
            fill="url(#salesRevGrad)"
          />
        </AreaChart>
      )}
    </ChartCard>
  );
}

export function OrdersOverTimeChart() {
  const [period, setPeriod] = useState<"7d" | "30d">("30d");
  const days = periods.find((p) => p.label === period)!.days;
  const data = mockOrdersChartData.slice(-days);

  return (
    <ChartCard
      title="Orders Over Time"
      description="Daily order count"
      action={<PeriodToggle period={period} onChange={setPeriod} />}
    >
      {({ width, height }) => (
        <BarChart data={data} width={width} height={height}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              color: "var(--popover-foreground)",
              fontSize: 13,
            }}
            formatter={(value) => [Number(value), "Orders"]}
          />
          <Bar
            dataKey="value"
            fill="var(--chart-2)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      )}
    </ChartCard>
  );
}

export function SalesByCategoryChart() {
  return (
    <ChartCard title="Sales by Category" description="Revenue distribution">
      {({ width, height }) => (
        <PieChart width={width} height={height}>
          <Pie
            data={mockSalesByCategory}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="revenue"
            nameKey="category"
            paddingAngle={3}
            label={({ name, percent }) =>
              `${name} (${((percent ?? 0) * 100).toFixed(1)}%)`
            }
          >
            {mockSalesByCategory.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              color: "var(--popover-foreground)",
              fontSize: 13,
            }}
            formatter={(value) => [formatCurrency(Number(value)), "Revenue"]}
          />
        </PieChart>
      )}
    </ChartCard>
  );
}
