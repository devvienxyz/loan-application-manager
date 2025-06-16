import { useMutation } from "@tanstack/react-query";
import { login, register, logout as logoutApi } from "../service";
import { useAuthStore } from "../store";
import { GetMeData } from "@loan-app-mgr/shared/types/auth";

export function useLogin() {
	const loginStore = useAuthStore((s) => s.login);

	return useMutation({
		mutationFn: login,
    onSuccess: (response: { user: GetMeData }) => {
      console.log("Login successful, user data from response:", response.user);
      loginStore(response.user);
    },
    onError: (error) => {
      // TODO: Handle login error
      console.error("Error during login:", error);
    },
	});
}

export function useRegister() {
	const loginStore = useAuthStore((s) => s.login);

	return useMutation({
		mutationFn: register,
    onSuccess: (response: { user: GetMeData }) => {
      console.log("Registration successful, user data from response:", response.user);
      loginStore(response.user);
    },
    onError: (error) => {
      console.error("Error during registration:", error);
    },
	});
}


export function useLogout() {
	const logoutStore = useAuthStore((s) => s.logout);

	return useMutation({
		mutationFn: logoutApi,
		onSuccess: () => logoutStore(),
	});
}
