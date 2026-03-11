"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRevenueData } from "@/lib/mock/analytics";
import type { ChartDataPoint } from "@/types";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const periods = [
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
] as const;

function filterByDays(data: ChartDataPoint[], days: number) {
  return data.slice(-days);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

export function RevenueChart() {
  const [period, setPeriod] = useState<"7d" | "30d">("30d");
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const days = periods.find((p) => p.label === period)!.days;
  const data = filterByDays(mockRevenueData, days);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Revenue</CardTitle>
        <div className="flex gap-1">
          {periods.map((p) => (
            <button
              key={p.label}
              onClick={() => setPeriod(p.label)}
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
      </CardHeader>
      <CardContent className="pb-4">
        <div ref={containerRef} className="h-75 w-full">
          {dimensions.width > 0 && dimensions.height > 0 && (
            <AreaChart
              data={data}
              width={dimensions.width}
              height={dimensions.height}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
                interval={period === "7d" ? 0 : "preserveStartEnd"}
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
                formatter={(value) => [
                  formatCurrency(Number(value)),
                  "Revenue",
                ]}
                labelFormatter={(label) => label}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--chart-1)"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
