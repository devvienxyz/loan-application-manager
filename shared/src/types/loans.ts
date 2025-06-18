// export const LoanApplicationStatus = {
//   Draft: "DRAFT",
//   Submitted: "SUBMITTED",
//   Pending: "PENDING",
//   Approved: "APPROVED",
//   Rejected: "REJECTED",
//   Disbursed: "DISBURSED",
//   Cancelled: "CANCELLED",
// } as const;


export const LoanStatuses = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  DISBURSED: "Disbursed",
  CANCELLED: "Cancelled",
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
  HOME_IMPROVEMENT: "Home Improvement",
  PERSONAL: "Personal",
  OTHERS: "Others",
  // EDUCATION: "Education",
  // MEDICAL: "Medical",
  // BUSINESS: "Business",
} as const;
export type LoanPurpose = (typeof LoanPurposes)[keyof typeof LoanPurposes];
export type LoanPurposeKey = keyof typeof LoanPurposes;
export type LoanPurposeLabel = (typeof LoanPurposes)[LoanPurposeKey];
export type LoanOption = {
  value: LoanPurposeKey;
  label: LoanPurposeLabel;
};

export type CreateLoanPayload = {
  purpose: string; amount: number;
};

export type UpdateLoanPayload = {
  purpose?: string;
  status?: LoanStatus;
  amount?: number;
};
