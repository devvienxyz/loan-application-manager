import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/features/auth/store";

const api = axios.create({
	baseURL: "/api",
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
});

const authRoutes = ["/auth/login", "/auth/signup", "/auth/refresh"];
const isAuthRoute = (url: string) => authRoutes.some((route) => url.includes(route));

api.interceptors.response.use(
	(res) => res,
	async (err) => {
		const originalRequest = err.config;
		const is401 = err.response?.status === 401;
		const isRetryable = !originalRequest._retry && !isAuthRoute(originalRequest.url)

      if (is401 && isRetryable) {
			originalRequest._retry = true;

			try {
				await axios.post("/api/auth/refresh", null, { withCredentials: true });
				return api(originalRequest);
			} catch (refreshErr) {
				if ((refreshErr as AxiosError).response?.status === 401) {
					Promise.resolve().then(() => {
						useAuthStore.getState().logout(); // clean logout
						window.location.href = "/";
					});
				}
				return Promise.reject(refreshErr);
			}
		}

		return Promise.reject(err);
	}
);

export default api;
