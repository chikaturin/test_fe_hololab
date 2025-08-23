import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { useUserStore } from "@/stores/use-user-store";
import type { ApiError } from "@/types/api";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.success && data.data) {
        Cookies.set("token", data.data.accessToken, { expires: 24 });
        Cookies.set("refreshToken", data.data.refreshToken, { expires: 60 });
        Cookies.set("sessionId", data.data.sessionId, { expires: 24 });

        toast.success("Login successful!");

        router.replace("/");
      }
    },
    onError: (error: ApiError) => {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: authService.refreshToken,
    onSuccess: (data) => {
      if (data.success && data.data) {
        Cookies.set("token", data.data.accessToken, { expires: 24 });
        Cookies.set("refreshToken", data.data.refreshToken, { expires: 60 });
        Cookies.set("sessionId", data.data.sessionId, { expires: 24 });
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
