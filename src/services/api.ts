import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.example.com';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rivvo:token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global response error handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // simple cross-app logout: clear token and redirect to login
      localStorage.removeItem('rivvo:token');
      localStorage.removeItem('rivvo:user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
