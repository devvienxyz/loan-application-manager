import { BrowserRouter } from "react-router-dom";
import Layout from "@/app/layout";
import AppRoutes from "@/app/routes";
import { useAuthStore } from "@/features/auth/store";
import { useEffect } from "react";

export default function App() {
	// const checkAuth = useAuthStore((s) => s.checkAuth);

  // useEffect(() => {
	// 	checkAuth();
	// }, [checkAuth]);

	return (
		<BrowserRouter>
			<Layout>
				<AppRoutes />
			</Layout>
		</BrowserRouter>
	);
}
