"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Save } from "lucide-react";
import { useState } from "react";

const paymentMethods = [
  { id: "stripe", name: "Stripe", description: "Credit cards, Apple Pay, Google Pay", enabled: true },
  { id: "paypal", name: "PayPal", description: "PayPal checkout", enabled: false },
  { id: "cod", name: "Cash on Delivery", description: "Pay when you receive", enabled: true },
];

export default function PaymentsSettingsPage() {
  const [methods, setMethods] = useState(paymentMethods);
  const [stripeKey, setStripeKey] = useState("sk_test_•••••••••••••••••");

  const toggleMethod = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {methods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between rounded-lg border border-border p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{method.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleMethod(method.id)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  method.enabled ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    method.enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stripe Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="stripeKey">Secret Key</Label>
            <Input
              id="stripeKey"
              type="password"
              value={stripeKey}
              onChange={(e) => setStripeKey(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Test Mode
            </Badge>
            <span className="text-xs text-muted-foreground">
              Switch to live mode in production
            </span>
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
