import { render, screen, fireEvent } from "@testing-library/react";
import LoanEditForm from "@/features/loan-application/components/forms/edit-form";
import * as loansHook from "@/features/loan-application/hooks/useLoans";

vi.mock("@/features/loan-application/hooks/useLoans");

const loan = {
  amount: 5000,
  purpose: "business",
  status: "pending",
};

describe("LoanEditForm", () => {
  const onClose = vi.fn();
  const mutate = vi.fn();

  beforeEach(() => {
    vi.mocked(loansHook.useGetLoanById).mockReturnValue({
      data: loan,
      isLoading: false,
    });
    vi.mocked(loansHook.useUpdateLoan).mockReturnValue({
      mutate,
      isPending: false,
    });
  });

  it("renders form fields with loan data", () => {
    render(<LoanEditForm loanId="abc" onClose={onClose} />);
    expect(screen.getByDisplayValue(String(loan.amount))).toBeInTheDocument();
    expect(screen.getByText(/modify loan details/i)).toBeInTheDocument();
  });

  it.skip("validates amount input", () => {
    render(<LoanEditForm loanId="abc" onClose={onClose} />);

    const amountInput = screen.getByPlaceholderText(/enter loan amount/i);
    fireEvent.change(amountInput, { target: { value: "abc" } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/amount must be a valid number/i)).toBeInTheDocument();
    expect(mutate).not.toHaveBeenCalled();
  });

  it("submits valid form", () => {
    render(<LoanEditForm loanId="abc" onClose={onClose} />);
    const amountInput = screen.getByPlaceholderText(/enter loan amount/i);

    fireEvent.change(amountInput, { target: { value: "6000" } });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mutate).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 6000,
        purpose: loan.purpose,
        status: loan.status,
      }),
      expect.objectContaining({ onSuccess: onClose })
    );
  });

  it("calls onClose when cancel clicked", () => {
    render(<LoanEditForm loanId="abc" onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
