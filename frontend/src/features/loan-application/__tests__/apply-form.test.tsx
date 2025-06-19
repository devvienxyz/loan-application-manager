import { render, screen, fireEvent } from "@testing-library/react";
import LoanApplyForm from "@/features/loan-application/components/forms/apply-form";
import * as loanHooks from "@/features/loan-application/hooks/useLoans";
import { vi } from "vitest";

vi.mock("@/features/loan-application/hooks/useLoans");

describe("LoanApplyForm", () => {
  const onClose = vi.fn();
  const mutate = vi.fn();

  beforeEach(() => {
    vi.mocked(loanHooks.useCreateLoan).mockReturnValue({
      mutate,
      isLoading: false,
    });
    vi.clearAllMocks();
  });

  it("renders form correctly", () => {
    render(<LoanApplyForm onClose={onClose} />);

    expect(screen.getByText(/apply for a new loan/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter loan amount/i)).toBeInTheDocument();
    expect(screen.getByText(/purpose/i)).toBeInTheDocument();
  });

  it.skip("shows validation error on invalid amount", () => {
    render(<LoanApplyForm onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText(/enter loan amount/i), {
      target: { value: "abc" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/amount must be a number/i)).toBeInTheDocument();
    expect(mutate).not.toHaveBeenCalled();
  });

  it("submits valid form", () => {
    render(<LoanApplyForm onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText(/enter loan amount/i), {
      target: { value: "5000" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(mutate).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 5000,
        purpose: expect.any(String),
      }),
      expect.objectContaining({
        onSuccess: expect.any(Function),
      })
    );

    expect(onClose).toHaveBeenCalled(); // onSuccess + manual call
  });

  it("calls onClose when cancel is clicked", () => {
    render(<LoanApplyForm onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
