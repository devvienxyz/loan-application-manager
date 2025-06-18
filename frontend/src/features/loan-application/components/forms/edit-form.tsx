import { useAuthStore } from "@/features/auth/store";
import { useEffect, useState } from "react";
import { LoanPurpose } from "@prisma/client";
import { BaseInput, BaseInputGroup } from "@/app/components/forms/inputs";
import { FormCancelButton, FormSubmitButton } from "@/app/components/forms/buttons";
import { LOAN_PURPOSE_OPTIONS, MAXIMUM_LOAN, MINIMUM_LOAN } from "@loan-app-mgr/shared/constants/loans";
import PurposeSelect from "../table/purpose-select";

type Props = {
  loanId: string;
  onClose: () => void;
};

export default function LoanEditForm({ loanId, onClose }: Props) {
  const [form, setForm] = useState({ purpose: "", amount: "" });
  const [errors, setErrors] = useState<{ purpose?: LoanPurpose; amount?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/loans/${loanId}`);
        const data = await res.json();
        setForm({ purpose: data.purpose, amount: String(data.amount) });
      } catch (err) {
        console.error("Failed to fetch loan:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoan();
  }, [loanId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePurposeSelect = (value: LoanPurpose) => {
    setForm({ ...form, purpose: value });
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!Number(form.amount) || isNaN(Number(form.amount))) errs.amount = "Amount must be a number";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    mutate(
      { purpose: form.purpose, amount: Number(form.amount) },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-semibold mb-6">Modify Loan Details</h2>

      <div className="space-y-4 w-full">
        <BaseInputGroup label="Amount" errorMsg={errors.amount}>
          <BaseInput
            name="amount"
            type="number"
            value={form.amount}
            placeholder="Enter loan amount"
            min={MINIMUM_LOAN}
            max={MAXIMUM_LOAN}
            onChange={handleChange}
            disabled={isLoading}
          />
        </BaseInputGroup>

        <BaseInputGroup label="Purpose" errorMsg={errors.purpose}>
          <PurposeSelect
            selected={form.purpose}
            label="Select Loan Purpose"
            onChange={handlePurposeSelect}
            options={LOAN_PURPOSE_OPTIONS}
            required
            disabled={isLoading}
          />
        </BaseInputGroup>

        <div className="flex justify-end gap-2">
          <div className="w-full max-w-[80px]">
            <FormCancelButton label="Cancel" onClick={onClose} disabled={isLoading} />
          </div>
          <div className="w-full max-w-[80px]">
            <FormSubmitButton label="Submit" disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
