"use client";

import { Button } from "@/components/ui/button";
import type { Order } from "@/types";
import { Printer } from "lucide-react";

interface OrderInvoiceProps {
  order: Order;
}

export function OrderInvoiceButton({ order }: OrderInvoiceProps) {
  const handlePrint = () => {
    const win = window.open("", "_blank");
    if (!win) return;

    const formatCurrency = (v: number) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);

    const itemsHtml = order.items
      .map(
        (item) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${item.productName}${item.variantName ? ` — ${item.variantName}` : ""}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${formatCurrency(item.price)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${formatCurrency(item.total)}</td>
        </tr>`,
      )
      .join("");

    const addr = order.shippingAddress;

    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head><title>Invoice ${order.orderNumber}</title>
      <style>body{font-family:system-ui,sans-serif;margin:40px;color:#333}table{width:100%;border-collapse:collapse}th{text-align:left;padding:8px;border-bottom:2px solid #333;font-size:14px}td{font-size:14px}.right{text-align:right}</style>
      </head>
      <body>
        <h1 style="margin-bottom:4px">Invoice</h1>
        <p style="color:#666;margin-top:0">${order.orderNumber} · ${new Date(order.createdAt).toLocaleDateString()}</p>
        <hr/>
        <div style="display:flex;justify-content:space-between;margin:20px 0">
          <div><strong>Bill To</strong><br/>${order.customerName}<br/>${order.customerEmail}</div>
          <div><strong>Ship To</strong><br/>${addr.name}<br/>${addr.line1}<br/>${addr.city}, ${addr.state} ${addr.postalCode}</div>
        </div>
        <table>
          <thead><tr><th>Product</th><th class="right">Price</th><th class="right">Qty</th><th class="right">Total</th></tr></thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <div style="margin-top:20px;text-align:right">
          <p>Subtotal: ${formatCurrency(order.subtotal)}</p>
          <p>Shipping: ${order.shippingCost === 0 ? "Free" : formatCurrency(order.shippingCost)}</p>
          <p>Tax: ${formatCurrency(order.tax)}</p>
          ${order.discount > 0 ? `<p>Discount: -${formatCurrency(order.discount)}</p>` : ""}
          <hr/>
          <p style="font-size:18px;font-weight:bold">Total: ${formatCurrency(order.total)}</p>
        </div>
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <Button variant="outline" size="sm" onClick={handlePrint}>
      <Printer className="mr-2 h-4 w-4" />
      Print Invoice
    </Button>
  );
}
