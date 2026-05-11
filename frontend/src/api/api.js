import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor to add token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('[API Interceptor] Request to:', config.url, '| Token present:', token ? 'YES' : 'NO');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('[API Interceptor] Authorization header set');
  } else {
    console.log('[API Interceptor] WARNING: No token found in localStorage');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor to handle 401
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Optionally redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

