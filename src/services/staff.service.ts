import axiosInstance from "@/lib/axios";
import { headersApi } from "@/lib/headers-api";
import { SendDepartment } from "./department.service";

export interface Staff {
  _id: string;
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  address: string;
  departmentId: SendDepartment;
  jobTitle: string;
  hireDate: string;
  email: string;
  password: string;
}

export interface sendStaff {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  address: string;
  departmentId: string;
  jobTitle: string;
  hireDate: string;
  email: string;
  password: string;
  salary: number;
}

export interface StaffResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Staff;
}

export const staffService = {
  createStaff: async (data: sendStaff) => {
    const response = await axiosInstance.post<StaffResponse>("/staff", data, {
      headers: headersApi,
    });
    return response.data;
  },

  getAllStaff: async () => {
    const response = await axiosInstance.get<StaffResponse>("/staff", {
      headers: headersApi,
    });
    return response.data;
  },

  getStaffById: async (id: string) => {
    const response = await axiosInstance.get<StaffResponse>(`/staff/${id}`, {
      headers: headersApi,
    });
    return response.data;
  },

  deleteStaff: async (id: string) => {
    const response = await axiosInstance.delete<StaffResponse>(`/staff/${id}`, {
      headers: headersApi,
    });
    return response.data;
  },
};
