"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  level: "low" | "medium" | "high";
  createdAt: string;
}

const availablePermissions = [
  {
    id: "view_employees",
    label: "View Employees",
    category: "Employee Management",
  },
  {
    id: "add_employees",
    label: "Add Employees",
    category: "Employee Management",
  },
  {
    id: "edit_employees",
    label: "Edit Employees",
    category: "Employee Management",
  },
  {
    id: "delete_employees",
    label: "Delete Employees",
    category: "Employee Management",
  },
  {
    id: "view_departments",
    label: "View Departments",
    category: "Department Management",
  },
  {
    id: "manage_departments",
    label: "Manage Departments",
    category: "Department Management",
  },
  { id: "view_roles", label: "View Roles", category: "Role Management" },
  { id: "manage_roles", label: "Manage Roles", category: "Role Management" },
  { id: "view_reports", label: "View Reports", category: "Reporting" },
  { id: "generate_reports", label: "Generate Reports", category: "Reporting" },
  {
    id: "system_settings",
    label: "System Settings",
    category: "Administration",
  },
  {
    id: "user_management",
    label: "User Management",
    category: "Administration",
  },
];

interface RoleFormProps {
  role?: Role | null;
  onSubmit: (data: unknown) => void;
  onCancel: () => void;
}

export function RoleForm({ role, onSubmit, onCancel }: RoleFormProps) {
  const [formData, setFormData] = useState({
    name: role?.name || "",
    description: role?.description || "",
    permissions: role?.permissions || [],
    level: role?.level || ("low" as "low" | "medium" | "high"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter((p) => p !== permissionId),
    }));
  };

  const groupedPermissions = availablePermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, typeof availablePermissions>);

  return (
    <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>{role ? "Edit Role" : "Add New Role"}</CardTitle>
        <CardDescription>
          {role
            ? "Update role information and permissions"
            : "Define a new role with specific permissions"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., Manager"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Access Level</Label>
              <select
                id="level"
                value={formData.level}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    level: e.target.value as "low" | "medium" | "high",
                  }))
                }
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                required
              >
                <option value="low">Low Access</option>
                <option value="medium">Medium Access</option>
                <option value="high">High Access</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Brief description of role responsibilities..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Permissions</Label>
            <div className="space-y-4">
              {Object.entries(groupedPermissions).map(
                ([category, permissions]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-sm text-foreground">
                      {category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={permission.id}
                            checked={formData.permissions.includes(
                              permission.id
                            )}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                permission.id,
                                checked as boolean
                              )
                            }
                          />
                          <Label
                            htmlFor={permission.id}
                            className="text-sm font-normal"
                          >
                            {permission.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {role ? "Update Role" : "Add Role"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
