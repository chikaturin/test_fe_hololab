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
  const token = Cookies.get("token");

  return useQuery({
    queryKey: ["auth"],
    queryFn: authService.getCurrentUser,
    enabled: !!token,
    select: (data: User) => data,
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
  const token = Cookies.get("token");
  const refreshToken = Cookies.get("refreshToken");
  const sessionId = Cookies.get("sessionId");

  const isPublicRoute = [
    "/login",
    "/register",
    "/verify",
    "/forgot-password",
    "/google",
  ].some((route) => pathname?.startsWith(route));

  const { data: user, isError, isLoading } = useGetCurrentUser();
  const { mutate: refreshTokenMutation } = useRefreshToken();

  useEffect(() => {
    if (!token && !isPublicRoute) {
      router.push("/login");
      return;
    }

    if (token && isError && refreshToken && sessionId) {
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
              Cookies.set("token", data.accessToken, { expires: 24 });
              Cookies.set("refreshToken", data.refreshToken, { expires: 60 });
              Cookies.set("sessionId", data.sessionId, { expires: 24 });
              toast.success("Token refreshed successfully");
            }
          },
          onError: () => {
            Cookies.remove("token");
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
    token,
    isError,
    refreshToken,
    sessionId,
    isPublicRoute,
    router,
    refreshTokenMutation,
  ]);

  return {
    isAuthenticated: !!token && !!user,
    isLoading,
    user,
    isPublicRoute,
  };
};
