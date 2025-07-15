import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {CreatedUserResponse, CreateUserRequest, RoleStatsResponse, UserPageResponse} from "@/lib/types";
import {userService} from "@/api/user";

export const useUsers = () => {
    return useQuery<UserPageResponse>({
        queryKey: ["users"],
        queryFn: userService.getAll
    })
}


export const useRoleStats = () => {
    return useQuery<RoleStatsResponse>({
        queryKey: ["roleStats"],
        queryFn: userService.roleStats
    })
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<CreatedUserResponse, Error, CreateUserRequest>({
        mutationFn: userService.create,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["users"] });
            await queryClient.invalidateQueries({ queryKey: ["roleStats"] });
        }
    });
};