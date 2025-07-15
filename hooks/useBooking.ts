import {useQuery} from "@tanstack/react-query";
import {BookingResponse} from "@/lib/types";
import {bookingService} from "@/api/booking";

export const useBookings = () => {
    return useQuery<BookingResponse[]>({
        queryFn: bookingService.getAll,
        queryKey: ["bookings"],
        initialData: []
    })
}