"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useState } from "react";

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
}

const initialSettings: NotificationSetting[] = [
  { id: "new-order", label: "New Order", description: "When a new order is placed", email: true, push: true },
  { id: "order-status", label: "Order Status Change", description: "When an order status is updated", email: true, push: false },
  { id: "low-stock", label: "Low Stock Alert", description: "When a product is running low", email: true, push: true },
  { id: "new-review", label: "New Review", description: "When a customer submits a review", email: false, push: true },
  { id: "new-customer", label: "New Customer", description: "When a new customer registers", email: false, push: false },
  { id: "payment-failed", label: "Payment Failed", description: "When a payment attempt fails", email: true, push: true },
];

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-muted"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);

  const toggle = (id: string, channel: "email" | "push") => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [channel]: !s[channel] } : s))
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {/* Header */}
            <div className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-muted-foreground">
              <span className="flex-1">Event</span>
              <span className="w-16 text-center">Email</span>
              <span className="w-16 text-center">Push</span>
            </div>

            {settings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center gap-3 rounded-md px-3 py-3 hover:bg-muted/50"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
                <div className="flex w-16 justify-center">
                  <Toggle
                    checked={setting.email}
                    onChange={() => toggle(setting.id, "email")}
                  />
                </div>
                <div className="flex w-16 justify-center">
                  <Toggle
                    checked={setting.push}
                    onChange={() => toggle(setting.id, "push")}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Save className="mr-1.5 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
