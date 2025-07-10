import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Booking, CreateBooking } from "@/lib/types";
import { bookingService } from "@/api/bookingService";

export const useBookings = () => {
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: bookingService.getAll,
  });
};

export const useBooking = (id: string) => {
  return useQuery<Booking>({
    queryKey: ["booking", id],
    queryFn: () => bookingService.getById(id),
    enabled: !!id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<Booking, Error, CreateBooking>({
    mutationFn: bookingService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};

export const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<Booking, Error, { id: string; data: Partial<CreateBooking> }>({
    mutationFn: ({ id, data }) => bookingService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", variables.id] });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: bookingService.delete,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.removeQueries({ queryKey: ["booking", id] });
    },
  });
};
