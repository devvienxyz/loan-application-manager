import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/features/auth/store";

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const authRoutes = ["/auth/login", "/auth/signup", "/auth/refresh"];
const isAuthRoute = (url?: string) => !!url && authRoutes.some((route) => url.includes(route));

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;
    const is401 = error.response?.status === 401;
    const isRetryable = is401 && !originalRequest._retry && !isAuthRoute(originalRequest.url);

    if (isRetryable) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post("/api/auth/refresh", null, {
          withCredentials: true,
        });

        if (refreshRes.status === 200) {
          return api(originalRequest);
        }

        // fallback if not 200
        throw new Error("Refresh failed");
      } catch (refreshErr) {
        // If refresh fails again with 401, logout
        if ((refreshErr as AxiosError).response?.status === 401) {
          Promise.resolve().then(() => {
            useAuthStore.getState().logout();
            window.location.href = "/";
          });
        }

        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
