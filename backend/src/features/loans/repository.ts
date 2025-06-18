import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { LoanApplicationStatus } from "@loan-app-mgr/shared/types/loans";

export const LoanRepository = {
  getAll: async ({
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
    const where: Prisma.LoanApplicationWhereInput = {
      ...(isAdmin ? {} : { userId }),
      ...(search
        ? {
          OR: [
            {
              purpose: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
            {
              status: {
                contains: search,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          ],
        }
        : {}),
    };

    const [loans, total] = await Promise.all([
      prisma.loanApplication.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.loanApplication.count({ where }),
    ]);

    return { loans, total };
  },

  getById: async (id: string) =>
    prisma.loanApplication.findUnique({ where: { id } }),

  create: async (data: {
    purpose: string;
    amount: number;
    userId: string;
  }) =>
    prisma.loanApplication.create({
      data: {
        ...data,
        status: LoanApplicationStatus.Draft,
      },
    }),

  update: async (id: string, data: Partial<{ purpose: string; amount: number; status: string }>) =>
    prisma.loanApplication.update({
      where: { id },
      data,
    }),

  delete: async (id: string) =>
    prisma.loanApplication.delete({ where: { id } }),
};
