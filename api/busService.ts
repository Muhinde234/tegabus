import type { Bus, CreateBus } from "@/lib/types";
import API from "@/api/axios";

export const busService = {
  getAll: async () => {
    const response = await API.get<Bus[]>("/buses");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await API.get<Bus>(`/buses/${id}`);
    return response.data;
  },

  create: async (data: CreateBus) => {
    const response = await API.post<Bus>("/buses", data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateBus>) => {
    const response = await API.patch<Bus>(`/buses/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await API.delete(`/buses/${id}`);
  }
};
