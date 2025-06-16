import { useMutation } from "@tanstack/react-query";
import { login, register, getMe, logout as logoutApi } from "../service";
import { useAuthStore } from "../store";

export function useLogin() {
	const loginStore = useAuthStore((s) => s.login);

	return useMutation({
		mutationFn: login,
		onSuccess: async () => {
			try {
				await getMe();
				loginStore();
			} catch {
				// handle error (cookies not set, etc)
			}
		},
	});
}

export function useRegister() {
	const loginStore = useAuthStore((s) => s.login);

	return useMutation({
		mutationFn: register,
		onSuccess: async () => {
			try {
				const {data: getMeData} = await getMe();
        console.log(getMeData)
				loginStore();
			} catch {}
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
