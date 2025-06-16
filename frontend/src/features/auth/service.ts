import api from "@/lib/axios";
import { RegisterFormData } from "./types";

export const login = (data: { email: string; password: string }) =>
	api.post("/auth/login", data).then((res) => res.data);

export const register = (data: RegisterFormData) => api.post("/auth/signup", data).then((res) => res.data);
