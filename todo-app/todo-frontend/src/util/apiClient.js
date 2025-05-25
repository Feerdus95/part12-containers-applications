import axios from 'axios'

// Use the VITE_BACKEND_URL from environment variables, default to '/api' if not set
const baseURL = import.meta.env.VITE_BACKEND_URL || '/api';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// Add a request interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient