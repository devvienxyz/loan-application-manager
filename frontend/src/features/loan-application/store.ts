import { LoanApplication } from "@loan-app-mgr/shared/types/loans";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoanAppState = {
  selectedStatus: string | null;
  page: number;
  pageSize: number;
  search: string;
  loanList: LoanApplication[];
  total: number;
  setSelectedStatus: (status: string | null) => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setLoanData: (data: { loans: LoanApplication[]; }) => void;
};

type LoanAppStateWithoutSetters = Omit<LoanAppState, "setSelectedStatus" | "setPage" | "setSearch | setLoanData">;

const initialState: LoanAppStateWithoutSetters = {
  selectedStatus: null,
  page: 1,
  pageSize: 5,
  search: "",
  loanList: [],
  total: 0,
};

const useLoanAppStore = create<LoanAppState>()(
  persist(
    (set) => ({
      ...initialState,
      setLoanData: (data: { loans: any; total: any; }) => set({ loanList: data?.loans ?? [], total: data?.total ?? 0 }),
      setSelectedStatus: (status: string | null) => set({ selectedStatus: status }),
      setPage: (page: number) => set({ page }),
      setSearch: (search: string) => set({ page: 1, search }), // reset to page 1 when searching
    }),
    { name: "loan-app-store" },
  )
);

export default useLoanAppStore;
