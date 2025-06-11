import "./App.css";

export default function App() {
	return (
		<>
			<div className="">Loan Application Manager</div>
			<div className="">
				{["Pending", "Approved"].map((loanStatus) => (
					<button key={`loanStatus-${loanStatus}`} type="button" className="h-12 w-full">
						{loanStatus}
					</button>
				))}
			</div>
		</>
	);
}
