import { useState } from "react";
import { RegisterFormData } from "@loan-app-mgr/shared/types/auth";

type Props = {
	onSubmit: (data: RegisterFormData) => void;
};

export default function RegisterForm({ onSubmit }: Props) {
	const [form, setForm] = useState<RegisterFormData>({ fullName: "", email: "", password: "" });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(form);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input
				name="fullName"
				value={form.fullName}
				onChange={handleChange}
				placeholder="Full Name"
				className="input"
				required
			/>
			<input
				type="email"
				name="email"
				value={form.email}
				onChange={handleChange}
				placeholder="Email"
				className="input"
				required
			/>
			<input
				type="password"
				name="password"
				value={form.password}
				onChange={handleChange}
				placeholder="Password"
				className="input"
				required
			/>
			<button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl">
				Register
			</button>
		</form>
	);
}
