import { useAuthStore } from "@/features/auth/store";
import LoanApplicationsTable from "../components/table/table";
import { useLoans } from "../hooks/useLoans";
import { useState } from "react";
import LoanApplyForm from "../components/forms/apply-form";
import LoanEditForm from "../components/forms/edit-form";
import LoanDetails from "../components/details/details";

export default function LoanApplications() {
  const { isLoading, isError } = useLoans();
  const { user } = useAuthStore((s) => s);
  const [applyForLoan, setApplyForLoan] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null)
  const [loanToModify, setLoanToModify] = useState<string | null>(null)

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to fetch loan applications.</div>;

  const handleCloseFormWrapper = () => {
    setApplyForLoan(false)
    setSelectedLoan(null)
  }

  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="pl-2 text-2xl">
          <span className="font-bold">Hello, {user?.fullName || "Guest"}</span> 👋
        </div>

        <div className="w-full">
          <LoanApplicationsTable setSelectedLoan={setSelectedLoan} />

          <button
            type="button"
            className="mt-4 px-4 py-2 bg-blue-600 text-sm text-white rounded hover:bg-blue-700"
            onClick={() => setApplyForLoan(true)}
          >
            Apply for a new loan
          </button>
        </div>
      </div>

      {applyForLoan || selectedLoan && (
        <div className="fixed inset-0 bg-blue-900/40 z-100 flex justify-start">
          <div className="bg-white p-6 rounded-t-sm shadow-lg w-full flex flex-col md:1/2 lg:w-1/5">
            {selectedLoan ? (
              <LoanDetails onClose={handleCloseFormWrapper} loanId={selectedLoan} />
            ) : loanToModify ? (
              <LoanEditForm onClose={handleCloseFormWrapper} loanId={loanToModify} />
            ) : (
              <LoanApplyForm onClose={handleCloseFormWrapper} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
