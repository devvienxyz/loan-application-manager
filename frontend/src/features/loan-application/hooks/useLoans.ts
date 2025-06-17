import { useQuery } from "@tanstack/react-query";
import { fetchLoans } from "../service";
import useLoanAppStore from "../store";
import { LoanApplication } from "@loan-app-mgr/shared/types/loans";

interface LoansData {
  loans: LoanApplication[];
  total: number;
}

export const useLoans = (): { data: LoansData | null; isLoading: boolean; } => {
  const { page, pageSize, search } = useLoanAppStore();

  return useQuery({
    queryKey: ["loans", { page, pageSize, search }],
    queryFn: fetchLoans,
    staleTime: 1000 * 60 * 5, // 5 mins cache
    keepPreviousData: true, // smooth UX during pagination
    // retry: 1,
  });
}
