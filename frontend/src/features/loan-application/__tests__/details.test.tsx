import { render, screen, fireEvent } from "@testing-library/react";
import LoanDetails from "@/features/loan-application/components/details/details";
import * as loansHook from "@/features/loan-application/hooks/useLoans";

vi.mock("@/features/loan-application/hooks/useLoans");

const mockLoan = {
  amount: 10000,
  purpose: "personal",
  status: "approved",
  createdAt: new Date().toISOString(),
};

describe("LoanDetails", () => {
  it("renders loading state", () => {
    vi.mocked(loansHook.useGetLoanById).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });
    render(<LoanDetails loanId="123" onClose={vi.fn()} />);
    expect(screen.getByText(/Loading loan details/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    vi.mocked(loansHook.useGetLoanById).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error("Fetch failed"),
    });
    render(<LoanDetails loanId="123" onClose={vi.fn()} />);
    expect(screen.getByText(/Failed to load loan details/i)).toBeInTheDocument();
  });

  it("renders loan details and calls onClose", () => {
    const onClose = vi.fn();
    vi.mocked(loansHook.useGetLoanById).mockReturnValue({
      data: mockLoan,
      isLoading: false,
      isError: false,
      error: null,
    });
    render(<LoanDetails loanId="123" onClose={onClose} />);

    expect(screen.getByText(/Loan Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Loan Id/i)).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
