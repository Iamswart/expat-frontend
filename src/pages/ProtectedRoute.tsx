import { Navigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import { useAuthStore } from "../store";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isTokenExpired } = useToken();
  const logout = useAuthStore((state) => state.logout);

  if (!isAuthenticated || isTokenExpired) {
    logout();
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
