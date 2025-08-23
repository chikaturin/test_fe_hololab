import type { User } from "@/types/entities/user";

export const getUserPrimaryRole = (user: User): string => {
  if (user.userRoles && user.userRoles.length > 0) {
    return user.userRoles[0].role.name;
  }
  return "user";
};

export const getUserRoles = (user: User): string[] => {
  if (user.userRoles && user.userRoles.length > 0) {
    return user.userRoles.map((userRole) => userRole.role.name);
  }
  return ["user"];
};

export const hasRole = (user: User, roleName: string): boolean => {
  const roles = getUserRoles(user);
  return roles.includes(roleName.toLowerCase());
};

export const isTeacher = (user: User): boolean => {
  return hasRole(user, "teacher");
};

export const getRoleDisplayName = (roleName: string): string => {
  switch (roleName.toLowerCase()) {
    case "admin":
      return "Administrator";
    case "teacher":
      return "Teacher";
    case "student":
      return "Student";
    case "user":
      return "User";
    default:
      return roleName.charAt(0).toUpperCase() + roleName.slice(1);
  }
};

export const getRolePriority = (roleName: string): number => {
  switch (roleName.toLowerCase()) {
    case "admin":
      return 1;
    case "teacher":
      return 2;
    case "student":
      return 3;
    case "user":
      return 4;
    default:
      return 5;
  }
};
