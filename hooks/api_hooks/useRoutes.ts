import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addRoute, deleteRoute, getAllRoutes, getOneRoute, updateRoute} from "../../api/routes/routes_api";


export const useGetRoutes = () => {
    return useQuery({
        queryKey: ['routes'],
        queryFn: getAllRoutes,
        // staleTime: 1000 * 60 * 5,
    });
};

export const useGetRoute = (id) => {
    return useQuery({
        queryKey: ['route', id],
        queryFn: () => getOneRoute(id),
        enabled: !!id,
    });
};

export const useAddRoute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => addRoute(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['routes'] });
        },
    });
};

export const useUpdateRoute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, routeData }) => updateRoute(id, routeData),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['routes'] });
        },
    });
};

export const useDeleteRoute = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRoute,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['routes'] });
        },
    });
};