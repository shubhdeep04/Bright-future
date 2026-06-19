import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bf_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.health = () => api.get("/health");

api.isHealthy = async () => {
  try {
    const { data } = await api.health();
    return data?.status === "OK" && data?.dbStatus === "connected";
  } catch (err) {
    return false;
  }
};

export default api;
