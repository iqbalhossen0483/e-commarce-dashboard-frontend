"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Order, Address } from "@/types";
import { MapPin, User, Mail } from "lucide-react";

interface OrderCustomerShippingProps {
  order: Order;
}

function AddressBlock({ title, address }: { title: string; address: Address }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-0.5">
        <p className="font-medium text-foreground">{address.name}</p>
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
        {address.phone && <p>{address.phone}</p>}
      </CardContent>
    </Card>
  );
}

export function OrderCustomerShipping({ order }: OrderCustomerShippingProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Customer info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <User className="h-4 w-4 text-muted-foreground" />
            Customer
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <p className="font-medium">{order.customerName}</p>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <Mail className="h-3.5 w-3.5" />
            {order.customerEmail}
          </p>
        </CardContent>
      </Card>

      {/* Shipping address */}
      <AddressBlock title="Shipping Address" address={order.shippingAddress} />

      {/* Billing address */}
      <AddressBlock title="Billing Address" address={order.billingAddress} />
    </div>
  );
}
