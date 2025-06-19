import { useState } from "react";
import { LoginFormData } from "@loan-app-mgr/shared/types/auth";
import { ErrorDispatch } from "@/app/types";
import { BaseEmailInput, BasePasswordInput } from "@/app/components/forms/inputs";
import { FormSubmitButton } from "@/app/components/forms/buttons";

type Props = {
  onSubmit: (data: LoginFormData, setErrorMsg: ErrorDispatch) => void;
};

export default function LoginForm({ onSubmit }: Props) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, setErrorMsg);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex w-full flex-col" aria-label="Login Form">
      <BaseEmailInput value={form.email} onChange={handleChange} />

      <BasePasswordInput value={form.password} onChange={handleChange} />

      <FormSubmitButton label="Login" />

      {errorMsg && (
        <div className="mt-[-10px] mb-2 text-left text-red-500 text-sm">{errorMsg}</div>
      )}
    </form>
  );
}
