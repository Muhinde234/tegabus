import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createBus, deleteBus, getBus, getBuses, getBuseStats, updateBus} from "../../api/buses/buses_api";

export const useBuses = () => {
    return useQuery({
        queryKey: ['buses'],
        queryFn: getBuses,
    });
}

export const useBuseStats = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: getBuseStats,
    });
}

export const useCreateBus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (bus) => createBus(bus),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['buses']});
            await queryClient.invalidateQueries({queryKey: ['stats']});
        },
    });

}

export const useGetBus = (id) => {
    return useQuery({
        queryKey: ['bus', id],
        queryFn: () => getBus(id),
        enabled: !!id, // This will prevent this hook from running if the id is not defined or null
    });
};

export const useUpdateBus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, bus}) => updateBus(id, bus),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['buses']});
            await queryClient.invalidateQueries({queryKey: ['stats']});
        },
    });
};

export const useDeleteBus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBus,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['buses']});
            await queryClient.invalidateQueries({queryKey: ['stats']});
        },
    });
};