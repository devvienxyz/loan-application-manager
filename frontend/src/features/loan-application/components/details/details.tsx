import { FormCancelButton } from "@/app/components/forms/buttons";
import { LOAN_PURPOSE_LABELS, LOAN_STATUS_LABELS } from "@loan-app-mgr/shared/constants/loans";
import { LoanPurposeKey, LoanStatusKey } from "@loan-app-mgr/shared/types/loans";
import figureFormatter from "@/app/utils/figure-formatters";
import monDateYearFormatter from "@/app/utils/date-formatters";
import { useGetLoanById } from "../../hooks/useLoans";

type DetailItemProps = {
  label: string;
  value: string;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <p className="text-sm font-bold">{label}</p>
      <div className="w-full">{value}</div>
    </div>
  );
}

type Props = {
  loanId: string;
  onClose: () => void;
};

export default function LoanDetails({ loanId, onClose }: Props) {
  const { data: loan, isLoading, isError, error } = useGetLoanById(loanId);

  if (isLoading) {
    return <div className="text-sm text-muted">Loading loan details...</div>;
  }

  if (isError || !loan) {
    console.error("Failed to fetch loan:", error);
    return <div className="text-sm text-red-500">Failed to load loan details.</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-semibold mb-4">Loan Details</h2>

      <div className="space-y-2 text-sm flex flex-col gap-4">
        <DetailItem label="Loan Id" value={loanId} />
        <DetailItem label="Amount" value={`$ ${figureFormatter(loan.amount)}`} />
        <DetailItem label="Purpose" value={LOAN_PURPOSE_LABELS[loan.purpose as LoanPurposeKey]} />
        <DetailItem label="Status" value={LOAN_STATUS_LABELS[loan.status as LoanStatusKey]} />
        <DetailItem label="Date Created" value={monDateYearFormatter(loan.createdAt)} />
      </div>

      <div className="flex justify-start mt-6">
        <div className="w-full max-w-[80px]">
          <FormCancelButton label="Close" onClick={onClose} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
