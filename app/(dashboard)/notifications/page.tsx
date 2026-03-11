"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mockActivityFeed } from "@/lib/mock/analytics";
import type { ActivityItem } from "@/types";
import { formatDistanceToNow } from "date-fns";
import {
  Check,
  CheckCheck,
  Package,
  ShoppingCart,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";

const typeIcon = {
  order: ShoppingCart,
  stock: Package,
  customer: Users,
  review: Star,
};

const typeColor = {
  order: "text-blue-500 bg-blue-500/10",
  stock: "text-orange-500 bg-orange-500/10",
  customer: "text-green-500 bg-green-500/10",
  review: "text-yellow-500 bg-yellow-500/10",
};

const typeLabel = {
  order: "Order",
  stock: "Stock",
  customer: "Customer",
  review: "Review",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<ActivityItem[]>(mockActivityFeed);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>("all");

  const unreadCount = notifications.length - readIds.size;

  const filtered =
    filter === "all"
      ? notifications
      : filter === "unread"
        ? notifications.filter((n) => !readIds.has(n.id))
        : notifications.filter((n) => n.type === filter);

  const markAsRead = (id: string) => {
    setReadIds((prev) => new Set(prev).add(id));
  };

  const markAllRead = () => {
    setReadIds(new Set(notifications.map((n) => n.id)));
  };

  const remove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setReadIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const clearAll = () => {
    setNotifications([]);
    setReadIds(new Set());
  };

  const filters = [
    { label: "All", value: "all", count: notifications.length },
    { label: "Unread", value: "unread", count: unreadCount },
    { label: "Orders", value: "order" },
    { label: "Stock", value: "stock" },
    { label: "Customers", value: "customer" },
    { label: "Reviews", value: "review" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCheck className="mr-1.5 h-3.5 w-3.5" />
              Mark all read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAll}>
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {f.label}
            {f.count !== undefined && (
              <span className="ml-1.5 text-xs opacity-70">{f.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">
                No notifications to show
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered.map((item) => {
                const Icon = typeIcon[item.type];
                const isRead = readIds.has(item.id);

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "flex items-start gap-4 px-5 py-4 transition-colors",
                      !isRead && "bg-primary/5"
                    )}
                  >
                    <div
                      className={cn(
                        "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        typeColor[item.type]
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            "text-sm",
                            !isRead && "font-medium"
                          )}
                        >
                          {item.message}
                        </p>
                        {!isRead && (
                          <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {typeLabel[item.type]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(item.timestamp), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      {!isRead && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => markAsRead(item.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => remove(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
