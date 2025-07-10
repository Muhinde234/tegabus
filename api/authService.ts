
import type { LoginRequest, LoginResponse } from "@/lib/types";
import API from "@/api/axios";

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await API.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    // Optionally clear user info
  }
};
