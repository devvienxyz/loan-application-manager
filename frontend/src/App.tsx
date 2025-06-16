import { BrowserRouter } from "react-router-dom";
import Layout from "@/app/layout";
import AppRoutes from "@/app/routes";

export default function App() {
	return (
		<BrowserRouter>
			<Layout>
				<AppRoutes />
			</Layout>
		</BrowserRouter>
	);
}
