import {authService} from "@/api/authService"
import {LoginRequest, LoginResponse, MessageResponse, RegisterRequest, VerifyEmailRequest} from "@/lib/types"
import {useMutation} from "@tanstack/react-query"
import {useUser} from "@/context/userContext";

export const useSignUp = () => {
    return useMutation<MessageResponse, Error, RegisterRequest>({
        mutationFn: authService.signup,
    });
}


export const useVerifyEmail = () => {
    return useMutation<MessageResponse, Error, VerifyEmailRequest>({
        mutationFn: authService.verifyEmail
    })
}


export const useLogin = () => {
    const {login} = useUser();
    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: async (credentials) => {
            const data = await authService.login(credentials);
            const {user, accessToken} = data
            login(user, accessToken);
            return data;
        },
    })
}