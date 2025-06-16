import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
	baseURL: "/api",
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue: {
	resolve: (value: AxiosResponse) => void;
	reject: (error: AxiosError) => void;
	config: InternalAxiosRequestConfig;
}[] = [];

const processQueue = (error: AxiosError | null, response?: AxiosResponse) => {
	for (const { resolve, reject } of failedQueue) {
		if (error) {
			reject(error);
		} else if (response) {
			resolve(response);
		}
	}
	failedQueue = [];
};

api.interceptors.response.use(
	(res) => res,
	(error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			if (isRefreshing) {
				return new Promise<AxiosResponse>((resolve, reject) => {
					failedQueue.push({ resolve, reject, config: originalRequest });
				});
			}

			isRefreshing = true;

			return new Promise<AxiosResponse>((resolve, reject) => {
				api
					.post("/auth/refresh")
					.then((refreshRes) => {
						processQueue(null, refreshRes);
						return api(originalRequest);
					})
					.then((retryResponse) => {
						resolve(retryResponse);
					})
					.catch((refreshError) => {
						processQueue(refreshError as AxiosError);
						window.location.href = "/auth";
						reject(refreshError);
					})
					.finally(() => {
						isRefreshing = false;
					});
			});
		}

		return Promise.reject(error);
	},
);

export default api;
