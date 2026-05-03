"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getInitials } from "@/lib/utils";
import type { User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, Eye, EyeOff, Key, Save, Shield } from "lucide-react";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  seller: "Seller",
  support: "Support",
};

interface MeResponse {
  id: number | string;
  name: string;
  email: string;
  avatar: string | null;
  role: User["role"];
  isActive: boolean;
  phone: string | null;
  bio: string | null;
  lastActiveAt: string | null;
  createdAt: string;
}

function toUser(me: MeResponse): User {
  return { ...me, id: String(me.id) };
}

async function authedFetch(path: string, init?: RequestInit) {
  const session = await getSession();
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(session?.accessToken
        ? { Authorization: `Bearer ${session.accessToken}` }
        : {}),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = Array.isArray(body.message)
      ? body.message.join(", ")
      : body.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return res;
}

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await authedFetch("/auth/me");
      const data = (await res.json()) as MeResponse;
      return toUser(data);
    },
  });
  const user = meQuery.data;

  const [activeTab, setActiveTab] = useState<"general" | "security">("general");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone ?? "",
        bio: user.bio ?? "",
      });
    }
  }, [user]);

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

  const updateMeMutation = useMutation({
    mutationFn: async () => {
      const res = await authedFetch("/auth/me", {
        method: "PATCH",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone === "" ? null : form.phone,
          bio: form.bio === "" ? null : form.bio,
        }),
      });
      const data = (await res.json()) as MeResponse;
      return toUser(data);
    },
    onSuccess: (updated) => {
      queryClient.setQueryData(["me"], updated);
      toast.success("Profile saved");
    },
    onError: (err) => toast.error(err.message),
  });

  const changePasswordMutation = useMutation({
    mutationFn: async () => {
      await authedFetch("/auth/me/password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword: passwordForm.current,
          newPassword: passwordForm.newPassword,
        }),
      });
    },
    onSuccess: () => {
      setPasswordForm({ current: "", newPassword: "", confirm: "" });
      toast.success("Password updated");
    },
    onError: (err) => toast.error(err.message),
  });

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
                  <AvatarImage
                    src={user?.avatar ?? undefined}
                    alt={user?.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {user ? getInitials(user.name) : "..."}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h3 className="mt-3 text-sm font-semibold">
                {user?.name ?? "—"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {user?.email ?? "—"}
              </p>
              {user && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  {roleLabels[user.role] ?? user.role}
                </Badge>
              )}
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
                <Button
                  onClick={() => updateMeMutation.mutate()}
                  disabled={updateMeMutation.isPending || !user}
                >
                  <Save className="mr-1.5 h-4 w-4" />
                  {updateMeMutation.isPending ? "Saving..." : "Save Changes"}
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
                    {user && (
                      <Badge variant="secondary" className="text-xs">
                        {roleLabels[user.role] ?? user.role}
                      </Badge>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    {user && (
                      <Badge
                        variant={user.isActive ? "default" : "outline"}
                        className="text-xs"
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    )}
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
                <Button
                  onClick={() => changePasswordMutation.mutate()}
                  disabled={
                    changePasswordMutation.isPending ||
                    !passwordForm.current ||
                    !passwordForm.newPassword ||
                    passwordForm.newPassword !== passwordForm.confirm
                  }
                >
                  <Key className="mr-1.5 h-4 w-4" />
                  {changePasswordMutation.isPending
                    ? "Updating..."
                    : "Update Password"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
