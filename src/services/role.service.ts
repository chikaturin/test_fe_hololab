import axiosInstance from "@/lib/axios";
import { headersApi } from "@/lib/headers-api";

export interface Role {
  _id: string;
  name: string;
  roleType: string;
  level: string;
  usersCount: number;
  permissionsCount: number;
  keyPermissions: string[];
}

export interface updateRole {
  name: string;
  level: string;
  permissions: string[];
}

export const roleService = {
  getAllRoles: async (): Promise<Role[]> => {
    const response = await axiosInstance.get("/roles", {
      headers: headersApi,
    });
    return response.data;
  },

  getRoleById: async (id: string): Promise<Role> => {
    const response = await axiosInstance.get(`/roles/${id}`, {
      headers: headersApi,
    });
    return response.data;
  },

  updateRole: async (id: string, role: updateRole): Promise<Role> => {
    const response = await axiosInstance.patch(`/roles/${id}`, role, {
      headers: headersApi,
    });
    return response.data;
  },
};
