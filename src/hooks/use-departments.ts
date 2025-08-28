import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { departmentService } from "@/services/department.service";
import { toast } from "sonner";

export const useGetAllDepartment = () => {
  return useQuery({
    queryKey: ["departments"],
    staleTime: 1000 * 60 * 5,
    queryFn: departmentService.getAllDepartments,
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: departmentService.deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: departmentService.createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      toast.success("Department created successfully");
    },
  });
};
