
import type {LoginRequest, LoginResponse, MessageResponse, RegisterRequest, VerifyEmailRequest} from "@/lib/types";
import API from "@/api/axios";

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await API.post<LoginResponse>("/auth/login", data);
    return response.data;
  },


  signup: async (data: RegisterRequest) => {
    const response = await API.post<MessageResponse>("/auth/sign-up", data);
    return response.data;
  },


  verifyEmail: async (data: VerifyEmailRequest) => {
    const response = await API.post<MessageResponse>("/auth/verify-email", data);
    return response.data;
  }

};
