import { LoanApplicationStatus, type LoanApplicationStatus as LoanStatuses } from "@loan-app-mgr/shared/types/loans";

export const isFinalStatus = (status: string): boolean => {
  return [
    LoanApplicationStatus.Approved,
    LoanApplicationStatus.Rejected,
    LoanApplicationStatus.Disbursed,
    LoanApplicationStatus.Cancelled,
  ].includes(status as LoanStatuses);
};
