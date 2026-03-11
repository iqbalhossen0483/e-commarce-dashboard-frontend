"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import type { Customer } from "@/types";
import { Mail, Phone, Calendar } from "lucide-react";
import { format } from "date-fns";

interface CustomerProfileProps {
  customer: Customer;
}

export function CustomerProfile({ customer }: CustomerProfileProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center pt-6 pb-6 text-center">
        <Avatar className="h-20 w-20 mb-3">
          <AvatarFallback className="text-xl">
            {getInitials(customer.name)}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{customer.name}</h2>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Mail className="h-3.5 w-3.5" />
          {customer.email}
        </p>
        {customer.phone && (
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5" />
            {customer.phone}
          </p>
        )}
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          Joined {format(new Date(customer.createdAt), "MMM d, yyyy")}
        </p>
        {customer.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {customer.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
