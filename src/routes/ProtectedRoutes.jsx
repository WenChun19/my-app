import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLogin = false;

  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
