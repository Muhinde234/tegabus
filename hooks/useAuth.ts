import { authService } from "@/api/authService"
import { MessageResponse, RegisterRequest } from "@/lib/types"
import { useMutation } from "@tanstack/react-query"

export const useSignUp = () => {
    return useMutation<MessageResponse, Error, RegisterRequest>({
        mutationFn: authService.signup,
    });
}