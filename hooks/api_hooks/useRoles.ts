import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createRole, deleteRole, getRole, getRoles} from "../../api/roles/roles_api.js";

export const useRoles = () => {
    return useQuery({
        queryKey: ["roles"],
        queryFn: getRoles,
    });
};


export const useRole = (id) => {
    return useQuery({
        queryKey: ["role", id],
        queryFn: () => getRole(id),
        enabled: !!id,
    });
};


export const useCreateRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createRole,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["roles"]});
        },
    });
};


export const useDeleteRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteRole,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["roles"]});
        },
    });
};