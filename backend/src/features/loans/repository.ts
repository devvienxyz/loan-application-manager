import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { LoanPurposes, LoanStatuses, UpdateLoanPayload } from "@loan-app-mgr/shared/types/loans";

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
    const normalizedSearch = search?.trim().toLowerCase();

    // Match enums manually with partial search
    const statusMatch = Object.values(LoanStatuses).find(
      (s) => s.toLowerCase().includes(normalizedSearch)
    );

    const purposeMatch = Object.values(LoanPurposes).find(
      (p) => p.toLowerCase().includes(normalizedSearch)
    );

    const where: Prisma.LoanApplicationWhereInput = {
      ...(isAdmin ? {} : { userId }),
      ...(normalizedSearch
        ? {
          OR: [
            { purpose: purposeMatch, },
            { status: statusMatch, },
            {
              id: {
                contains: normalizedSearch,
                mode: "insensitive",
              },
            },
          ].filter(Boolean), // Remove falsy conditions
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
        status: LoanStatuses.DRAFT,
      },
    }),

  update: async (id: string, data: UpdateLoanPayload) =>
    prisma.loanApplication.update({
      where: { id },
      data,
    }),

  delete: async (id: string) =>
    prisma.loanApplication.delete({ where: { id } }),
};
