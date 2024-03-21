// hooks/useToken.ts
import jwtDecode from 'jwt-decode';
import { useAuthStore } from "../store";

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const useToken = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  
  if (!accessToken) {
    return { isAuthenticated: false, isTokenExpired: true };
  }

  const decodedToken: DecodedToken = jwtDecode(accessToken);

  const isTokenExpired = decodedToken.exp * 1000 < Date.now();

  return { isAuthenticated: !!accessToken, isTokenExpired };
};

export default useToken;
