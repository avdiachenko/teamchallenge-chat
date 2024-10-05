import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../entities/user/user.store";
import { Spinner } from "../shared/components/Spinner/Spinner";

export const ProtectedRoute = () => {
  const { isAuth, isInitialized } = useUserStore();

  if (!isInitialized) return <Spinner />;
  if (!isAuth()) return <Navigate to="/signin" replace />;
  return <Outlet />;
};
