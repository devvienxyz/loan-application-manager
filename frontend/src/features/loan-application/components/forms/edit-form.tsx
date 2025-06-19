import { useAuthStore } from "@/features/auth/store";
import { useEffect, useState } from "react";
import { LoanPurpose } from "@prisma/client";
import { BaseInput, BaseInputGroup } from "@/app/components/forms/inputs";
import { FormCancelButton, FormSubmitButton } from "@/app/components/forms/buttons";
import { LOAN_PURPOSE_OPTIONS, LOAN_STATUS_OPTIONS, MAXIMUM_LOAN, MINIMUM_LOAN } from "@loan-app-mgr/shared/constants/loans";
import PurposeSelect from "../table/purpose-select";
import { LoanPurposeKey, LoanStatusKey } from "@loan-app-mgr/shared/types/loans";
import { useGetLoanById, useUpdateLoan } from "../../hooks/useLoans";
import SelectDropdown from "@/app/components/forms/select";

type Props = {
  loanId: string;
  onClose: () => void;
};

type FormFields = {
  purpose: string;
  amount: string;
  status: string
}

export default function LoanEditForm({ loanId, onClose }: Props) {
  const { data: loan, isLoading } = useGetLoanById(loanId);
  const { mutate, isPending } = useUpdateLoan(loanId);

  const [form, setForm] = useState<FormFields>({ purpose: "", amount: "", status: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  useEffect(() => {
    if (loan) {
      setForm({
        purpose: loan.purpose,
        amount: String(loan.amount),
        status: loan.status,
      });
    }
  }, [loan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePurposeSelect = (value: LoanPurposeKey | LoanStatusKey, field: "purpose" | "status") => {
    setForm({ ...form, [field]: value });
  };

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!Number(form.amount)) errs.amount = "Amount must be a valid number";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    mutate(
      {
        amount: Number(form.amount),
        purpose: form.purpose,
        status: form.status,
      },
      {
        onSuccess: onClose,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <h2 className="text-xl font-semibold mb-6">Modify Loan Details</h2>

      <BaseInputGroup label="Amount" errorMsg={errors.amount}>
        <BaseInput
          name="amount"
          type="number"
          value={form.amount}
          placeholder="Enter loan amount"
          min={MINIMUM_LOAN}
          max={MAXIMUM_LOAN}
          onChange={handleChange}
          disabled={isLoading || isPending}
        />
      </BaseInputGroup>

      <BaseInputGroup label="Status" errorMsg={errors.status}>
        <SelectDropdown
          selected={form.status as LoanStatusKey}
          label="Loan Status"
          onChange={(v) => handlePurposeSelect(v, "status")}
          options={LOAN_STATUS_OPTIONS}
          disabled={isLoading || isPending}
          required
        />
      </BaseInputGroup>

      <BaseInputGroup label="Purpose" errorMsg={errors.purpose}>
        <SelectDropdown
          selected={form.purpose as LoanPurposeKey}
          label="Loan Purpose"
          onChange={(v) => handlePurposeSelect(v, "purpose")}
          options={LOAN_PURPOSE_OPTIONS}
          // defaultValue={LOAN_PURPOSE_OPTIONS[0].label}
          disabled={isLoading || isPending}
          required
        />
      </BaseInputGroup>

      <div className="flex justify-end gap-2">
        <div className="w-full max-w-[80px]">
          <FormCancelButton label="Cancel" onClick={onClose} disabled={isLoading || isPending} />
        </div>
        <div className="w-full max-w-[80px]">
          <FormSubmitButton label="Submit" disabled={isLoading || isPending} />
        </div>
      </div>
    </form>
  );
}