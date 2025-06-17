import api from "@/lib/axios";
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

export const createLoan = async (data: { amount: number }) => {
  const res = await api.post("/loans/apply", data);
  return res.data;
};
