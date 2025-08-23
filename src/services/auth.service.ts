import axiosInstance from "@/lib/axios";

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
  statusCode: number;
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    sessionId: string;
  };
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
};
