import RegisterForm from "@/features/auth/components/register-form";
import SignInForm, { type SignInFormData } from "@/features/auth/components/signin-form";
import { useLogin, useRegister } from "@/features/auth/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterFormData } from "../types";

type AuthMode = "signin" | "register";

export default function AuthLanding() {
	const [mode, setMode] = useState<AuthMode>("signin");

	const navigate = useNavigate();
	const loginMutation = useLogin();
	const registerMutation = useRegister();

	const handleSignIn = (data: SignInFormData) => {
		loginMutation.mutate(data, {
			onSuccess: () => navigate("/"),
			onError: (err: unknown) => console.error(err),
		});
	};

	const handleRegister = (data: RegisterFormData) => {
		registerMutation.mutate(data, {
			onSuccess: () => navigate("/"),
			onError: (err: unknown) => console.error(err),
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md space-y-6">
				<h2 className="text-xl font-semibold text-center">{mode === "signin" ? "Sign In" : "Register"}</h2>

				{mode === "signin" ? <SignInForm onSubmit={handleSignIn} /> : <RegisterForm onSubmit={handleRegister} />}

				<p className="text-center text-sm">
					{mode === "signin" ? "No account yet?" : "Already have an account?"}{" "}
					<button
						type="button"
						className="text-blue-600 hover:underline"
						onClick={() => setMode(mode === "signin" ? "register" : "signin")}
					>
						{mode === "signin" ? "Register" : "Sign In"}
					</button>
				</p>
			</div>
		</div>
	);
}
