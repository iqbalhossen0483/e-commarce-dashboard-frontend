"use client";

import { OrderActions } from "@/components/orders/order-actions";
import { OrderCustomerShipping } from "@/components/orders/order-customer-shipping";
import { OrderInvoiceButton } from "@/components/orders/order-invoice";
import { OrderSummary } from "@/components/orders/order-summary";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockOrders } from "@/lib/mock/orders";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The order you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/orders" className="mt-4">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/orders">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
              <StatusBadge status={order.status} />
              <StatusBadge status={order.paymentStatus} />
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">
              Placed by {order.customerName}
            </p>
          </div>
        </div>
        <OrderInvoiceButton order={order} />
      </div>

      {/* Customer & Shipping */}
      <OrderCustomerShipping order={order} />

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <OrderSummary order={order} />
        </div>
        <div className="space-y-6">
          <OrderActions order={order} />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline events={order.timeline} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
