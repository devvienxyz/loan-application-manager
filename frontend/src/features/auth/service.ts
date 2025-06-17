import api from "@/lib/axios";
import { RegisterFormData, LoginFormData } from "@loan-app-mgr/shared/types/auth";

// export const getMe = async () => {
//   const res = await api.get("/auth/me");
//   return res.data.user;
// };

export const login = (data: LoginFormData) =>
  api.post("/auth/login", data).then((res) => res.data);

export const register = (data: RegisterFormData) => api.post("/auth/signup", data).then((res) => res.data);

export const logout = () => api.post("/auth/logout");
