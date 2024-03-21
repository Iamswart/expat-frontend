import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const authApiClient = new APIClient("/auth/refresh-token");

export interface RefreshTokenInput {
  password: string;
};

interface RefreshTokenResponse  {
  user: {
    id: string;
    userName: string;
    email: string;
    phone: string;
    isAdmin: boolean;
  };
  accessToken: string;
  refreshToken: string;
};

export const useRefreshToken = () => {
    return useMutation<RefreshTokenResponse, Error, RefreshTokenInput>(
      ['refreshToken'], 
      (input: RefreshTokenInput) => authApiClient.post<RefreshTokenInput, RefreshTokenResponse>(input)
    );
  };
  
  
  
  
  
