import { useMutation } from "@tanstack/react-query";
import { login, register } from "../service";
import { useAuthStore } from "../store";

export function useLogin() {
	const loginStore = useAuthStore((s) => s.login);

	return useMutation({
		mutationFn: login,
		onSuccess: () => loginStore(),
	});
}

export function useRegister() {
	const loginStore = useAuthStore((s) => s.login);

	return useMutation({
		mutationFn: register,
		onSuccess: () => loginStore(),
	});
}
