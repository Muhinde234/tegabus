import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {RouteRequest, RouteResponse} from "@/lib/types";
import {routeService} from "@/api/route";

export const useRoutes = () => {
    return useQuery<RouteResponse[]>({
        queryFn: routeService.getAll,
        queryKey: ["routes"],
        initialData: []
    })
}


export const useStartLocation = () => {
    return useQuery<string[]>({
        queryFn: routeService.startLocations,
        queryKey: ["routes-start-locations"]
    })
}


export const useEndLocation = (startLocation: string) => {
    return useQuery<string[]>({
        queryFn: () => routeService.endLocations(startLocation),
        queryKey: ["route-end-location", startLocation],
        enabled: !!startLocation
    })
}


export const useCreateRoute = () => {
    const queryClient = useQueryClient();

    return useMutation<RouteResponse, Error, RouteRequest>({
        mutationFn: routeService.create,
        onSuccess: async () => {
            await  queryClient.invalidateQueries({queryKey: ["routes"]});
        }
    })

}


export const useDeleteRoute = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: routeService.delete,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["routes"]});
        }
    })

}
