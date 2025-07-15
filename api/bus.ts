import type { Bus, CreateBus } from "@/lib/types";
import API from "@/api/axios";

export const busService = {

  getAll: async () => {
    const response = await API.get<Bus[]>("/bus");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await API.get<Bus>(`/bus/${id}`);
    return response.data;
  },

  create: async (data: CreateBus) => {
    const response = await API.post<Bus>("/bus", data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateBus>) => {
    const response = await API.patch<Bus>(`/bus/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await API.delete(`/bus/${id}`);
  }

};
