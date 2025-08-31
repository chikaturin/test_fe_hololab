"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import { RoleBasedNavigation } from "./role-based-navigation";
import { useUserStore } from "@/stores/use-user-store";

export function ConditionalHeader() {
  const pathname = usePathname();
  const { user } = useUserStore();

  // Không hiển thị header cho trang login/register/change-password
  if (
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/change-password")
  ) {
    return null;
  }

  // Nếu user đã đăng nhập, hiển thị navigation dựa trên role
  if (user) {
    return <RoleBasedNavigation />;
  }

  // Nếu chưa đăng nhập, hiển thị header mặc định
  return <Header />;
}
