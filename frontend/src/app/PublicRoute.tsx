import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../entities/user/user.store";

export const PublicRoute = () => {
  const { isAuth } = useUserStore();

  if (isAuth()) return <Navigate to="/chat" replace />;
  return <Outlet />;
};
