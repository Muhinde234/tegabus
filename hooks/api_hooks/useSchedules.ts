import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import {
    createSchedule,
    deleteSchedule,
    getSchedule,
    getSchedules,
    updateSchedule
} from "../../api/schedules/schedules_api"

export const useGetSchedules = () => {
    return useQuery({
        queryKey: ['schedules'],
        queryFn: getSchedules,
        // staleTime: 1000 * 60 * 5,
    });
};

export const useGetSchedule = (id) => {
    return useQuery({
        queryKey: ['schedule', id],
        queryFn: () => getSchedule(id),
        enabled: !!id,
    });
};

export const useCreateSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createSchedule,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['schedules']});
        },
    });
};

export const useUpdateSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}) => updateSchedule(id, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['schedules']});
        },
    });
};

export const useDeleteSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSchedule,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['schedules']});
        },
    });
};