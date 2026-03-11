"use client";

import { CustomerAddresses } from "@/components/customers/customer-addresses";
import { CustomerNotes } from "@/components/customers/customer-notes";
import { CustomerOrderHistory } from "@/components/customers/customer-order-history";
import { CustomerProfile } from "@/components/customers/customer-profile";
import { CustomerStats } from "@/components/customers/customer-stats";
import { Button } from "@/components/ui/button";
import { mockCustomers } from "@/lib/mock/customers";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id as string;
  const customer = mockCustomers.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold">Customer not found</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The customer you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/customers" className="mt-4">
          <Button variant="outline">Back to Customers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/customers">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{customer.name}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Customer details and history
          </p>
        </div>
      </div>

      {/* Stats */}
      <CustomerStats customer={customer} />

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <CustomerOrderHistory customerId={customer.id} />
        </div>
        <div className="space-y-6">
          <CustomerProfile customer={customer} />
          <CustomerAddresses addresses={customer.addresses} />
          <CustomerNotes notes={customer.notes} />
        </div>
      </div>
    </div>
  );
}
