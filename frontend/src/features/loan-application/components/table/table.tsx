import { useAuthStore } from "@/features/auth/store";
import { useState } from "react";
import useLoanAppStore from "../../store";
import { useDeleteLoan, useLoans } from "../../hooks/useLoans";
import TableRow from "./table-row";
import TablePagination from "./table-pagination";

type Props = {
  setSelectedLoan: React.Dispatch<React.SetStateAction<string | null>>
}

export default function LoanApplicationsTable({ setSelectedLoan }: Props) {
  const { user } = useAuthStore();
  const isAdmin = user?.role && user.role.toLowerCase() === "admin";

  const { page, pageSize, search, setPage, setSearch } = useLoanAppStore();
  const { data, isLoading } = useLoans();

  const [searchTerm, setSearchTerm] = useState(search);
  const { mutate: removeLoan } = useDeleteLoan();

  const handleSearch = () => {
    setSearch(searchTerm);
    setPage(1); // Reset to first page on new search
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this loan?")) {
      removeLoan(id);
    }
  }

  const total = data?.total ?? 0;
  const loanList = data?.loans ?? [];
  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
      <div className="flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Loan Applications</h3>
          <p className="text-slate-500 text-sm">Overview of {isAdmin ? "all" : "your recorded"} loans.</p>
        </div>

        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              <input
                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Search for loans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded"
                type="button"
                title="Search"
                onClick={handleSearch}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Loan Id
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Purpose
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Amount
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Status
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Date Created
                </p>
              </th>
              {isAdmin && (
                <th className="p-4 border-b border-slate-200 bg-slate-50">
                </th>
              )}

            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="text-center py-4 text-sm">Loading...</td></tr>
            ) : loanList.length ? (
              loanList.map((loan) => (
                <TableRow
                  key={loan.id}
                  rowData={loan}
                  onSelect={setSelectedLoan}
                  onEdit={setSelectedLoan}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <tr><td colSpan={5} className="text-center py-4 text-sm">No records found</td></tr>
            )}
          </tbody>
        </table>

        {!!loanList.length && (
          <TablePagination
            page={page}
            pageSize={pageSize}
            total={total}
            totalPages={totalPages}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
}
