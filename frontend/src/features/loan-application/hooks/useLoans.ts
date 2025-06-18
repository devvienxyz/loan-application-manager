import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLoan, deleteLoan, fetchLoans } from "../service";
import useLoanAppStore from "../store";
import { LoanApplication } from "@loan-app-mgr/shared/types/loans";

interface LoansData {
  loans: LoanApplication[];
  total: number;
}

export const useLoans = () => {
  const { page, pageSize, search } = useLoanAppStore();

  return useQuery<LoansData>({
    queryKey: ["loans", { page, pageSize, search }],
    queryFn: fetchLoans,
    staleTime: 1000 * 60 * 5, // 5 mins cache
    keepPreviousData: true, // smooth UX during pagination
    // retry: 1,
  });
}

export const useCreateLoan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLoan,
    onSuccess: () => {
      // refresh loan list
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
  });
};

export const useDeleteLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLoan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
    },
  });
};
