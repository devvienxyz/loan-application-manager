import { useState } from "react";
import { RegisterFormData } from "@loan-app-mgr/shared/types/auth";
import { ErrorDispatch } from "@/app/types";
import { BaseEmailInput, BaseInput, BasePasswordInput } from "@/app/components/forms/inputs";
import { FormSubmitButton } from "@/app/components/forms/buttons";

type Props = {
  onSubmit: (data: RegisterFormData, setErrorMsg: ErrorDispatch) => void;
};

export default function RegisterForm({ onSubmit }: Props) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState<RegisterFormData>({ fullName: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, setErrorMsg);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex w-full flex-col">
      <BaseInput name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" />

      <BaseEmailInput value={form.email} onChange={handleChange} />

      <BasePasswordInput value={form.password} onChange={handleChange} />

      <FormSubmitButton label="Register" />

      {errorMsg && (
        <div className="mt-[-10px] mb-2 text-left text-red-500 text-sm">{errorMsg}</div>
      )}
    </form>
  );
}
