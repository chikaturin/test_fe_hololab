"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Building2, Shield, User } from "lucide-react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { usePermission } from "@/hooks/use-permission";
import { useGetCurrentUser } from "@/hooks/use-auth";

export default function ManagementPage() {
  const { isAdmin, isManager, isStaff, user } = usePermission();
  const { data: authData } = useGetCurrentUser();

  // Debug: Kiểm tra staffId
  console.log("user?.staffId:", user?.staffId);
  console.log("authData?.staffId:", authData?.staffId);
  console.log("user:", user);
  console.log("authData:", authData);

  const getUserRoleDisplay = () => {
    if (!user || !user.userRoles || user.userRoles.length === 0) return "User";

    const roleName = user.userRoles[0].role.name;

    if (roleName.toLowerCase() === "super admin") return "Super Admin";
    if (roleName.toLowerCase() === "admin") return "Admin";
    if (roleName.toLowerCase() === "manager") return "Manager";
    if (
      roleName.toLowerCase() === "staff" ||
      roleName.toLowerCase() === "employee"
    )
      return "Staff";

    return roleName;
  };

  const getWelcomeMessage = () => {
    if (isAdmin()) {
      return "Access all system management tools with full administrative privileges.";
    } else if (isManager()) {
      return "Access all your human resource management tools from one central location.";
    } else {
      return "Manage your personal information and profile.";
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-[90vh] bg-gradient-to-br from-background via-card to-muted">
        <main className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome, {user?.email}!
            </h1>
            <p className="text-lg text-muted-foreground">
              Role:{" "}
              <span className="font-semibold text-primary">
                {getUserRoleDisplay()}
              </span>
            </p>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {getWelcomeMessage()}
            </p>
          </div>

          <div
            className={`grid gap-6 ${
              isAdmin() || isManager()
                ? "md:grid-cols-1 lg:grid-cols-3"
                : "md:grid-cols-1 lg:grid-cols-1 max-w-md mx-auto"
            }`}
          >
            {(isAdmin() || isManager()) && (
              <Link href="/staffs" className="group">
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="text-center space-y-4">
                    <div className="mx-auto p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Staff Management</CardTitle>
                    <CardDescription className="text-center">
                      Add, edit, and manage staff profiles, personal
                      information, and employment details.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}

            {(isAdmin() || isManager()) && (
              <Link href="/departments" className="group">
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="text-center space-y-4">
                    <div className="mx-auto p-4 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
                      <Building2 className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="text-xl">
                      Department Management
                    </CardTitle>
                    <CardDescription className="text-center">
                      Create and manage organizational departments, set budgets,
                      and assign managers.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}

            {(isAdmin() || isManager()) && (
              <Link href="/roles" className="group">
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="text-center space-y-4">
                    <div className="mx-auto p-4 bg-secondary/10 rounded-full group-hover:bg-secondary/20 transition-colors">
                      <Shield className="h-8 w-8 text-secondary" />
                    </div>
                    <CardTitle className="text-xl">Role Management</CardTitle>
                    <CardDescription className="text-center">
                      Define user roles, set permissions, and manage access
                      levels across the system.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}

            {isStaff() && (
              <Link
                href={`/staffs/edit/${authData?.staffId}`}
                className="group"
              >
                <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardHeader className="text-center space-y-4">
                    <div className="mx-auto p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Profile</CardTitle>
                    <CardDescription className="text-center">
                      Update your personal information, contact details, and
                      profile settings.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )}
          </div>

          {isAdmin() && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                As an administrator, you have full access to all system features
                and can manage everything.
              </p>
            </div>
          )}

          {isManager() && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                As a manager, you can manage staff, departments, and roles, but
                cannot perform destructive operations.
              </p>
            </div>
          )}

          {isStaff() && (
            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                As a staff member, you can only edit your own profile
                information.
              </p>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
