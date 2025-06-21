import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createUser, deleteUser, getRoleStarts, getUser, getUsers, updateUser} from "../../api/user/user_api.js";

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
};

export const useRoleStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: getRoleStarts
    })
}


export const useUser = (id) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => getUser(id),
        enabled: !!id,
    });
};


export const useCreateUser = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["users"]});
            await queryClient.invalidateQueries({queryKey: ["stats"]});
        },
    });
};


export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateUser(id, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["users"]});
            await queryClient.invalidateQueries({queryKey: ["stats"]});

        },
    });
};


export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["users"]});
            await queryClient.invalidateQueries({queryKey: ["stats"]});
        },
    });
};