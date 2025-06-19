import AuthLanding from "@/features/auth/pages/landing";
import { useAuthStore } from "@/features/auth/store";
import LoanApplications from "@/features/loan-application/pages/list";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import NotFound from "@/app/pages/not-found";

function PublicRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/loans" replace />;
}

function ProtectedRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<AuthLanding />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/loans" element={<LoanApplications />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export { PublicRoute, ProtectedRoute };
