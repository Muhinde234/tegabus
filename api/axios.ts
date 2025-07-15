import {ApiError} from '@/lib/types';
import axios, {AxiosError} from 'axios';
import {toast} from "sonner";


const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Authentication interceptor
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// API Error handling interceptor
API.interceptors.response.use(
    response => response,
    (error: AxiosError<ApiError>) => {
        const apiError = error.response?.data;

        if (apiError) {
            if (apiError.violations?.length) {
                apiError.violations.forEach(v =>
                    toast.error(`${v.field}: ${v.message}`)
                );
            } else {
                toast.error(apiError.title || 'Unexpected API error');
            }
        } else {
            toast.error('Network error. Please check your connection.');
        }

        return Promise.reject(error);
    }
);


export default API;

