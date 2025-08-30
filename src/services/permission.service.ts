import axiosInstance from "@/lib/axios";

export interface Permission {
  _id: string;
  name: string;
  module: string;
}

export const permissionService = {
  getAllPermissions: async () => {
    const response = await axiosInstance.get("/permissions");
    return response.data;
  },

  getPermissionById: async (id: string) => {
    const response = await axiosInstance.get(`/permissions/${id}`);
    return response.data;
  },
};
