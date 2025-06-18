import { LoanPurposes, LoanStatuses } from "../types/loans.js";

const MINIMUM_LOAN = 1000;
const MAXIMUM_LOAN = 100000;
const LOAN_PURPOSE_OPTIONS = [
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
}
