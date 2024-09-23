import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../entities/user/user.store";

export const ProtectedRoute = () => {
  const { isAuth } = useUserStore();

  if (!isAuth()) return <Navigate to="/signin" replace />;
  return <Outlet />;
};
