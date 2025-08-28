import { staffService } from "@/services/staff.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useCreateStaff = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: staffService.createStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      toast.success("Staff created successfully");
      router.push("/staffs");
    },
    onError: () => {
      toast.error("Failed to create staff");
    },
  });
};

export const useGetAllStaff = () => {
  return useQuery({
    queryKey: ["staffs"],
    queryFn: staffService.getAllStaff,
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: staffService.deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
    onError: () => {
      toast.error("Failed to delete staff");
    },
  });
};
