import {useMutation} from "@tanstack/react-query";
import {chatService} from "@/api/chat";

export const useTegaBusChat = () => {
    return useMutation({
        mutationFn: chatService.sendMessage,
    });
};