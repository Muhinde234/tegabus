import API from "@/api/axios";
import {ScheduleParams, ScheduleRequest, ScheduleResponse, SeatLayoutResponse} from "@/lib/types";

export const scheduleService = {
    getAll: async (params?: ScheduleParams) => {
        const query = new URLSearchParams();

        if (params?.from) query.append("from", params.from);
        if (params?.to) query.append("to", params.to);
        if (params?.departureDate) query.append("departureDate", params.departureDate);

        const response = await API.get<ScheduleResponse[]>(`/schedules?${query.toString()}`);
        return response.data;
    },

    create: async (data: ScheduleRequest) => {
        const response = await API.post<ScheduleResponse>("/schedules", data);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await API.delete(`/schedules/${id}`);
        return response.data;
    },

    scheduleSeats: async (id: number) => {
        const response = await API.get<SeatLayoutResponse>(`/schedules/${id}/seats`);
        return response.data;
    }

}