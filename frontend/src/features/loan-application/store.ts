import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoanAppUIState = {
  selectedStatus: string | null;
  page: number;
  pageSize: number;
  search: string;
  setSelectedStatus: (status: string | null) => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
};

const useLoanAppStore = create<LoanAppUIState>()(
  persist(
    (set) => ({
      selectedStatus: null,
      page: 1,
      pageSize: 5,
      search: "",
      setSelectedStatus: (status) => set({ selectedStatus: status }),
      setPage: (page) => set({ page }),
      setSearch: (search) => set({ page: 1, search }), // reset page on new search
    }),
    { name: "loan-ui-store" }
  )
);

export default useLoanAppStore;
