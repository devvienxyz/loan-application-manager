import { create } from "zustand";
import { getMe } from "./service";
import { persist } from "zustand/middleware";

type AuthState = {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
	checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			login: () => set({ isAuthenticated: true }),
			logout: () => set({ isAuthenticated: false }),
			checkAuth: async () => {
				try {
					await getMe();
					set({ isAuthenticated: true });
				} catch {
					set({ isAuthenticated: false });
				}
			},
		}),
		{ name: "auth-store" }
	)
);

export const logoutAndRedirect = () => {
	useAuthStore.getState().logout();
	// window.location.href = "/";
};
