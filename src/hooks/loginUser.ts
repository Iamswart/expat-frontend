import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const authApiClient = new APIClient("/auth/login");

export interface LoginInput {
  email?: string;
  phone?: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    dateOfBirth: Date;
    lastLoginAt: Date;
  };
  accessToken: string;
  refreshToken: string;
}

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginInput>(
    ["loginUser"],
    (input: LoginInput) => authApiClient.post<LoginInput, LoginResponse>(input)
  );
};
