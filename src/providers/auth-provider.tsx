"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useGetCurrentUser, useRefreshToken } from "@/hooks/use-auth";
import { useUserStore } from "@/stores/use-user-store";
import { toast } from "sonner";

interface AuthProviderProps {
  children: React.ReactNode;
}

const publicRoutes = ["/login"];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, logout } = useUserStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const isPublicRoute = publicRoutes.some((route) =>
    pathname?.startsWith(route)
  );
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const sessionId = Cookies.get("sessionId");

  const { mutate: refreshTokenMutation, isPending: isRefreshing } =
    useRefreshToken();

  const { data: user, isError, isLoading } = useGetCurrentUser();

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!accessToken) {
        if (!isPublicRoute) {
          router.push("/login");
        }
        setIsCheckingAuth(false);
        return;
      }

      if (accessToken && !user && !isLoading) {
        if (isError && refreshToken && sessionId) {
          try {
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
                    Cookies.set("accessToken", data.accessToken, {
                      expires: 24,
                    });
                    Cookies.set("refreshToken", data.refreshToken, {
                      expires: 60,
                    });
                    Cookies.set("sessionId", data.sessionId, { expires: 24 });
                    toast.success("Token refreshed successfully");
                  }
                },
                onError: () => {
                  Cookies.remove("accessToken");
                  Cookies.remove("refreshToken");
                  Cookies.remove("sessionId");
                  logout();
                  if (!isPublicRoute) {
                    router.push("/login");
                  }
                  toast.error("Session expired. Please login again.");
                },
              }
            );
          } catch {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            Cookies.remove("sessionId");
            logout();
            if (!isPublicRoute) {
              router.push("/login");
            }
            toast.error("Session expired. Please login again.");
          }
        } else if (isError) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.remove("sessionId");
          logout();
          if (!isPublicRoute) {
            router.push("/login");
          }
          toast.error("Invalid session. Please login again.");
        }
      }

      setIsCheckingAuth(false);
    };

    checkAuthStatus();
  }, [
    accessToken,
    user,
    isLoading,
    isError,
    refreshToken,
    sessionId,
    isPublicRoute,
    router,
    logout,
    refreshTokenMutation,
  ]);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (isCheckingAuth || (isRefreshing && !isPublicRoute)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (!accessToken) {
    return null;
  }

  return <>{children}</>;
};
