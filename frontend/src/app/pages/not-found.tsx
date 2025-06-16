import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="text-center py-20">
			<h1 className="text-4xl font-bold">404</h1>
			<p className="text-lg mt-4">Page not found</p>
			<button
				className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
				onClick={() => navigate(-1)} // Go back
			>
				Go Back
			</button>
		</div>
	);
}
