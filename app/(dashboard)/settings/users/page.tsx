"use client";

import { Badge } from "@/components/ui/badge";
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
import type { Role, User } from "@/types";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const initialUsers: User[] = [
  { id: "u1", name: "Admin User", email: "admin@mystore.com", role: "super_admin", isActive: true, lastActiveAt: "2026-03-11T10:00:00Z", createdAt: "2025-01-01T00:00:00Z" },
  { id: "u2", name: "Jane Smith", email: "jane@mystore.com", role: "admin", isActive: true, lastActiveAt: "2026-03-10T15:00:00Z", createdAt: "2025-06-15T00:00:00Z" },
  { id: "u3", name: "John Seller", email: "john@mystore.com", role: "seller", isActive: true, lastActiveAt: "2026-03-09T12:00:00Z", createdAt: "2025-09-01T00:00:00Z" },
  { id: "u4", name: "Support Agent", email: "support@mystore.com", role: "support", isActive: false, lastActiveAt: "2026-02-28T09:00:00Z", createdAt: "2025-11-01T00:00:00Z" },
];

const roleLabels: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  seller: "Seller",
  support: "Support",
};

const roleBadgeVariant: Record<Role, "default" | "secondary" | "outline"> = {
  super_admin: "default",
  admin: "default",
  seller: "secondary",
  support: "outline",
};

export default function UsersRolesPage() {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "seller" as Role,
  });

  const addUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers((prev) => [
      ...prev,
      {
        id: `u${Date.now()}`,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isActive: true,
        lastActiveAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewUser({ name: "", email: "", role: "seller" });
    setShowForm(false);
  };

  const toggleActive = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u))
    );
  };

  const removeUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Team Members</CardTitle>
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add User
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {showForm && (
            <div className="space-y-3 rounded-lg border border-border border-dashed p-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="user@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Role</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(v) =>
                      setNewUser((p) => ({ ...p, role: v as Role }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={addUser}>
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 rounded-lg border border-border p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                {user.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <Badge variant={roleBadgeVariant[user.role]} className="text-xs">
                    {roleLabels[user.role]}
                  </Badge>
                  {!user.isActive && (
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      Inactive
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(user.id)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    user.isActive ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                      user.isActive ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
                {user.role !== "super_admin" && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {[
              { role: "Super Admin", perms: "Full access to all features and settings" },
              { role: "Admin", perms: "Manage products, orders, customers, and view analytics" },
              { role: "Seller", perms: "Manage own products, view orders, and inventory" },
              { role: "Support", perms: "View orders, customers, and manage reviews" },
            ].map((item) => (
              <div
                key={item.role}
                className="flex items-start gap-3 rounded-md border border-border p-3"
              >
                <span className="font-medium">{item.role}</span>
                <span className="text-muted-foreground">{item.perms}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
