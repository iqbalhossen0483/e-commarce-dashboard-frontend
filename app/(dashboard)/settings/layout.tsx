"use client";

import { cn } from "@/lib/utils";
import {
  Bell,
  CreditCard,
  Globe,
  Settings,
  Shield,
  Truck,
  Receipt,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsNav = [
  { title: "General", href: "/settings", icon: Settings },
  { title: "Payments", href: "/settings/payments", icon: CreditCard },
  { title: "Shipping", href: "/settings/shipping", icon: Truck },
  { title: "Tax", href: "/settings/tax", icon: Receipt },
  { title: "Notifications", href: "/settings/notifications", icon: Bell },
  { title: "Users & Roles", href: "/settings/users", icon: Shield },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your store configuration
        </p>
      </div>

      <div className="flex gap-6">
        <nav className="w-52 shrink-0 space-y-1">
          {settingsNav.map((item) => {
            const isActive =
              item.href === "/settings"
                ? pathname === "/settings"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
