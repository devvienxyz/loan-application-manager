type Props = {
  label: string;
}

export const FormSubmitButton = ({ label }: Props) => (
  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-sm">
    {label}
  </button>
)
