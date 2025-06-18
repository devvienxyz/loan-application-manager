export const LoanStatuses = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  DISBURSED: "DISBURSED",
  CANCELLED: "CANCELLED",
} as const;
export type LoanStatus = (typeof LoanStatuses)[keyof typeof LoanStatuses];
export type LoanStatusKey = keyof typeof LoanStatuses;

export type LoanApplication = {
  id: string;
  purpose: string;
  status: LoanStatus;
  amount: number;
  createdAt: string;
};

export const LoanPurposes = {
  HOME_IMPROVEMENT: "HOME_IMPROVEMENT",
  PERSONAL: "PERSONAL",
  OTHERS: "OTHERS",
} as const;
export type LoanPurpose = (typeof LoanPurposes)[keyof typeof LoanPurposes];
export type LoanPurposeKey = keyof typeof LoanPurposes;
export type LoanPurposeLabel = (typeof LoanPurposes)[LoanPurposeKey];


/*
 * Payload types
 */

export type CreateLoanPayload = {
  purpose: string; amount: number;
};
export type UpdateLoanPayload = Partial<{
  purpose?: string;
  status?: LoanStatus;
  amount?: number;
}>;
