import axios from 'axios';

// Use environment variables for API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

console.log('API Base URL:', API_BASE_URL); // Debug log

// Use the environment variable for the API base URL
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});