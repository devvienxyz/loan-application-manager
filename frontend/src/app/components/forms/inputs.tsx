import { ClassAttributes, InputHTMLAttributes } from "react";

type BaseInputProps = ClassAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement>;

export const BaseInput = (props: BaseInputProps) => (
  <input
    className="input py-2 px-4 rounded-sm outline-1 outline-gray-200 focus:outline-blue-600"
    type="text"
    placeholder="Enter text"
    required
    {...props}
  />
)

export const BaseEmailInput = (props: BaseInputProps) => (
  BaseInput({ type: "email", name: "email", placeholder: "Email", ...props })
)

export const BasePasswordInput = (props: BaseInputProps) => (
  BaseInput({ type: "password", name: "password", placeholder: "Password", ...props })
)
