"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Order, OrderStatus } from "@/types";
import { useState } from "react";

interface OrderActionsProps {
  order: Order;
  onStatusChange?: (status: OrderStatus) => void;
}

const statusFlow: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

export function OrderActions({ order, onStatusChange }: OrderActionsProps) {
  const [note, setNote] = useState("");

  const currentIndex = statusFlow.indexOf(order.status);
  const nextStatus = currentIndex >= 0 && currentIndex < statusFlow.length - 1
    ? statusFlow[currentIndex + 1]
    : null;

  const isCancellable = ["pending", "processing"].includes(order.status);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current status */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Current Status</p>
          <StatusBadge status={order.status} />
        </div>

        {/* Status change */}
        {nextStatus && (
          <Button
            className="w-full"
            onClick={() => onStatusChange?.(nextStatus)}
          >
            Mark as {nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1)}
          </Button>
        )}

        {isCancellable && (
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onStatusChange?.("cancelled")}
          >
            Cancel Order
          </Button>
        )}

        {/* Tracking */}
        {order.trackingNumber && (
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Tracking Number</p>
            <p className="text-sm font-mono">{order.trackingNumber}</p>
          </div>
        )}

        {/* Add note */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Add Note</p>
          <textarea
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 resize-none"
            placeholder="Internal note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            disabled={!note.trim()}
            onClick={() => {
              console.log("Add note:", note);
              setNote("");
            }}
          >
            Add Note
          </Button>
        </div>

        {/* Existing notes */}
        {order.notes.length > 0 && (
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Notes</p>
            {order.notes.map((n, i) => (
              <p key={i} className="text-sm rounded bg-muted px-2 py-1">
                {n}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
