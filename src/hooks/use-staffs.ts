import {
  staffService,
  StaffResponse,
  type sendStaff,
  type Staff,
} from "@/services/staff.service";
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

export const useGetStaffById = (id: string) => {
  return useQuery<Staff>({
    queryKey: ["staffs", id],
    queryFn: () => staffService.getStaffById(id),
  });
};

export const useUpdateStaff = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<StaffResponse, unknown, { id: string; data: sendStaff }>({
    mutationFn: ({ id, data }) => staffService.updateStaff(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      toast.success("Staff updated successfully");
      router.push("/staffs");
    },
    onError: () => {
      toast.error("Failed to update staff");
    },
  });
};
