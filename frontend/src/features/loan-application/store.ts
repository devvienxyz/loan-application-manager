import { create } from "zustand";

type LoanAppState = {
	selectedStatus: string | null;
	setSelectedStatus: (status: string | null) => void;
};

export const useLoanAppStore = create<LoanAppState>((set) => ({
	selectedStatus: null,
	setSelectedStatus: (status) => set({ selectedStatus: status }),
}));
