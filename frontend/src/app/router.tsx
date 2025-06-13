import LoanApplicationDetails from "@/features/loan-application/pages/details";
import LoanApplications from "@/features/loan-application/pages/list";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<LoanApplications />} />
			<Route path="/loan/:id" element={<LoanApplicationDetails />} />
		</Routes>
	);
}
