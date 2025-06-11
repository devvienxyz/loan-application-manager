import { LoanApplicationStatus } from "@loan-app-mgr/shared";

type Props = {
	status: LoanApplicationStatus;
};

export default function LoanStatusBadge({ status }: Props) {
	const statusColors: Record<LoanApplicationStatus, string> = {
		[LoanApplicationStatus.Draft]: "text-gray-500",
		[LoanApplicationStatus.Submitted]: "text-blue-500",
		[LoanApplicationStatus.Pending]: "text-yellow-600",
		[LoanApplicationStatus.Approved]: "text-green-600",
		[LoanApplicationStatus.Rejected]: "text-red-600",
		[LoanApplicationStatus.Disbursed]: "text-purple-600",
		[LoanApplicationStatus.Cancelled]: "text-gray-400",
	};

	return <span className={statusColors[status]}>{(status as string).replaceAll("_", " ")}</span>;
}
