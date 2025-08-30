import axiosInstance from "@/lib/axios";
import { headersApi } from "@/lib/headers-api";

export interface Department {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  manager: string;
  staffCount: number;
  userManager: string;
}

export interface SendDepartment {
  _id?: string;
  name: string;
  description: string;
  userManager: string;
}

export interface DepartmentResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Department[];
}

export const departmentService = {
  createDepartment: async (data: SendDepartment) => {
    const response = await axiosInstance.post<SendDepartment>(
      "/departments",
      data,
      {
        headers: headersApi,
      }
    );
    return response.data;
  },

  updateDepartment: async (id: string, data: SendDepartment) => {
    const response = await axiosInstance.patch<SendDepartment>(
      `/departments/${id}`,
      data,
      {
        headers: headersApi,
      }
    );
    return response.data;
  },

  deleteDepartment: async (id: string) => {
    const response = await axiosInstance.delete<DepartmentResponse>(
      `/departments/${id}`,
      {
        headers: headersApi,
      }
    );
    return response.data;
  },

  getDepartmentById: async (id: string) => {
    const response = await axiosInstance.get<DepartmentResponse>(
      `/departments/${id}`,
      {
        headers: headersApi,
      }
    );
    return response.data.data;
  },

  getAllDepartments: async () => {
    const response = await axiosInstance.get<DepartmentResponse>(
      `/departments`,
      {
        headers: headersApi,
      }
    );
    return response.data;
  },
};
