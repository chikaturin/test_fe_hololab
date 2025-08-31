import { permissionService } from "@/services/permission.service";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/use-user-store";

export const useGetAllPermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: () => permissionService.getAllPermissions(),
  });
};

export const usePermission = () => {
  const { user } = useUserStore();

  const isAdmin = () => {
    if (!user || !user.userRoles) return false;
    return user.userRoles.some(
      (userRole) =>
        userRole.role.name.toLowerCase() === "admin" ||
        userRole.role.name.toLowerCase() === "super admin" ||
        userRole.role.name.toLowerCase() === "superadmin"
    );
  };

  const isManager = () => {
    if (!user || !user.userRoles) return false;
    return user.userRoles.some(
      (userRole) => userRole.role.name.toLowerCase() === "manager"
    );
  };

  const isStaff = () => {
    if (!user || !user.userRoles) return false;
    return user.userRoles.some(
      (userRole) =>
        userRole.role.name.toLowerCase() === "staff" ||
        userRole.role.name.toLowerCase() === "employee"
    );
  };

  const canAccessStaffManagement = () => {
    return isAdmin() || isManager();
  };

  const canAccessDepartmentManagement = () => {
    return isAdmin() || isManager();
  };

  const canEditStaff = (staffId?: string) => {
    console.log("canEditStaff called with staffId:", staffId);
    console.log("user?.staffId:", user?.staffId);
    console.log("isStaff():", isStaff());

    if (isAdmin()) {
      console.log("Admin access granted");
      return true;
    }
    if (isManager()) {
      console.log("Manager access granted");
      return true;
    }
    if (isStaff() && staffId) {
      const canEdit = user?.staffId === staffId;
      console.log(
        "Staff canEdit:",
        canEdit,
        "user?.staffId === staffId:",
        user?.staffId === staffId
      );
      return canEdit;
    }
    console.log("No permission");
    return false;
  };

  const canViewStaffList = () => {
    return isAdmin() || isManager();
  };

  const canAddStaff = () => {
    return isAdmin() || isManager();
  };

  const canAccessRoleManagement = () => {
    return isAdmin() || isManager();
  };

  const canDeleteStaff = () => {
    return isAdmin();
  };

  const canDeleteDepartment = () => {
    return isAdmin();
  };

  const canDeleteRole = () => {
    return isAdmin();
  };

  return {
    isAdmin,
    isManager,
    isStaff,
    canAccessStaffManagement,
    canAccessDepartmentManagement,
    canEditStaff,
    canViewStaffList,
    canAddStaff,
    canAccessRoleManagement,
    canDeleteStaff,
    canDeleteDepartment,
    canDeleteRole,
    user,
  };
};
