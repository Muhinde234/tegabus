import axios from 'axios';

const API = axios.create({
    baseURL: '/api',
});

API.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default API;

