import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {Bus, CreateBus} from "@/lib/types";
import {busService} from "@/api/bus";

export const useBuses = () => {
  return useQuery<Bus[]>({
    queryKey: ["buses"],
    queryFn: busService.getAll,
    initialData: []
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["buses"] });
    },
  });
};

export const useUpdateBus = () => {
  const queryClient = useQueryClient();
  return useMutation<Bus, Error, { id: string; data: Partial<CreateBus> }>({
    mutationFn: ({ id, data }) => busService.update(id, data),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["buses"] });
      await queryClient.invalidateQueries({ queryKey: ["bus", variables.id] });
    },
  });
};

export const useDeleteBus = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: busService.delete,
    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({ queryKey: ["buses"] });
      queryClient.removeQueries({queryKey: ["bus", id]});
    },
  });
};
