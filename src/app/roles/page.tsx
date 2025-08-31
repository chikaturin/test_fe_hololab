"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Shield } from "lucide-react";
import { RoleCard } from "@/components/roles/role-card";
import { type Role } from "@/services/role.service";
import { useGetAllRoles } from "@/hooks/use-roles";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleBasedRoute } from "@/components/auth/role-based-route";

export default function RolesPage() {
  const { data: roles } = useGetAllRoles();

  const handleEdit = (role: Role) => {
    window.location.href = `/roles/edit/${role._id}`;
  };

  const handleDelete = (id: string) => {
    const role = roles?.find((r) => r._id === id);
    if (role?.usersCount && role.usersCount > 0) {
      console.log(
        "Cannot Delete Role:",
        `${role.name} is assigned to ${role.usersCount} users. Please reassign users before deleting.`
      );
      return;
    }

    if (
      confirm(
        `Are you sure you want to delete ${role?.name}? This action cannot be undone.`
      )
    ) {
      console.log(
        "Role Deleted:",
        `${role?.name} has been successfully deleted.`
      );
    }
  };

  return (
    <ProtectedRoute>
      <RoleBasedRoute requiredPermission="staff-management">
        <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
          <main className="container mx-auto px-4 py-8">
            <div className="space-y-6">
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
                {/* <Button
                  variant="default"
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground w-fit"
                >
                  <Link href="/roles/add" className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Role</span>
                  </Link>
                </Button> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles
                  ?.sort((a, b) => {
                    const levelOrder: Record<string, number> = {
                      high: 3,
                      medium: 2,
                      low: 1,
                    };
                    return levelOrder[b.level] - levelOrder[a.level];
                  })
                  .map((role) => (
                    <RoleCard
                      key={role._id}
                      role={role}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
              </div>

              {roles?.length === 0 && (
                <Card className="shadow-sm border-0 bg-card/80 backdrop-blur-sm">
                  <CardContent className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No roles found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Get started by adding your first role.
                    </p>

                    <Button
                      asChild
                      className="bg-primary hover:bg-primary/90 w-fit"
                    >
                      <Link
                        href="/roles/add"
                        className="flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Role</span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </RoleBasedRoute>
    </ProtectedRoute>
  );
}
