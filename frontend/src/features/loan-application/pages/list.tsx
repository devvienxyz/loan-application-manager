import { useAuthStore } from "@/features/auth/store";
import LoanApplicationsTable from "../components/table";
import { useLoans } from "../hooks/useLoans";

export default function LoanApplications() {
  const { data, isLoading, isError } = useLoans();
  const { user } = useAuthStore((s) => s);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to fetch loan applications.</div>;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div className="pl-2 text-2xl">
        <span className="font-bold">Hello, {user?.fullName || "Guest"}</span> 👋
      </div>

      <div className="w-full">
        <LoanApplicationsTable data={data} />
      </div>
    </div>
  );
}
