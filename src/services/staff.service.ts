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
  salary: number;
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

export interface updateStaff {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  address: string;
  salary: number;
  departmentId: string;
}

export const staffService = {
  createStaff: async (data: sendStaff): Promise<StaffResponse> => {
    const response = await axiosInstance.post<StaffResponse>("/staff", data, {
      headers: headersApi,
    });
    return response.data;
  },

  getAllStaff: async (): Promise<StaffResponse> => {
    const response = await axiosInstance.get<StaffResponse>("/staff", {
      headers: headersApi,
    });
    return response.data;
  },

  getStaffById: async (id: string): Promise<Staff> => {
    const response = await axiosInstance.get<StaffResponse>(`/staff/${id}`, {
      headers: headersApi,
    });
    return response.data.data; // return Staff directly
  },

  deleteStaff: async (id: string): Promise<StaffResponse> => {
    const response = await axiosInstance.delete<StaffResponse>(`/staff/${id}`, {
      headers: headersApi,
    });
    return response.data;
  },

  updateStaff: async (
    id: string,
    data: updateStaff
  ): Promise<StaffResponse> => {
    const response = await axiosInstance.put<StaffResponse>(
      `/staff/${id}`,
      data,
      {
        headers: headersApi,
      }
    );
    return response.data;
  },
};
