import api from "@/lib/axios";
import { CreateLoanPayload } from "@loan-app-mgr/shared/types/loans";
import { QueryFunctionContext } from "@tanstack/react-query";

export const fetchLoans = async ({ queryKey }: QueryFunctionContext) => {
  const [_key, { page, pageSize, search }] = queryKey as [string, { page: number; pageSize: number; search: string }];

  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    search,
  });

  const res = await api.get(`/loans?${params.toString()}`);
  return res.data; // should return { loans: LoanApplication[]; total: number }
};

export const createLoan = async (data: CreateLoanPayload) => {
  const res = await api.post("/loans/apply", data);
  return res.data;
};

export const updateLoan = async (loanId: string, data: Partial<CreateLoanPayload>) => {
  const res = await api.patch(`/loans/${loanId}`, data);
  return res.data;
};
