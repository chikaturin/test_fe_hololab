// "use client";

// import { useCurrentUser } from "@/hooks/use-current-user";
// import { useUserStore } from "@/stores/use-user-store";
// import { usePathname } from "next/navigation";

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// const publicRoutes = [
//   "/",
//   "/login",
//   "/register",
//   "/verify",
//   "/forgot-password",
//   "/google",
// ];

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const pathname = usePathname();
//   const { isLoading } = useUserStore();
//   const isPublicRoute = publicRoutes.includes(pathname);

//   const shouldFetchUser = !isPublicRoute;

//   useCurrentUser(shouldFetchUser);

//   if (shouldFetchUser && isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// };
