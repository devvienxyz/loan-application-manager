import prisma from "@/lib/prisma.ts";
import { Prisma } from "@prisma/client";
import { LoanPurposes, LoanPurpose, LoanStatuses, UpdateLoanPayload, LoanStatus } from "@loan-app-mgr/shared/types/loans";

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
                mode: Prisma.QueryMode.insensitive,
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
        purpose: data.purpose as LoanPurpose, // Ensure purpose is of type LoanPurposes
        status: LoanStatuses.DRAFT,
      },
    }),

  update: async (id: string, data: UpdateLoanPayload) =>
    prisma.loanApplication.update({
      where: { id },
      data: {
        ...data,
        purpose: data.purpose as LoanPurpose, // Ensure purpose is of type LoanPurpose
        status: data.status as LoanStatus, // Ensure status is of type LoanStatuses
      },
    }),

  delete: async (id: string) =>
    prisma.loanApplication.delete({ where: { id } }),
};
