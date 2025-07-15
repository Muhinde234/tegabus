import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {scheduleService} from "@/api/schedule";
import {ScheduleParams, ScheduleRequest, ScheduleResponse, SeatLayoutResponse} from "@/lib/types";

export const useSchedules = (params?: ScheduleParams) => {
    return useQuery<ScheduleResponse[]>({
        queryKey: ["schedules", params],
        queryFn: () => scheduleService.getAll(params),
        initialData: []
    });
};

export const useCreateSchedule = () => {
    const queryClient = useQueryClient();

    return useMutation<ScheduleResponse, Error, ScheduleRequest>({
        mutationFn: scheduleService.create,
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["schedules"]})
        }
    })
}

export const useScheduleSeats = (id: number) => {
    return useQuery<SeatLayoutResponse>({
        queryKey: ['schedules', id],
        queryFn: () => scheduleService.scheduleSeats(id),
        enabled: !!id
    })
}