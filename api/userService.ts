import type { User, CreateUser } from "@/lib/types";
import API from "@/api/axios";

export const userService = {
  getAll: async () => {
    const response = await API.get<User[]>("/users");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await API.get<User>(`/users/${id}`);
    return response.data;
  },

  create: async (data: CreateUser) => {
    const response = await API.post<User>("/users", data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateUser>) => {
    const response = await API.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await API.delete(`/users/${id}`);
  }
};
