"use client";

import {
  CustomerOverview,
  CustomerSpendingChart,
} from "@/components/analytics/customer-analytics";
import {
  ProductPerformanceTable,
  TopProductsTable,
} from "@/components/analytics/product-analytics";
import { ReportExport } from "@/components/analytics/report-export";
import {
  OrdersOverTimeChart,
  RevenueOverTimeChart,
  SalesByCategoryChart,
} from "@/components/analytics/sales-charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Sales, product, and customer insights
        </p>
      </div>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-4 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <RevenueOverTimeChart />
            <OrdersOverTimeChart />
          </div>
          <SalesByCategoryChart />
        </TabsContent>

        <TabsContent value="products" className="mt-4 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <TopProductsTable />
            <ProductPerformanceTable />
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-4 space-y-6">
          <CustomerOverview />
          <CustomerSpendingChart />
        </TabsContent>

        <TabsContent value="export" className="mt-4">
          <ReportExport />
        </TabsContent>
      </Tabs>
    </div>
  );
}
