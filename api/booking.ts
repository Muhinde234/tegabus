import API from "@/api/axios";
import {BookingResponse} from "@/lib/types";

export const bookingService = {
    getAll: async () => {
        const response = await API.get<BookingResponse[]>("/bookings");
        return response.data;
    }
}