"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useState } from "react";

export default function GeneralSettingsPage() {
  const [form, setForm] = useState({
    storeName: "My E-Commerce Store",
    storeEmail: "admin@mystore.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Commerce St, New York, NY 10001",
    currency: "USD",
    timezone: "America/New_York",
    logo: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Store Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={form.storeName}
                onChange={(e) => handleChange("storeName", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="storeEmail">Contact Email</Label>
              <Input
                id="storeEmail"
                type="email"
                value={form.storeEmail}
                onChange={(e) => handleChange("storeEmail", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="storePhone">Phone</Label>
              <Input
                id="storePhone"
                value={form.storePhone}
                onChange={(e) => handleChange("storePhone", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="storeAddress">Address</Label>
              <Input
                id="storeAddress"
                value={form.storeAddress}
                onChange={(e) => handleChange("storeAddress", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Regional Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={form.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={form.timezone}
                onChange={(e) => handleChange("timezone", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => console.log("Settings saved:", form)}>
          <Save className="mr-1.5 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
