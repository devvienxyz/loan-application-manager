import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLoan, deleteLoan, fetchLoans, getLoanById, updateLoan } from "../service";
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

export const useGetLoanById = (loanId: string) =>
  useQuery<LoanApplication>({
    queryKey: ["loan", loanId],
    queryFn: () => getLoanById(loanId),
    enabled: !!loanId,
  });

export const useUpdateLoan = (loanId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<LoanApplication>) => updateLoan(loanId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      queryClient.invalidateQueries({ queryKey: ["loan", loanId] });
    },
  });
};

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
