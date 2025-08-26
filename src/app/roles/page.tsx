"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Shield } from "lucide-react";
import { RoleForm } from "@/components/roles/role-form";
import { RoleCard } from "@/components/roles/role-card";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  level: "low" | "medium" | "high";
  createdAt: string;
}

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Administrator",
      description: "Full system access with all permissions",
      permissions: [
        "view_employees",
        "add_employees",
        "edit_employees",
        "delete_employees",
        "view_departments",
        "manage_departments",
        "view_roles",
        "manage_roles",
        "view_reports",
        "generate_reports",
        "system_settings",
        "user_management",
      ],
      userCount: 2,
      level: "high",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Manager",
      description: "Department management and employee oversight",
      permissions: [
        "view_employees",
        "add_employees",
        "edit_employees",
        "view_departments",
        "view_reports",
        "generate_reports",
      ],
      userCount: 5,
      level: "medium",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      name: "HR Staff",
      description: "Human resources operations and employee management",
      permissions: [
        "view_employees",
        "add_employees",
        "edit_employees",
        "view_departments",
        "view_reports",
      ],
      userCount: 8,
      level: "medium",
      createdAt: "2024-01-20",
    },
    {
      id: "4",
      name: "Employee",
      description: "Basic access to view personal information",
      permissions: ["view_employees"],
      userCount: 45,
      level: "low",
      createdAt: "2024-01-25",
    },
  ]);

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (formData: unknown) => {
    if (editingRole) {
      const roleData = formData as Partial<Role>;
      setRoles((prev) =>
        prev.map((role) =>
          role.id === editingRole?.id ? { ...role, ...roleData } : role
        )
      );
      console.log(
        "Role Updated:",
        `${roleData?.name} has been successfully updated.`
      );
      setEditingRole(null);
    } else {
      const roleData = formData as Partial<Role>;
      const newRole: Role = {
        id: Date.now().toString(),
        name: roleData.name || "New Role",
        description: roleData.description || "",
        permissions: roleData.permissions || [],
        level: roleData.level || "low",
        userCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setRoles((prev) => [...prev, newRole]);
      console.log(
        "Role Added:",
        `${roleData?.name} has been successfully created.`
      );
    }
    setShowAddForm(false);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    const role = roles.find((r) => r.id === id);
    if (role?.userCount && role.userCount > 0) {
      console.log(
        "Cannot Delete Role:",
        `${role.name} is assigned to ${role.userCount} users. Please reassign users before deleting.`
      );
      return;
    }

    if (
      confirm(
        `Are you sure you want to delete ${role?.name}? This action cannot be undone.`
      )
    ) {
      setRoles((prev) => prev.filter((role) => role.id !== id));
      console.log(
        "Role Deleted:",
        `${role?.name} has been successfully deleted.`
      );
    }
  };

  const resetForm = () => {
    setEditingRole(null);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <Shield className="h-8 w-8 text-primary" />
                Role Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Define user roles and manage permissions
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </div>

          {/* Search Bar */}
          <Card className="shadow-sm border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Role Form */}
          {showAddForm && (
            <RoleForm
              role={editingRole}
              onSubmit={handleSubmit}
              onCancel={resetForm}
            />
          )}

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* No roles found message */}
          {filteredRoles.length === 0 && (
            <Card className="shadow-sm border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="text-center py-8">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No roles found
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "Get started by adding your first role."}
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setShowAddForm(true)}
                    className="bg-primary hover:bg-primary/90 w-fit"
                  >
                    {/* <Plus className="h-4 w-4 mr-2" /> */}
                    Add Role
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
