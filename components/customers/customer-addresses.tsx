"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Address } from "@/types";
import { MapPin } from "lucide-react";

interface CustomerAddressesProps {
  addresses: Address[];
}

export function CustomerAddresses({ addresses }: CustomerAddressesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Addresses</CardTitle>
      </CardHeader>
      <CardContent>
        {addresses.length === 0 ? (
          <p className="text-sm text-muted-foreground">No addresses on file.</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="flex gap-3 rounded-lg border border-border p-3"
              >
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                <div className="flex-1 text-sm space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{addr.name}</span>
                    {addr.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{addr.line1}</p>
                  {addr.line2 && (
                    <p className="text-muted-foreground">{addr.line2}</p>
                  )}
                  <p className="text-muted-foreground">
                    {addr.city}, {addr.state} {addr.postalCode}, {addr.country}
                  </p>
                  {addr.phone && (
                    <p className="text-muted-foreground">{addr.phone}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
