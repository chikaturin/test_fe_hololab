import { permissionService } from "@/services/permission.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: permissionService.getAllPermissions,
  });
};
