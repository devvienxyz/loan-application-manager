import Layout from "@/app/layout";
import AppRoutes from "@/app/router";
import { BrowserRouter } from "react-router-dom";

export default function App() {
	return (
		<BrowserRouter>
			<Layout>
				<AppRoutes />
			</Layout>
		</BrowserRouter>
	);
}
