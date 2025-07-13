import { ApiError } from '@/lib/types';
import axios, { AxiosError } from 'axios';

const url = process.env.NEXT_PUBLIC_BASE_URL;

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

API.interceptors.response.use(
  response => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.data) {
      const apiError = error.response.data;

    } else {
    //   console.error('API Error:', error.message);

    }

    return Promise.reject(error);
  }
);

export default API;

