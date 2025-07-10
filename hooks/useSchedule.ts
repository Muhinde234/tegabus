import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Schedule, CreateSchedule } from "@/lib/types";
import { scheduleService } from "@/api/scheduleService";

export const useSchedules = () => {
  return useQuery<Schedule[]>({
    queryKey: ["schedules"],
    queryFn: scheduleService.getAll,
  });
};

export const useSchedule = (id: string) => {
  return useQuery<Schedule>({
    queryKey: ["schedule", id],
    queryFn: () => scheduleService.getById(id),
    enabled: !!id,
  });
};

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation<Schedule, Error, CreateSchedule>({
    mutationFn: scheduleService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation<Schedule, Error, { id: string; data: Partial<CreateSchedule> }>({
    mutationFn: ({ id, data }) => scheduleService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["schedule", variables.id] });
    },
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: scheduleService.delete,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.removeQueries({ queryKey: ["schedule", id] });
    },
  });
};
