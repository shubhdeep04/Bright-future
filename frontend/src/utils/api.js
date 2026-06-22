import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bf_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.status,
      error.response?.data || error.message
    );
    if (error.response?.status === 401) {
      localStorage.removeItem("bf_token");
    }
    return Promise.reject(error);
  }
);

// Health Check — returns data object { status, dbStatus }
export const healthCheck = async () => {
  const { data } = await api.get("/health");
  return data;
};

// isHealthy — returns true/false, never throws
export const isHealthy = async () => {
  try {
    const data = await healthCheck();
    return data?.status === "OK" && data?.dbStatus === "connected";
  } catch {
    return false;
  }
};

// Attach to api instance so api.isHealthy() also works
api.isHealthy = isHealthy;
api.healthCheck = healthCheck;

export default api;