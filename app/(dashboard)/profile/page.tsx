"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { Camera, Check, Eye, EyeOff, Key, Save, Shield } from "lucide-react";
import { useState } from "react";

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  seller: "Seller",
  support: "Support",
};

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "security">(
    "general"
  );

  const [form, setForm] = useState({
    name: user?.name ?? "Admin User",
    email: user?.email ?? "admin@example.com",
    phone: "",
    bio: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    newPassword: false,
    confirm: false,
  });

  const handleSaveProfile = () => {
    updateUser({ name: form.name, email: form.email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePassword = () => {
    if (
      !passwordForm.current ||
      !passwordForm.newPassword ||
      passwordForm.newPassword !== passwordForm.confirm
    )
      return;
    console.log("Password changed");
    setPasswordForm({ current: "", newPassword: "", confirm: "" });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your account settings
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0 space-y-4">
          {/* Avatar Card */}
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-2xl">
                    {user ? getInitials(user.name) : "AD"}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-3 text-sm font-semibold">
                {user?.name ?? "Admin User"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {user?.email ?? "admin@example.com"}
              </p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {roleLabels[user?.role ?? "admin"]}
              </Badge>
            </CardContent>
          </Card>

          {/* Tab Nav */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "general"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Save className="h-4 w-4" />
              General
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === "security"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Shield className="h-4 w-4" />
              Security
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-6">
          {activeTab === "general" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={3}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 resize-none"
                      placeholder="Tell us about yourself..."
                      value={form.bio}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, bio: e.target.value }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-end gap-3">
                {saved && (
                  <span className="flex items-center gap-1 text-sm text-success">
                    <Check className="h-4 w-4" />
                    Saved
                  </span>
                )}
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-1.5 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </>
          )}

          {activeTab === "security" && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(
                    [
                      {
                        key: "current" as const,
                        label: "Current Password",
                        placeholder: "Enter current password",
                      },
                      {
                        key: "newPassword" as const,
                        label: "New Password",
                        placeholder: "Enter new password",
                      },
                      {
                        key: "confirm" as const,
                        label: "Confirm New Password",
                        placeholder: "Confirm new password",
                      },
                    ] as const
                  ).map((field) => (
                    <div key={field.key} className="space-y-1.5">
                      <Label>{field.label}</Label>
                      <div className="relative">
                        <Input
                          type={
                            showPasswords[field.key] ? "text" : "password"
                          }
                          placeholder={field.placeholder}
                          value={passwordForm[field.key]}
                          onChange={(e) =>
                            setPasswordForm((p) => ({
                              ...p,
                              [field.key]: e.target.value,
                            }))
                          }
                        />
                        <button
                          type="button"
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            setShowPasswords((p) => ({
                              ...p,
                              [field.key]: !p[field.key],
                            }))
                          }
                        >
                          {showPasswords[field.key] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                  {passwordForm.newPassword &&
                    passwordForm.confirm &&
                    passwordForm.newPassword !== passwordForm.confirm && (
                      <p className="text-xs text-destructive">
                        Passwords do not match
                      </p>
                    )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Account Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role</span>
                    <Badge variant="secondary" className="text-xs">
                      {roleLabels[user?.role ?? "admin"]}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge
                      variant={user?.isActive ? "default" : "outline"}
                      className="text-xs"
                    >
                      {user?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since</span>
                    <span className="font-medium">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", year: "numeric" }
                          )
                        : "—"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-end gap-3">
                {saved && (
                  <span className="flex items-center gap-1 text-sm text-success">
                    <Check className="h-4 w-4" />
                    Updated
                  </span>
                )}
                <Button
                  onClick={handleChangePassword}
                  disabled={
                    !passwordForm.current ||
                    !passwordForm.newPassword ||
                    passwordForm.newPassword !== passwordForm.confirm
                  }
                >
                  <Key className="mr-1.5 h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
