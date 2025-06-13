import { LoanApplicationStatus, type LoanApplicationStatus as LoanStatusType } from "@loan-app-mgr/shared/types/loan";

type Props = {
	status: LoanStatusType;
};

export default function LoanStatusBadge({ status }: Props) {
	const statusColors: Record<LoanApplicationStatus, string> = {
		[LoanApplicationStatus.Draft]: "text-blue-500",
		[LoanApplicationStatus.Submitted]: "text-blue-500",
		[LoanApplicationStatus.Pending]: "text-yellow-600",
		[LoanApplicationStatus.Approved]: "text-green-600",
		[LoanApplicationStatus.Rejected]: "text-red-600",
		[LoanApplicationStatus.Disbursed]: "text-purple-600",
		[LoanApplicationStatus.Cancelled]: "text-gray-400",
	};

	return <span className={statusColors[status]}>{(status as string).replaceAll("_", " ")}</span>;
}
