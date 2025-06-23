import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {buyTicket, getTickets, myTickets} from "../../api/tickets.js";

export const useTickets = () => {
    return useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
    });
}


export const useBuyTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
            mutationFn: ({seat_id, schedule_id}) => buyTicket(seat_id, schedule_id),
            onSuccess: async (_data, variables) => {
                await queryClient.invalidateQueries({queryKey: ['tickets']});
                await queryClient.invalidateQueries({queryKey: ['schedule', variables.schedule_id]});
            },
        }
    );
}

export const useMyTickets = () => {
    return useQuery({
        queryKey: ['my-tickets'],
        queryFn: myTickets
    })
}