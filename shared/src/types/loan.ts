export const LoanApplicationStatus = {
	Draft: "DRAFT",
	Submitted: "SUBMITTED",
	Pending: "PENDING",
	Approved: "APPROVED",
	Rejected: "REJECTED",
	Disbursed: "DISBURSED",
	Cancelled: "CANCELLED",
} as const;

export type LoanApplicationStatus = (typeof LoanApplicationStatus)[keyof typeof LoanApplicationStatus];
