import { useState } from "react";

export type SignInFormData = {
	email: string;
	password: string;
};

type Props = {
	onSubmit: (data: SignInFormData) => void;
};

export default function SignInForm({ onSubmit }: Props) {
	const [form, setForm] = useState({ email: "", password: "" });

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
				Sign In
			</button>
		</form>
	);
}
