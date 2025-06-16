import AuthLanding from "@/features/auth/pages/landing";
import { useAuthStore } from "@/features/auth/store";
import LoanApplicationDetails from "@/features/loan-application/pages/details";
import LoanApplications from "@/features/loan-application/pages/list";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

function PublicRoute() {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

function ProtectedRoute() {
	const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
	return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default function AppRoutes() {
	return (
		<Routes>
			<Route element={<PublicRoute />}>
				<Route path="/auth" element={<AuthLanding />} />
			</Route>

			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<LoanApplications />} />
				<Route path="/loan/:id" element={<LoanApplicationDetails />} />
			</Route>
		</Routes>
	);
}

export { PublicRoute, ProtectedRoute };
