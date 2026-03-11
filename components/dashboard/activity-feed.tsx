"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockActivityFeed } from "@/lib/mock/analytics";
import { formatDistanceToNow } from "date-fns";
import {
  ShoppingCart,
  PackageSearch,
  UserPlus,
  Star,
} from "lucide-react";

const typeIcons = {
  order: ShoppingCart,
  stock: PackageSearch,
  customer: UserPlus,
  review: Star,
} as const;

const typeColors = {
  order: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  stock: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  customer: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  review: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
} as const;

export function ActivityFeed() {
  const activities = [...mockActivityFeed].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = typeIcons[activity.type];
          const colorClass = typeColors[activity.type];

          return (
            <div key={activity.id} className="flex gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colorClass}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm">{activity.message}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
