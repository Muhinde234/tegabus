import API from "@/api/axios";
import {CreatedUserResponse, CreateUserRequest, RoleStatsResponse, UserPageResponse} from "@/lib/types";

export const userService =  {
    getAll: async () => {
        const response = await API.get<UserPageResponse>("/users");
        return response.data;
    },

    roleStats: async () => {
        const response = await API.get<RoleStatsResponse>("/users/stats/roles");
        return response.data;
    },

    create: async (data: CreateUserRequest) => {
        const response = await API.post<CreatedUserResponse>("/users", data);
        return response.data;
    }

}