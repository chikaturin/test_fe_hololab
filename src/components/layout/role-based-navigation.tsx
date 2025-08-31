"use client";

import { Button } from "@/components/ui/button";
import { Building2, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { usePermission } from "@/hooks/use-permission";
import { useUserStore } from "@/stores/use-user-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLogout } from "@/hooks/use-auth";

export function RoleBasedNavigation() {
  const pathname = usePathname();
  const { user } = useUserStore();
  const {
    canAccessStaffManagement,
    canAccessDepartmentManagement,
    canAccessRoleManagement,
  } = usePermission();

  const logoutMutation = useLogout();

  const handleLogout = () => {
    const sessionId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sessionId="))
      ?.split("=")[1];

    if (sessionId) {
      logoutMutation.mutate({ sessionId });
    } else {
      // Fallback nếu không có sessionId
      logoutMutation.mutate({ sessionId: "" });
    }
  };

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
      roleName.toLowerCase() === "employee"
    )
      return "Staff";

    return roleName; // Trả về tên role gốc nếu không match
  };

  if (!user) {
    return null;
  }

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary rounded-lg">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              HRM System
            </Link>
          </h1>
        </div>

        <nav className="flex items-center space-x-4">
          {/* Chỉ hiển thị menu Staff Management cho Admin và Manager */}
          {canAccessStaffManagement() && (
            <Button
              variant={pathname.startsWith("/staffs") ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link href="/staffs">Staff Management</Link>
            </Button>
          )}

          {/* Chỉ hiển thị menu Department Management cho Admin và Manager */}
          {canAccessDepartmentManagement() && (
            <Button
              variant={
                pathname.startsWith("/departments") ? "default" : "outline"
              }
              size="sm"
              asChild
            >
              <Link href="/departments">Departments</Link>
            </Button>
          )}

          {/* Chỉ hiển thị menu Role Management cho Admin và Manager */}
          {canAccessRoleManagement() && (
            <Button
              variant={pathname.startsWith("/roles") ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link href="/roles">Roles</Link>
            </Button>
          )}

          {/* User info và logout */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 border">
                <AvatarFallback className="bg-primary text-white text-sm">
                  {user?.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-foreground">{user?.email}</p>
                <p className="text-xs text-muted-foreground">
                  {getUserRoleDisplay()}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
