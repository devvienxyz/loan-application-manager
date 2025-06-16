import api from "@/lib/axios";

export const login = (data: { email: string; password: string }) =>
	api.post("/auth/login", data).then((res) => res.data);

export const register = (data: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}) => api.post("/auth/register", data).then((res) => res.data);
