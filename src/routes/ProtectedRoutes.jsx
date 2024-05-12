import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const ProtectedRoutes = () => {
  const { isLogin } = useAuth();

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
