
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export const FormSubmitButton = ({ label, ...props }: ButtonProps) => (
  <button
    type="submit"
    className="w-full text-sm bg-blue-600 text-white py-2 rounded-sm"
    {...props}
  >
    {label}
  </button>
)

export const FormCancelButton = ({ label, ...props }: ButtonProps) => (
  <button
    type="button"
    className="w-full px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
    {...props}
  >
    {label}
  </button>
)
