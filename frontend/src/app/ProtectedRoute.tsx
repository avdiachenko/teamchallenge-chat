import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../entities/user/user.store";

export const ProtectedRoute = () => {
  const { token } = useUserStore();

  if (!token) return <Navigate to="/signin" replace />;
  return <Outlet />;
};
