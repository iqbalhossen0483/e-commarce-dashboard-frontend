"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useShippingStore } from "@/stores/shipping-store";
import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

interface TaxRate {
  id: string;
  name: string;
  region: string;
  rate: string;
  enabled: boolean;
}

const initialRates: TaxRate[] = [
  { id: "t1", name: "US Sales Tax", region: "United States", rate: "8.875", enabled: true },
  { id: "t2", name: "EU VAT", region: "European Union", rate: "20", enabled: true },
  { id: "t3", name: "UK VAT", region: "United Kingdom", rate: "20", enabled: false },
];

export default function TaxSettingsPage() {
  const { zones } = useShippingStore();
  const [taxIncluded, setTaxIncluded] = useState(false);
  const [rates, setRates] = useState(initialRates);

  const addRate = () => {
    setRates((prev) => [
      ...prev,
      { id: `t${Date.now()}`, name: "", region: "", rate: "0", enabled: true },
    ]);
  };

  const updateRate = (id: string, key: keyof TaxRate, value: string | boolean) => {
    setRates((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [key]: value } : r))
    );
  };

  const removeRate = (id: string) => {
    setRates((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tax Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="text-sm font-medium">Prices include tax</p>
              <p className="text-xs text-muted-foreground">
                Display prices with tax already included
              </p>
            </div>
            <button
              onClick={() => setTaxIncluded(!taxIncluded)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                taxIncluded ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  taxIncluded ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Tax Rates</CardTitle>
          <Button size="sm" variant="outline" onClick={addRate}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Rate
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {rates.map((rate) => (
            <div
              key={rate.id}
              className="flex items-center gap-3 rounded-lg border border-border p-3"
            >
              <button
                onClick={() => updateRate(rate.id, "enabled", !rate.enabled)}
                className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                  rate.enabled ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                    rate.enabled ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
              <Input
                className="flex-1"
                placeholder="Name"
                value={rate.name}
                onChange={(e) => updateRate(rate.id, "name", e.target.value)}
              />
              <Select
                value={rate.region}
                onValueChange={(v) => v && updateRate(rate.id, "region", v)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {zones
                    .filter((z) => z.regions.trim() !== "")
                    .map((zone) => (
                      <SelectItem key={zone.id} value={zone.regions}>
                        {zone.regions}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1">
                <Input
                  className="w-20"
                  type="number"
                  step="0.01"
                  value={rate.rate}
                  onChange={(e) => updateRate(rate.id, "rate", e.target.value)}
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0 text-destructive"
                onClick={() => removeRate(rate.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
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
