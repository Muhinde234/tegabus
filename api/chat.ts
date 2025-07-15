import API from "@/api/axios";
import {ChatRequest, ChatResponse} from "@/lib/types";

export const chatService = {
    sendMessage: async (payload: ChatRequest): Promise<ChatResponse> => {
        const response = await API.post<ChatResponse>("/ai/chat", payload);
        return response.data;
    },
};