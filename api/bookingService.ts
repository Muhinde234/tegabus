
import type { Booking, CreateBooking } from "@/lib/types";
import API from "@/api/axios";

export const bookingService = {
  getAll: async () => {
    const response = await API.get<Booking[]>("/bookings");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await API.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  create: async (data: CreateBooking) => {
    const response = await API.post<Booking>("/bookings", data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateBooking>) => {
    const response = await API.patch<Booking>(`/bookings/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await API.delete(`/bookings/${id}`);
  }
};
