import axiosInstance from "@/lib/axios";
import { User } from "@/types/entities/user";
import Cookies from "js-cookie";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  sessionId: string;
}

export interface LogoutRequest {
  sessionId: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
}

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      data
    );
    return response.data;
  },

  refreshToken: async (data: RefreshTokenRequest) => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/refresh-token",
      data
    );
    return response.data;
  },

  logout: async (data: LogoutRequest) => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/logout",
      data
    );
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get("/auth", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "x-session-id": Cookies.get("sessionId"),
      },
    });
    return response.data;
  },
};
