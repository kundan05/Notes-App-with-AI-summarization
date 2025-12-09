import axios from 'axios';

const api = axios.create({
    baseURL: (() => {
        const url = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        return formattedUrl.endsWith('/api') ? formattedUrl : `${formattedUrl}/api`;
    })(),
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
