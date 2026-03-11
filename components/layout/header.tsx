"use client";

import { Bell, Search, LogOut, User, Settings, ShoppingCart, Package, Users, Star } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "./breadcrumbs";
import { ThemeToggle } from "./theme-toggle";
import { useAuthStore } from "@/stores/auth-store";
import { getInitials, cn } from "@/lib/utils";
import { mockActivityFeed } from "@/lib/mock/analytics";
import type { ActivityItem } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import Link from "next/link";

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

export function Header() {
  const { user, logout } = useAuthStore();
  const [notifications, setNotifications] = useState<ActivityItem[]>(mockActivityFeed);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const unreadCount = notifications.length - readIds.size;

  const markAsRead = (id: string) => {
    setReadIds((prev) => new Set(prev).add(id));
  };

  const markAllRead = () => {
    setReadIds(new Set(notifications.map((n) => n.id)));
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 md:px-6">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-4 md:pl-0 pl-10">
        <Breadcrumbs />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* Search trigger */}
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "h-9 w-9 relative",
            })}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center">
                {unreadCount}
              </Badge>
            )}
            <span className="sr-only">Notifications</span>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-96 p-0 gap-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="text-sm font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                  No notifications
                </p>
              ) : (
                notifications.map((item) => {
                  const Icon = typeIcon[item.type];
                  const isRead = readIds.has(item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => markAsRead(item.id)}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                        !isRead && "bg-primary/5"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                          typeColor[item.type]
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm", !isRead && "font-medium")}>
                          {item.message}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(item.timestamp), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                      {!isRead && (
                        <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
            <div className="border-t border-border px-4 py-2.5">
              <Link
                href="/notifications"
                className="block text-center text-xs text-primary hover:underline"
              >
                View all notifications
              </Link>
            </div>
          </PopoverContent>
        </Popover>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-9 w-9 rounded-full cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>
                {user ? getInitials(user.name) : "AD"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
