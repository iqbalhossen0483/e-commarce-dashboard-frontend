"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOrders } from "@/lib/mock/orders";
import { mockProducts } from "@/lib/mock/products";
import { mockCustomers } from "@/lib/mock/customers";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

type ReportType = "sales" | "products" | "customers";

function generateCSV(type: ReportType): string {
  switch (type) {
    case "sales": {
      const header = "Order Number,Date,Customer,Status,Payment,Total\n";
      const rows = mockOrders
        .map(
          (o) =>
            `${o.orderNumber},${o.createdAt.split("T")[0]},${o.customerName},${o.status},${o.paymentStatus},${o.total}`
        )
        .join("\n");
      return header + rows;
    }
    case "products": {
      const header = "Name,SKU,Category,Price,Stock,Status\n";
      const rows = mockProducts
        .map(
          (p) =>
            `"${p.name}",${p.sku},${p.categoryName},${p.price},${p.stock},${p.status}`
        )
        .join("\n");
      return header + rows;
    }
    case "customers": {
      const header = "Name,Email,Orders,Total Spent,Avg Order Value\n";
      const rows = mockCustomers
        .map(
          (c) =>
            `"${c.name}",${c.email},${c.orderCount},${c.totalSpent},${c.averageOrderValue}`
        )
        .join("\n");
      return header + rows;
    }
  }
}

function downloadCSV(type: ReportType) {
  const csv = generateCSV(type);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${type}-report.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadPDF(type: ReportType) {
  // In production, use a library like jsPDF or server-side generation
  const csv = generateCSV(type);
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(`
    <html>
      <head><title>${type.charAt(0).toUpperCase() + type.slice(1)} Report</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 40px; }
        h1 { font-size: 24px; margin-bottom: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 13px; }
        th { background: #f5f5f5; font-weight: 600; }
      </style></head>
      <body>
        <h1>${type.charAt(0).toUpperCase() + type.slice(1)} Report</h1>
        <table>
          ${csv
            .split("\n")
            .map(
              (row, i) =>
                `<tr>${row
                  .split(",")
                  .map((cell) =>
                    i === 0
                      ? `<th>${cell.replace(/"/g, "")}</th>`
                      : `<td>${cell.replace(/"/g, "")}</td>`
                  )
                  .join("")}</tr>`
            )
            .join("")}
        </table>
        <script>window.print();</script>
      </body>
    </html>
  `);
  win.document.close();
}

const reports: { type: ReportType; title: string; description: string }[] = [
  {
    type: "sales",
    title: "Sales Report",
    description: "Orders, revenue, and payment status",
  },
  {
    type: "products",
    title: "Products Report",
    description: "Product catalog with stock levels",
  },
  {
    type: "customers",
    title: "Customers Report",
    description: "Customer data and spending summary",
  },
];

export function ReportExport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Export Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report.type}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                  <Download className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{report.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {report.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadCSV(report.type)}
                >
                  <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5" />
                  CSV
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadPDF(report.type)}
                >
                  <FileText className="mr-1.5 h-3.5 w-3.5" />
                  PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
