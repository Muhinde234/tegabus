import type { Schedule, CreateSchedule } from "@/lib/types";
import API from "@/api/axios";

export const scheduleService = {
  getAll: async () => {
    const response = await API.get<Schedule[]>("/schedules");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await API.get<Schedule>(`/schedules/${id}`);
    return response.data;
  },

  create: async (data: CreateSchedule) => {
    const response = await API.post<Schedule>("/schedules", data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateSchedule>) => {
    const response = await API.patch<Schedule>(`/schedules/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await API.delete(`/schedules/${id}`);
  }
};
