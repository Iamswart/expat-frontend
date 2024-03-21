import { create } from "zustand";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  dateOfBirth: Date;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isPartiallyAuthenticated: boolean;  
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setIsPartiallyAuthenticated: (status: boolean) => void;  
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"), 
  accessToken: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isPartiallyAuthenticated: false, 

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); 
    set({ user });
  },

  setAccessToken: (token) => {
    localStorage.setItem("token", token); 
    set({ accessToken: token });
  },

  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token); 
    set({ refreshToken: token });
  },

  setIsPartiallyAuthenticated: (status) => {
    set({ isPartiallyAuthenticated: status });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    set({ user: null, accessToken: null, isPartiallyAuthenticated: false });
  },
}));
