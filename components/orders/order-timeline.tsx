"use client";

import { cn } from "@/lib/utils";
import type { OrderEvent } from "@/types";
import { format } from "date-fns";
import {
  Clock,
  Cog,
  Truck,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";

const statusConfig: Record<
  string,
  { icon: typeof Clock; color: string }
> = {
  pending: { icon: Clock, color: "text-yellow-500" },
  processing: { icon: Cog, color: "text-blue-500" },
  shipped: { icon: Truck, color: "text-purple-500" },
  delivered: { icon: CheckCircle2, color: "text-green-500" },
  cancelled: { icon: XCircle, color: "text-red-500" },
  refunded: { icon: RotateCcw, color: "text-gray-500" },
};

interface OrderTimelineProps {
  events: OrderEvent[];
}

export function OrderTimeline({ events }: OrderTimelineProps) {
  const sorted = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="space-y-0">
      {sorted.map((event, index) => {
        const config = statusConfig[event.status] ?? statusConfig.pending;
        const Icon = config.icon;
        const isLast = index === sorted.length - 1;

        return (
          <div key={event.id} className="flex gap-3">
            {/* Line + Icon */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-background",
                  config.color,
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              {!isLast && (
                <div className="w-px flex-1 bg-border" />
              )}
            </div>

            {/* Content */}
            <div className={cn("pb-6", isLast && "pb-0")}>
              <p className="text-sm font-medium capitalize">
                {event.status.replace(/_/g, " ")}
              </p>
              {event.note && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {event.note}
                </p>
              )}
              <p className="mt-0.5 text-xs text-muted-foreground">
                {format(new Date(event.createdAt), "MMM d, yyyy 'at' h:mm a")}
                {" · "}
                {event.createdBy}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
