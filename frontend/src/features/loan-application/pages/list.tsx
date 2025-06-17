import { useAuthStore } from "@/features/auth/store";
import LoanApplicationsTable from "../components/table";
import { useLoans } from "../hooks/useLoans";
import { useState } from "react";
import LoanForm from "../components/loan-form";

export default function LoanApplications() {
  const { isLoading, isError } = useLoans();
  const { user } = useAuthStore((s) => s);
  const [applyForLoan, setApplyForLoan] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to fetch loan applications.</div>;

  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="pl-2 text-2xl">
          <span className="font-bold">Hello, {user?.fullName || "Guest"}</span> 👋
        </div>

        <div className="w-full">
          <LoanApplicationsTable />

          {!applyForLoan && (
            <button type="button" className="mt-4 px-4 py-2 bg-blue-600 text-sm text-white rounded hover:bg-blue-700" onClick={() => setApplyForLoan(true)}>
              Apply for a new loan
            </button>
          )}
        </div>
      </div>

      {applyForLoan && (
        <div className="fixed inset-0 bg-blue-900/40 z-100 flex items-end justify-center">
          <div className="bg-white p-6 rounded-t-sm shadow-lg w-full sm:w-2/3 lg:w-1/2 xl:w-1/3">
            <LoanForm onClose={() => setApplyForLoan(false)} />
          </div>
        </div>
      )}
    </>
  );
}
