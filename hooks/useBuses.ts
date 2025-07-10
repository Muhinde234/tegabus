import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Bus, CreateBus } from "@/lib/types";
import { busService } from "@/api/busService";

export const useBuses = () => {
  return useQuery<Bus[]>({
    queryKey: ["buses"],
    queryFn: busService.getAll,
  });
};

export const useBus = (id: string) => {
  return useQuery<Bus>({
    queryKey: ["bus", id],
    queryFn: () => busService.getById(id),
    enabled: !!id,
  });
};

export const useCreateBus = () => {
  const queryClient = useQueryClient();
  return useMutation<Bus, Error, CreateBus>({
    mutationFn: busService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
    },
  });
};

export const useUpdateBus = () => {
  const queryClient = useQueryClient();
  return useMutation<Bus, Error, { id: string; data: Partial<CreateBus> }>({
    mutationFn: ({ id, data }) => busService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      queryClient.invalidateQueries({ queryKey: ["bus", variables.id] });
    },
  });
};

export const useDeleteBus = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: busService.delete,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      queryClient.removeQueries({ queryKey: ["bus", id] });
    },
  });
};
