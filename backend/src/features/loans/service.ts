import { LoanRepository } from "./repository";

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

  applyForLoan: async (userId: string, payload: { name: string; amount: number }) =>
    LoanRepository.create({ ...payload, userId }),

  updateLoan: async (loanId: string, updates: Partial<{ name: string; amount: number; status: string }>) =>
    LoanRepository.update(loanId, updates),

  deleteLoan: async (loanId: string) =>
    LoanRepository.delete(loanId),
};
