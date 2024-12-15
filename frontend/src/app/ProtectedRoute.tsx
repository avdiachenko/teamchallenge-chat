import { Navigate, Outlet } from "@tanstack/react-router";

import { useUserStore } from "@/entities/user/user.store";
import { Spinner } from "@/shared/components/Spinner/Spinner";

export const ProtectedRoute = () => {
  const { isAuth, isInitialized } = useUserStore();

  if (!isInitialized) return <Spinner />;
  if (!isAuth()) return <Navigate to="/auth/signin" replace />;
  return <Outlet />;
};
