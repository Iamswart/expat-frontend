// hooks/useAuth.ts
import { useAuthStore } from "../store";

const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  return { isAuthenticated: !!user };
};

export default useAuth;
