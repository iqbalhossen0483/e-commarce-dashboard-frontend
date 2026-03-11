"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ShippingZone } from "@/lib/mock/shipping-zones";
import { useShippingStore } from "@/stores/shipping-store";
import { Check, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ShippingSettingsPage() {
  const { zones: savedZones, setZones: saveZones } = useShippingStore();
  const [zones, setZones] = useState<ShippingZone[]>(savedZones);
  const [saved, setSaved] = useState(false);

  const addZone = () => {
    setZones((prev) => [
      ...prev,
      { id: `z${Date.now()}`, name: "", regions: "", flatRate: "0", freeAbove: "" },
    ]);
  };

  const updateZone = (id: string, key: keyof ShippingZone, value: string) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, [key]: value } : z))
    );
  };

  const removeZone = (id: string) => {
    setZones((prev) => prev.filter((z) => z.id !== id));
  };

  const handleSave = () => {
    saveZones(zones);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Shipping Zones</CardTitle>
          <Button size="sm" variant="outline" onClick={addZone}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Zone
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="space-y-3 rounded-lg border border-border p-4"
            >
              <div className="flex items-start justify-between">
                <div className="grid flex-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Zone Name</Label>
                    <Input
                      value={zone.name}
                      onChange={(e) =>
                        updateZone(zone.id, "name", e.target.value)
                      }
                      placeholder="e.g. Domestic"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Regions</Label>
                    <Input
                      value={zone.regions}
                      onChange={(e) =>
                        updateZone(zone.id, "regions", e.target.value)
                      }
                      placeholder="e.g. United States"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Flat Rate ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={zone.flatRate}
                      onChange={(e) =>
                        updateZone(zone.id, "flatRate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Free Shipping Above ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={zone.freeAbove}
                      onChange={(e) =>
                        updateZone(zone.id, "freeAbove", e.target.value)
                      }
                      placeholder="Leave empty for none"
                    />
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="ml-2 h-8 w-8 shrink-0 text-destructive"
                  onClick={() => removeZone(zone.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="flex items-center gap-1 text-sm text-success">
            <Check className="h-4 w-4" />
            Saved
          </span>
        )}
        <Button onClick={handleSave}>
          <Save className="mr-1.5 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
