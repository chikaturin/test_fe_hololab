import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { useUserStore } from "@/stores/use-user-store";
import type { ApiError } from "@/types/api";
import type {
  AuthResponse,
  RefreshTokenRequest,
} from "@/services/auth.service";
import { User } from "@/types/entities/user";

export const useLogin = () => {
  const router = useRouter();

  return useMutation<
    AuthResponse,
    ApiError,
    { email: string; password: string }
  >({
    mutationFn: authService.login,
    onSuccess: (data: AuthResponse) => {
      if (data && data.accessToken && data.refreshToken && data.sessionId) {
        Cookies.set("token", data.accessToken, { expires: 24 });
        Cookies.set("refreshToken", data.refreshToken, { expires: 60 });
        Cookies.set("sessionId", data.sessionId, { expires: 24 });

        console.log("Cookies set successfully");
      } else {
        console.log("Required token data missing:", data);
      }

      toast.success("Login successful!");
      console.log("Login successful!");

      router.push("/");
    },
    onError: (error: ApiError) => {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation<AuthResponse, ApiError, RefreshTokenRequest>({
    mutationFn: authService.refreshToken,
    onSuccess: (data: AuthResponse) => {
      if (data && data.accessToken && data.refreshToken && data.sessionId) {
        Cookies.set("token", data.accessToken, { expires: 24 });
        Cookies.set("refreshToken", data.refreshToken, { expires: 60 });
        Cookies.set("sessionId", data.sessionId, { expires: 24 });
      }
    },
    onError: (error: ApiError) => {
      const message = error.response?.data?.message || "Refresh token failed";
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout } = useUserStore();

  return () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("sessionId");

    logout();

    queryClient.clear();

    toast.success("Logged out successfully!");
    router.push("/login");
  };
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: authService.getCurrentUser,
    enabled: !!Cookies.get("token"),
    select: (data: User) => data,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
