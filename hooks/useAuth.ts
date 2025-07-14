import { useMutation } from "@tanstack/react-query";
import type { LoginRequest, LoginResponse } from "@/lib/types";
import { authService } from "@/api/authService";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token);
    
    }
  });
};