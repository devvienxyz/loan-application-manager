import { useLoans } from "../hooks/useLoans";

export default function LoanApplications() {
	const { data, isLoading, isError } = useLoans();

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Failed to fetch loan applications.</div>;

	return (
		<div>
			{data.map((loan) => (
				<div key={loan.id}>{loan.name}</div>
			))}
		</div>
	);
}
