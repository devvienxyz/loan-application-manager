import { useLoanAppStore } from "../store";

export default function LoanApplications() {
	const selectedStatus = useLoanAppStore((s) => s.selectedStatus);
	const setSelectedStatus = useLoanAppStore((s) => s.setSelectedStatus);

	return (
		<div>
			<h1>Loan Applications</h1>
			<p>Selected Status: {selectedStatus}</p>
			<button type="button" onClick={() => setSelectedStatus("Approved")}>
				Set Approved
			</button>
		</div>
	);
}
