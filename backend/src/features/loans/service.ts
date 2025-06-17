import { LoanRepository } from "./repository";

export const LoanService = {
  getAllLoans: async (userId: string, isAdmin: boolean) =>
    LoanRepository.getAll(userId, isAdmin),

  getLoanById: async (loanId: string) =>
    LoanRepository.getById(loanId),

  applyForLoan: async (userId: string, payload: { name: string; amount: number }) =>
    LoanRepository.create({ ...payload, userId }),

  updateLoan: async (loanId: string, updates: Partial<{ name: string; amount: number; status: string }>) =>
    LoanRepository.update(loanId, updates),

  deleteLoan: async (loanId: string) =>
    LoanRepository.delete(loanId),
};
