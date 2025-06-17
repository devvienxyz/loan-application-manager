import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type AxiosError } from "axios";
import RegisterForm from "@/features/auth/components/register-form";
import { useLogin, useRegister } from "@/features/auth/hooks/useAuth";
import { LoginFormData, RegisterFormData } from "@loan-app-mgr/shared/types/auth";
import { ErrorDispatch } from "@/app/types";
import LoginForm from "@/features/auth/components/login-form";

type AuthMode = "login" | "register";

export default function AuthLanding() {
  const [mode, setMode] = useState<AuthMode>("login");
  const isLogin = mode === "login";

  const navigate = useNavigate();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLogin = (data: LoginFormData, setErrorMsg: ErrorDispatch) => {
    loginMutation.mutate(data, {
      onSuccess: () => navigate("/"),
      onError: (err: unknown) => {
        console.error(err)
        const reqErr = (err as AxiosError<{ message?: string }>).response?.data;
        const errMsg = reqErr?.message ?? "Something went wrong. Please try again.";
        setErrorMsg(errMsg);
      }
    });
  };

  const handleRegister = (data: RegisterFormData, setErrorMsg: ErrorDispatch) => {
    registerMutation.mutate(data, {
      onSuccess: () => navigate("/"),
      onError: (err: unknown) => {
        console.error(err)
        const reqErr = (err as AxiosError<{ message?: string }>).response?.data;
        const errMsg = reqErr?.message ?? "Something went wrong. Please try again.";
        setErrorMsg(errMsg);
      }
    });
  };

  return (
    <div className="h-screen flex items-center justify-start bg-gray-50">
      <div className="h-full w-full max-w-md flex flex-col justify-start p-6 pt-[40%] sm:pt-[10%] bg-white shadow-md space-y-6">
        <h1 className="brand-font text-3xl font-semibold text-center pb-6 text-black">Loan Manager</h1>

        {isLogin ? <LoginForm onSubmit={handleLogin} /> : <RegisterForm onSubmit={handleRegister} />}

        <p className="text-center text-sm">
          {isLogin ? "No account yet?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setMode(isLogin ? "register" : "login")}
          >
            {isLogin ? "Register" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
