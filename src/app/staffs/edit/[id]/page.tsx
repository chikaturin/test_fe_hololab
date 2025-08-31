"use client";

import { EditStaffForm } from "@/components/staff/edit-staff-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RoleBasedRoute } from "@/components/auth/role-based-route";
import { usePermission } from "@/hooks/use-permission";
import { useParams } from "next/navigation";

export default function EditstaffPage() {
  const params = useParams();
  const id = params.id as string;
  const { isAdmin, isManager, user } = usePermission();

  const getUserRoleDisplay = () => {
    if (!user || !user.userRoles || user.userRoles.length === 0) return "User";

    // Lấy role đầu tiên (thường user chỉ có 1 role)
    const roleName = user.userRoles[0].role.name;

    // Kiểm tra và hiển thị role chính xác
    if (roleName.toLowerCase() === "super admin") return "Super Admin";
    if (roleName.toLowerCase() === "admin") return "Admin";
    if (roleName.toLowerCase() === "manager") return "Manager";
    if (
      roleName.toLowerCase() === "staff" ||
      roleName.toLowerCase() === "staff"
    )
      return "Staff";

    return roleName; // Trả về tên role gốc nếu không match
  };

  const getPageTitle = () => {
    const roleDisplay = getUserRoleDisplay();
    if (roleDisplay === "Super Admin") return "Edit staff (Super Admin)";
    if (roleDisplay === "Admin") return "Edit staff (Admin)";
    if (isManager()) return "Edit staff";
    return "Edit Profile";
  };

  const getPageDescription = () => {
    const roleDisplay = getUserRoleDisplay();
    if (roleDisplay === "Super Admin") {
      return "Update staff information with full super administrative privileges";
    } else if (roleDisplay === "Admin") {
      return "Update staff information with full administrative privileges";
    } else if (isManager()) {
      return "Update staff information and save changes";
    } else {
      return "Update your personal information and save changes";
    }
  };

  const getCardTitle = () => {
    const roleDisplay = getUserRoleDisplay();
    if (roleDisplay === "Super Admin")
      return "staff Information (Super Admin Access)";
    if (roleDisplay === "Admin") return "staff Information (Admin Access)";
    if (isManager()) return "staff Information";
    return "Profile Information";
  };

  const getCardDescription = () => {
    const roleDisplay = getUserRoleDisplay();
    if (roleDisplay === "Super Admin") {
      return "Modify the details below to update the staff profile. You have full super administrative access to all fields.";
    } else if (roleDisplay === "Admin") {
      return "Modify the details below to update the staff profile. You have full access to all fields.";
    } else if (isManager()) {
      return "Modify the details below to update the staff profile";
    } else {
      return "Modify the details below to update your profile";
    }
  };

  const shouldShowBackButton = () => {
    return isAdmin() || isManager(); // Chỉ Admin và Manager mới thấy nút Back
  };

  return (
    <ProtectedRoute>
      <RoleBasedRoute requiredPermission="edit-staff" staffId={id}>
        <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
          <div className="border-b border-border bg-muted/30">
            <div className="container mx-auto px-4 py-3">
              {/* Chỉ hiển thị nút Back cho Admin và Manager */}
              {shouldShowBackButton() && (
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="/staffs"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to staffs</span>
                  </a>
                </Button>
              )}
            </div>
          </div>

          <main className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-foreground">
                  {getPageTitle()}
                </h2>
                <p className="text-muted-foreground">{getPageDescription()}</p>
              </div>

              <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-xl font-semibold">
                    {getCardTitle()}
                  </CardTitle>
                  <CardDescription>{getCardDescription()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <EditStaffForm staffId={id} />
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </RoleBasedRoute>
    </ProtectedRoute>
  );
}
