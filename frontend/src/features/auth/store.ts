import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GetMeData } from "@loan-app-mgr/shared/types/auth";

type AuthState = {
  user: GetMeData | null;
	isAuthenticated: boolean;
  login: (user: GetMeData) => void;
  logout: () => void;
  setUser: (user: GetMeData) => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
      user: null,
			isAuthenticated: false,
      login: (user) => {
        console.log("Zustand store: login action called with user:", user); // Debugging line
        set({ isAuthenticated: true, user });
      },
      // login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      setUser: (user) => set({ user }),
		}),
		{ name: "auth-store" }
	)
);

export const logoutAndRedirect = () => {
	useAuthStore.getState().logout();
	// window.location.href = "/";
};
