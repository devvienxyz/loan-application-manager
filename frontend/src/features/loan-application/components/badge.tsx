import * as LoanStatuses from "@loan-app-mgr/shared/types/loan";
import type { LoanApplicationStatus } from "@loan-app-mgr/shared/types/loan";

type Props = {
	status: LoanApplicationStatus;
};

export default function LoanStatusBadge({ status }: Props) {
	const statusColors: Record<LoanApplicationStatus, string> = {
		[LoanStatuses.LoanApplicationStatus.Draft]: "text-gray-500",
		[LoanStatuses.LoanApplicationStatus.Submitted]: "text-blue-500",
		[LoanStatuses.LoanApplicationStatus.Pending]: "text-yellow-600",
		[LoanStatuses.LoanApplicationStatus.Approved]: "text-green-600",
		[LoanStatuses.LoanApplicationStatus.Rejected]: "text-red-600",
		[LoanStatuses.LoanApplicationStatus.Disbursed]: "text-purple-600",
		[LoanStatuses.LoanApplicationStatus.Cancelled]: "text-gray-400",
	};

	return <span className={statusColors[status]}>{(status as string).replaceAll("_", " ")}</span>;
}
