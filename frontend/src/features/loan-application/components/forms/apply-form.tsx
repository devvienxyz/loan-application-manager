import { FormCancelButton, FormSubmitButton } from "@/app/components/forms/buttons";
import { BaseInput, BaseInputGroup } from "@/app/components/forms/inputs";
import { LOAN_PURPOSE_OPTIONS, MAXIMUM_LOAN, MINIMUM_LOAN } from "@loan-app-mgr/shared/constants/loans";
import { useState } from "react";
import { useCreateLoan } from "../../hooks/useLoans";
import PurposeSelect from "../table/purpose-select";
import { LoanPurpose } from "@loan-app-mgr/shared/types/loans";
import SelectDropdown from "@/app/components/forms/select";

export default function LoanApplyForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ purpose: LOAN_PURPOSE_OPTIONS[0].value, amount: "" });
  const [errors, setErrors] = useState<{ purpose?: LoanPurpose; amount?: string }>({});

  const { mutate, isLoading } = useCreateLoan();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePurposeSelect = (value: LoanPurpose) => {
    setForm({ ...form, purpose: value });
    // setErrors({ ...errors, purpose: undefined });
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!Number(form.amount) || isNaN(Number(form.amount))) errs.amount = "Amount must be a number";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    mutate(
      { purpose: form.purpose, amount: Number(form.amount) },
      { onSuccess: () => onClose() }
    );
    onClose();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-semibold mb-6">Apply for a New Loan</h2>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <BaseInputGroup label="Amount" errorMsg={errors.amount}>
          <BaseInput
            name="amount"
            type="number"
            placeholder="Enter loan amount"
            min={MINIMUM_LOAN}
            max={MAXIMUM_LOAN}
            onChange={handleChange} />
        </BaseInputGroup>

        <BaseInputGroup label="Purpose" errorMsg={errors.purpose}>
          <SelectDropdown
            selected={form.purpose}
            label="Loan Purpose"
            onChange={handlePurposeSelect}
            options={LOAN_PURPOSE_OPTIONS}
            defaultValue={LOAN_PURPOSE_OPTIONS[0].label}
            required
          />
        </BaseInputGroup>

        {/* action btns */}

        <div className="flex justify-end gap-2">
          <div className="w-full max-w-[80px]">
            <FormCancelButton label="Cancel" onClick={onClose} disabled={isLoading} />
          </div>
          <div className="w-full max-w-[80px]">
            <FormSubmitButton label="Submit" disabled={isLoading} />
          </div>
        </div>
      </form>
    </div>
  );
}
