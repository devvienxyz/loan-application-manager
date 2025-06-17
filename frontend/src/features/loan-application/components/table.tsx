import { useAuthStore } from "@/features/auth/store";
import { useState } from "react";
import TableRow from "./table-row";
import useLoanAppStore from "../store";
import TablePagination from "./table-pagination";

export default function LoanApplicationsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuthStore((s) => s);
  const { loanList, total, page, pageSize, setPage, setSearch, search } = useLoanAppStore((s) => (s));

  const isAdmin = user?.role === "admin";
  const totalPages = Math.ceil(total / pageSize);

  const handleSearch = () => setSearch(searchTerm);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e?.target.value ?? "");
  }

  return (
    <>
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Loan Applications</h3>
          <p className="text-slate-500 text-sm">Overview of {isAdmin ? "all" : "your personal"} loans.</p>
        </div>
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              <input
                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Search for loans..."
                onKeyUp={handleKeyUp}
                onChange={handleChange}
              />
              <button
                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded"
                type="button"
                title="Search"
                onClick={handleSearch}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Loan ID
                </p>
              </th>
              <th className="p-4 border-b border-slate-200 bg-slate-50">
                <p className="text-sm font-normal leading-none text-slate-500">
                  Name
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
            </tr>
          </thead>
          <tbody>
            {loanList?.map((loan) => (
              <TableRow rowData={loan} key={`loan-${loan.id}`} />
            ))}

            {!loanList?.length && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-sm">No records to display</td>
              </tr>
            )}
          </tbody>
        </table>

        {!!loanList?.length && (
          <TablePagination page={page} pageSize={pageSize} total={total} setPage={setPage} totalPages={totalPages} />
        )}
      </div>
    </>
  )
}