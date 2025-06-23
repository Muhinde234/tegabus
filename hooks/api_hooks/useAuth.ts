import { useMutation } from "@tanstack/react-query";
import {login as ApiLogin, register} from "../../api/auth/authAPI";
import {logout as ApiLogout} from "../../api/auth/authAPI";
import {register as ApiRegister} from "../../api/auth/authAPI";
import {useUser} from "../../context/userContext"

export const useLogin = () => {
    const {login} = useUser();
    return useMutation({
        mutationFn: async (credentials) => {
            const data = await ApiLogin(credentials);
            const {token, user} = data;
            login(token, user);
            return data;
        }
    })
}


export const useLogout = () => {
    const {logout} = useUser();
    return useMutation({
        mutationFn: async () => {
            await ApiLogout();
            logout();
        }
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: register,
    });
};