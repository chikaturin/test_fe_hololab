import { useMutation, useQuery } from "@tanstack/react-query";
import { roleService, updateRole } from "@/services/role.service";
import { queryClient } from "@/providers/query-client";
import { toast } from "sonner";
import { ApiError } from "@/types/api";
import { useRouter } from "next/navigation";

export const useGetAllRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: roleService.getAllRoles,
    retry: 1,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useGetRoleById = (id: string) => {
  return useQuery({
    queryKey: ["roles", id],
    queryFn: () => roleService.getRoleById(id),
    retry: 1,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useUpdateRole = (id: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: (role: updateRole) => roleService.updateRole(id, role),
    onSuccess: () => {
      toast.success("Role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["roles", id] });
      router.push("/roles");
    },
    onError: (error: ApiError) => {
      const message = error.response?.data?.message || "Failed to update role";
      toast.error(message);
    },
  });
};
