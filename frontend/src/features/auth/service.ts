import api from "@/lib/axios";
import { RegisterFormData, LoginFormData } from "./types";

export const login = (data: LoginFormData) =>
	api.post("/auth/login", data).then((res) => res.data);

export const register = (data: RegisterFormData) => api.post("/auth/signup", data).then((res) => res.data);
