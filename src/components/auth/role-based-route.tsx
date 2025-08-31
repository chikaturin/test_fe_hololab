"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePermission } from "@/hooks/use-permission";
import { toast } from "sonner";

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredPermission:
    | "staff-management"
    | "department-management"
    | "edit-staff";
  staffId?: string;
  fallbackPath?: string;
}

export function RoleBasedRoute({
  children,
  requiredPermission,
  staffId,
  fallbackPath = "/",
}: RoleBasedRouteProps) {
  const router = useRouter();
  const {
    canAccessStaffManagement,
    canAccessDepartmentManagement,
    canEditStaff,
    user,
  } = usePermission();

  useEffect(() => {
    if (!user) return;

    let hasPermission = false;

    switch (requiredPermission) {
      case "staff-management":
        hasPermission = canAccessStaffManagement();
        break;
      case "department-management":
        hasPermission = canAccessDepartmentManagement();
        break;
      case "edit-staff":
        hasPermission = canEditStaff(staffId);
        break;
      default:
        hasPermission = false;
    }

    if (!hasPermission) {
      toast.error("Bạn không có quyền truy cập trang này");
      router.push(fallbackPath);
    }
  }, [
    user,
    requiredPermission,
    staffId,
    fallbackPath,
    router,
    canAccessStaffManagement,
    canAccessDepartmentManagement,
    canEditStaff,
  ]);

  if (!user) {
    return null;
  }

  // Kiểm tra quyền trước khi render
  let hasPermission = false;

  switch (requiredPermission) {
    case "staff-management":
      hasPermission = canAccessStaffManagement();
      break;
    case "department-management":
      hasPermission = canAccessDepartmentManagement();
      break;
    case "edit-staff":
      hasPermission = canEditStaff(staffId);
      break;
    default:
      hasPermission = false;
  }

  if (!hasPermission) {
    return null;
  }

  return <>{children}</>;
}
