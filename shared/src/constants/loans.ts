import { LoanPurpose, LoanPurposes, LoanStatus, LoanStatuses } from "../types/loans.js";

const MINIMUM_LOAN = 1000;
const MAXIMUM_LOAN = 100000;
const LOAN_PURPOSE_OPTIONS: { value: LoanPurpose; label: string }[] = [
  { value: "HOME_IMPROVEMENT", label: "Home Improvement" },
  { value: "PERSONAL", label: "Personal" },
  { value: "OTHERS", label: "Others" },
];
const LOAN_PURPOSE_LABELS: Record<keyof typeof LoanPurposes, string> = {
  HOME_IMPROVEMENT: "Home Improvement",
  PERSONAL: "Personal",
  OTHERS: "Others",
  // EDUCATION: "Education",
  // MEDICAL: "Medical",
  // BUSINESS: "Business",
};

const LOAN_STATUS_OPTIONS: { value: LoanStatus; label: string }[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "SUBMITTED", label: "Submitted" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "DISBURSED", label: "Disbursed" },
  { value: "CANCELLED", label: "Cancelled" },
];
const LOAN_STATUS_LABELS: Record<keyof typeof LoanStatuses, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  DISBURSED: "Disbursed",
  CANCELLED: "Cancelled",
};

export {
  MINIMUM_LOAN,
  MAXIMUM_LOAN,
  LOAN_PURPOSE_OPTIONS,
  LOAN_PURPOSE_LABELS,
  LOAN_STATUS_LABELS,
  LOAN_STATUS_OPTIONS,
}
