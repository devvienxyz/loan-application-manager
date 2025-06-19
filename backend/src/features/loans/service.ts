import { LoanRepository } from "./repository.ts";

export const LoanService = {
  getAllLoans: async ({
    userId,
    isAdmin,
    page,
    pageSize,
    search,
  }: {
    userId: string;
    isAdmin: boolean;
    page: number;
    pageSize: number;
    search: string;
  }) => {
    return LoanRepository.getAll({ userId, isAdmin, page, pageSize, search });
  },

  getLoanById: async (loanId: string) =>
    LoanRepository.getById(loanId),

  applyForLoan: async (userId: string, payload: { purpose: string; amount: number }) =>
    LoanRepository.create({ ...payload, userId }),

  updateLoan: async (loanId: string, updates: Partial<{ purpose: string; amount: number; status: string }>) =>
    LoanRepository.update(loanId, updates),

  deleteLoan: async (loanId: string) =>
    LoanRepository.delete(loanId),
};
