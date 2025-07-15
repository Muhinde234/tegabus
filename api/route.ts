import API from "@/api/axios";
import {RouteRequest, RouteResponse} from "@/lib/types";

export const routeService = {
    getAll: async () => {
        const response = await API.get<RouteResponse[]>("/routes");
        return response.data;
    },

    create: async (data: RouteRequest) => {
        const response = await API.post<RouteResponse>("/routes", data);
        return response.data;
    },

    startLocations: async () => {
        const response = await API.get<string[]>("/routes/start-locations");
        return response.data;
    },

    endLocations: async (startLocation: string) => {
        const response = await API.get<string[]>(`/routes/${startLocation}/end-locations`);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await API.delete<void>(`/routes/${id}`);
        return response.data;
    },

    update: async (id: number, data: RouteRequest) => {
        const response = await API.put(`/routes/${id}`, data);
        return response.data;
    }

}