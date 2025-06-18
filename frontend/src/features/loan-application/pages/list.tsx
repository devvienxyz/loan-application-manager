import { useState } from "react";
import { useAuthStore } from "@/features/auth/store";
import { useLoans } from "../hooks/useLoans";
import LoanApplicationsTable from "../components/table/table";
import LoanApplyForm from "../components/forms/apply-form";
import LoanEditForm from "../components/forms/edit-form";
import LoanDetails from "../components/details/details";

type Mode =
  | { type: "apply" }
  | { type: "view"; loanId: string }
  | { type: "edit"; loanId: string }
  | null;

export default function LoanApplications() {
  const { isLoading, isError } = useLoans();
  const { user } = useAuthStore((s) => s);
  const [mode, setMode] = useState<Mode>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to fetch loan applications.</div>;

  const handleClose = () => setMode(null);

  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="pl-2 text-2xl">
          <span className="font-bold">Hello, {user?.fullName || "Guest"}</span> 👋
        </div>

        <div className="w-full">
          <LoanApplicationsTable
            handleView={(loanId) => setMode({ type: "view", loanId })}
            handleEdit={(loanId) => setMode({ type: "edit", loanId })}
          />

          <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-600 text-sm text-white rounded hover:bg-blue-700"
            onClick={() => setMode({ type: "apply" })}
          >
            Apply for a new loan
          </button>
        </div>
      </div>

      {mode && (
        <div className="fixed inset-0 bg-blue-900/40 z-100 flex justify-start">
          <div className="bg-white p-6 shadow-lg w-full flex flex-col md:w-1/2 lg:w-1/5">
            {mode.type === "apply" && <LoanApplyForm onClose={handleClose} />}
            {mode.type === "view" && <LoanDetails loanId={mode.loanId} onClose={handleClose} />}
            {mode.type === "edit" && <LoanEditForm loanId={mode.loanId} onClose={handleClose} />}
          </div>
        </div>
      )}
    </>
  );
}
