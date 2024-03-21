import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const authApiClient = new APIClient("/auth/register");

export interface RegisterInput {
  userName: string;
  email: string;
  phone: string;
  password: string;
}

interface RegisterResponse {
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

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterInput>(
    ["registerUser"],
    (input: RegisterInput) =>
      authApiClient.post<RegisterInput, RegisterResponse>(input)
  );
};
