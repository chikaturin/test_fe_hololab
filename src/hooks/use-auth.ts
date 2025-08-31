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
  LogoutRequest,
  ChangePasswordRequest,
} from "@/services/auth.service";
import { User } from "@/types/entities/user";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useLogin = () => {
  const router = useRouter();

  return useMutation<
    AuthResponse,
    ApiError,
    { email: string; password: string }
  >({
    mutationFn: authService.login,
    onSuccess: (data: AuthResponse, variables) => {
      if (data && data.accessToken && data.refreshToken && data.sessionId) {
        Cookies.set("accessToken", data.accessToken, { expires: 24 });
        Cookies.set("refreshToken", data.refreshToken, { expires: 60 });
        Cookies.set("sessionId", data.sessionId, { expires: 24 });

        console.log("Cookies set successfully");
      } else {
        console.log("Required accessToken data missing:", data);
      }

      toast.success("Login successful!");
      console.log("Login successful!");

      const { email, password } = variables;

      if (password === "staff@123") {
        setTimeout(() => {
          router.push("/change-password?email=" + encodeURIComponent(email));
        }, 100);
      } else {
        setTimeout(() => {
          router.push("/");
        }, 100);
      }
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
        Cookies.set("accessToken", data.accessToken, { expires: 24 });
        Cookies.set("refreshToken", data.refreshToken, { expires: 60 });
        Cookies.set("sessionId", data.sessionId, { expires: 24 });
      }
    },
    onError: (error: ApiError) => {
      const message =
        error.response?.data?.message || "Refresh accessToken failed";
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout } = useUserStore();

  return useMutation<AuthResponse, ApiError, LogoutRequest>({
    mutationFn: authService.logout,
    onSuccess: () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("sessionId");

      logout();
      queryClient.clear();

      toast.success("Logged out successfully!");
      router.push("/login");
    },
    onError: (error: ApiError) => {
      const message = error.response?.data?.message || "Logout failed";
      console.log(message);

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("sessionId");

      logout();
      queryClient.clear();

      toast.success("Logged out successfully!");
      router.push("/login");
    },
  });
};

export const useGetCurrentUser = () => {
  const accessToken = Cookies.get("accessToken");

  return useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: authService.getCurrentUser,
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useAuthCheck = () => {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const sessionId = Cookies.get("sessionId");

  const isPublicRoute = ["/login"].some((route) => pathname?.startsWith(route));

  const { data: user, isError, isLoading } = useGetCurrentUser();
  const { mutate: refreshTokenMutation } = useRefreshToken();

  useEffect(() => {
    if (!accessToken && !isPublicRoute) {
      router.push("/login");
      return;
    }

    if (accessToken && isError && refreshToken && sessionId) {
      refreshTokenMutation(
        { refreshToken, sessionId },
        {
          onSuccess: (data) => {
            if (
              data &&
              data.accessToken &&
              data.refreshToken &&
              data.sessionId
            ) {
              Cookies.set("accessToken", data.accessToken, { expires: 24 });
              Cookies.set("refreshToken", data.refreshToken, { expires: 60 });
              Cookies.set("sessionId", data.sessionId, { expires: 24 });
              toast.success("Token refreshed successfully");
            }
          },
          onError: () => {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            Cookies.remove("sessionId");
            if (!isPublicRoute) {
              router.push("/login");
            }
            toast.error("Session expired. Please login again.");
          },
        }
      );
    }
  }, [
    accessToken,
    isError,
    refreshToken,
    sessionId,
    isPublicRoute,
    router,
    refreshTokenMutation,
  ]);

  return {
    isAuthenticated: !!accessToken && !!user,
    isLoading,
    user,
    isPublicRoute,
  };
};

export const useChangePassword = () => {
  const router = useRouter();
  return useMutation<AuthResponse, ApiError, ChangePasswordRequest>({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("sessionId");

      router.push("/login");
    },
    onError: (error: ApiError) => {
      console.log("Debug - API Error:", error);
      const message =
        error.response?.data?.message ||
        "Failed to change password. Please try again.";
      toast.error(message);
    },
  });
};
