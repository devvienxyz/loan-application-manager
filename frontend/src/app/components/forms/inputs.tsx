import { ClassAttributes, InputHTMLAttributes } from "react";

type BaseInputProps = ClassAttributes<HTMLInputElement> & InputHTMLAttributes<HTMLInputElement>;

export const BaseInput = (props: BaseInputProps) => (
  <input
    className="w-full text-sm py-2 px-4 rounded-sm outline-1 outline-gray-200 focus:outline-blue-600"
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

type BaseInputGroupProps = {
  label: string;
  errorMsg?: string;
}
export const BaseInputGroup: React.FC<React.PropsWithChildren<BaseInputGroupProps>> = ({ label, errorMsg, children }) => (
  <div className="w-full flex flex-col gap-1">
    <p className="text-sm font-bold">{label}</p>
    <div className="w-full">{children}</div>
    {errorMsg && <p className="text-red-600 text-xs">{errorMsg}</p>}
  </div>
)
