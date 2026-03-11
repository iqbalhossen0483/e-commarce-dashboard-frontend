"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CreditCard, Save } from "lucide-react";
import { useState } from "react";

const paymentMethods = [
  { id: "stripe", name: "Stripe", description: "Credit cards, Apple Pay, Google Pay", enabled: true },
  { id: "paypal", name: "PayPal", description: "PayPal checkout", enabled: false },
  { id: "cod", name: "Cash on Delivery", description: "Pay when you receive", enabled: true },
];

export default function PaymentsSettingsPage() {
  const [methods, setMethods] = useState(paymentMethods);
  const [selected, setSelected] = useState<string | null>(null);

  const [stripeConfig, setStripeConfig] = useState({
    secretKey: "sk_test_•••••••••••••••••",
    publishableKey: "pk_test_•••••••••••••••••",
    webhookSecret: "",
    mode: "test" as "test" | "live",
  });

  const [paypalConfig, setPaypalConfig] = useState({
    clientId: "",
    clientSecret: "",
    mode: "sandbox" as "sandbox" | "live",
  });

  const toggleMethod = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const handleSelect = (id: string) => {
    if (id === "stripe" || id === "paypal") {
      setSelected((prev) => (prev === id ? null : id));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {methods.map((method) => {
            const isSelectable = method.id === "stripe" || method.id === "paypal";
            const isSelected = selected === method.id;

            return (
              <div
                key={method.id}
                className={cn(
                  "rounded-lg border border-border transition-colors",
                  isSelectable && "cursor-pointer",
                  isSelected && "border-primary bg-primary/5"
                )}
              >
                <div
                  className="flex items-center justify-between p-4"
                  onClick={() => handleSelect(method.id)}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMethod(method.id);
                    }}
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

                {/* Stripe Config */}
                {isSelected && method.id === "stripe" && (
                  <div className="border-t border-border px-4 pb-4 pt-3 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="stripeSecret">Secret Key</Label>
                        <Input
                          id="stripeSecret"
                          type="password"
                          value={stripeConfig.secretKey}
                          onChange={(e) =>
                            setStripeConfig((p) => ({ ...p, secretKey: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="stripePk">Publishable Key</Label>
                        <Input
                          id="stripePk"
                          type="password"
                          value={stripeConfig.publishableKey}
                          onChange={(e) =>
                            setStripeConfig((p) => ({ ...p, publishableKey: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="stripeWebhook">Webhook Secret</Label>
                        <Input
                          id="stripeWebhook"
                          type="password"
                          placeholder="whsec_..."
                          value={stripeConfig.webhookSecret}
                          onChange={(e) =>
                            setStripeConfig((p) => ({ ...p, webhookSecret: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Mode</Label>
                        <div className="flex gap-2">
                          {(["test", "live"] as const).map((mode) => (
                            <button
                              key={mode}
                              onClick={() => setStripeConfig((p) => ({ ...p, mode }))}
                              className={cn(
                                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                                stripeConfig.mode === mode
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground hover:text-foreground"
                              )}
                            >
                              {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {stripeConfig.mode === "test" ? "Test Mode" : "Live Mode"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {stripeConfig.mode === "test"
                          ? "Using test credentials — no real charges"
                          : "Live credentials — real charges will be processed"}
                      </span>
                    </div>
                  </div>
                )}

                {/* PayPal Config */}
                {isSelected && method.id === "paypal" && (
                  <div className="border-t border-border px-4 pb-4 pt-3 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="paypalClientId">Client ID</Label>
                        <Input
                          id="paypalClientId"
                          type="password"
                          placeholder="Enter PayPal Client ID"
                          value={paypalConfig.clientId}
                          onChange={(e) =>
                            setPaypalConfig((p) => ({ ...p, clientId: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="paypalSecret">Client Secret</Label>
                        <Input
                          id="paypalSecret"
                          type="password"
                          placeholder="Enter PayPal Client Secret"
                          value={paypalConfig.clientSecret}
                          onChange={(e) =>
                            setPaypalConfig((p) => ({ ...p, clientSecret: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Environment</Label>
                      <div className="flex gap-2">
                        {(["sandbox", "live"] as const).map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setPaypalConfig((p) => ({ ...p, mode }))}
                            className={cn(
                              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                              paypalConfig.mode === mode
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {paypalConfig.mode === "sandbox" ? "Sandbox" : "Live"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {paypalConfig.mode === "sandbox"
                          ? "Using sandbox — no real transactions"
                          : "Live environment — real transactions will be processed"}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
