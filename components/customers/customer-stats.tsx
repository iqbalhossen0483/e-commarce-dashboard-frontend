"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { Customer } from "@/types";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

interface CustomerStatsProps {
  customer: Customer;
}

export function CustomerStats({ customer }: CustomerStatsProps) {
  const stats = [
    {
      label: "Total Spent",
      value: formatCurrency(customer.totalSpent),
      icon: DollarSign,
    },
    {
      label: "Orders",
      value: customer.orderCount.toString(),
      icon: ShoppingCart,
    },
    {
      label: "Avg. Order Value",
      value: formatCurrency(customer.averageOrderValue),
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
