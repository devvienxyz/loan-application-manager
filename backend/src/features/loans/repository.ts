import prisma from "@/lib/prisma";
import { LoanApplicationStatus } from "@loan-app-mgr/shared/types/loans";

export const LoanRepository = {
  getAll: async (userId: string, isAdmin: boolean) =>
    prisma.loanApplication.findMany({
      where: isAdmin ? {} : { userId },
      orderBy: { createdAt: "desc" },
    }),

  getById: async (id: string) =>
    prisma.loanApplication.findUnique({ where: { id } }),

  create: async (data: {
    name: string;
    amount: number;
    userId: string;
  }) =>
    prisma.loanApplication.create({
      data: {
        ...data,
        status: LoanApplicationStatus.Draft,
      },
    }),

  update: async (id: string, data: Partial<{ name: string; amount: number; status: string }>) =>
    prisma.loanApplication.update({
      where: { id },
      data,
    }),

  delete: async (id: string) =>
    prisma.loanApplication.delete({ where: { id } }),
};
