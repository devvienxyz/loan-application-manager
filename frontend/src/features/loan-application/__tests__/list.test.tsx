import { render, screen, fireEvent } from "@testing-library/react";
import LoanApplications from "../pages/list";
import * as authStore from "@/features/auth/store";
import * as loansHook from "../hooks/useLoans";
import { GetMeData } from "@loan-app-mgr/shared/types/auth";
import { UseQueryResult } from "@tanstack/react-query";
import { useLoans } from "../hooks/useLoans";

const mockHandleView = vi.fn();
const mockHandleEdit = vi.fn();

const mockLoans = [
  {
    id: "1",
    amount: 5000,
    purpose: "car",
    status: "approved",
    createdAt: "2024-01-01"
  }
];
const mockQuerySuccess = <T,>(data: T): UseQueryResult<T, Error> => ({
  data,
  error: null,
  isLoading: false,
  isError: false,
  isSuccess: true,
  isPending: false,
  isFetched: true,
  isFetching: false,
  isRefetching: false,
  isPlaceholderData: false,
  dataUpdatedAt: Date.now(),
  errorUpdatedAt: 0,
  fetchStatus: "idle",
  refetch: vi.fn(),
  status: "success"
});

const mockQueryLoading = <T,>(): UseQueryResult<T, Error> => ({
  data: undefined,
  error: null,
  isLoading: true,
  isError: false,
  isSuccess: false,
  isPending: true,
  isFetched: false,
  isFetching: true,
  isRefetching: false,
  isPlaceholderData: false,
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  fetchStatus: "fetching",
  refetch: vi.fn(),
  status: "pending"
});

const mockQueryError = <T,>(error = new Error("Test error")): UseQueryResult<T, Error> => ({
  data: undefined,
  error,
  isLoading: false,
  isError: true,
  isSuccess: false,
  isPending: false,
  isFetched: true,
  isFetching: false,
  isRefetching: false,
  isPlaceholderData: false,
  dataUpdatedAt: 0,
  errorUpdatedAt: Date.now(),
  fetchStatus: "idle",
  refetch: vi.fn(),
  status: "error"
});

vi.mock("@/features/auth/store");
vi.mock("@/features/loan-application/hooks/useLoans");
vi.mock("@/features/loan-application/components/table/table", () => ({
  default: (props: any) => {
    mockHandleView.mockImplementation(() => props.handleView("123"));
    mockHandleEdit.mockImplementation(() => props.handleEdit("456"));
    return <div>LoanApplicationsTable</div>;
  },
}));
vi.mock("@/features/loan-application/components/forms/apply-form", () => ({
  default: () => <div>LoanApplyForm</div>
}));
vi.mock("@/features/loan-application/components/forms/edit-form", () => ({
  default: () => <div>LoanEditForm</div>
}));

vi.mock("@/features/loan-application/components/details/details", () => ({
  default: () => (
    <div>
      LoanDetails
      <button type="button" onClick={() => { }} aria-label="Close">Close</button>
    </div>
  )
}));

describe("LoanApplications", () => {
  beforeEach(() => {
    vi.mocked(authStore.useAuthStore).mockImplementation((selector) =>
      selector({
        user: { fullName: "John Doe", role: "admin" },
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
        setUser: vi.fn()
      })
    );
  });

  it("renders loading state", () => {
    vi.mocked(loansHook.useLoans).mockReturnValue(mockQueryLoading());
    render(<LoanApplications />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    // vi.mocked(useLoans).mockReturnValue(
    //   createQueryResult({ isError: true, error: new Error("fail"), status: "error" })
    // );

    vi.mocked(loansHook.useLoans).mockReturnValue(mockQueryError());
    render(<LoanApplications />);
    expect(screen.getByText(/Failed to fetch loan applications/i)).toBeInTheDocument();
  });

  it("renders table and allows switching modes", () => {
    vi.mocked(loansHook.useLoans).mockReturnValue(mockQuerySuccess(mockLoans));
    render(<LoanApplications />);

    expect(screen.getByText(/Hello, John Doe/i)).toBeInTheDocument();
    expect(screen.getByText("LoanApplicationsTable")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /apply for a new loan/i }));
    expect(screen.getByText("LoanApplyForm")).toBeInTheDocument();
  });

  it("opens view and edit forms", async () => {
    vi.mocked(loansHook.useLoans).mockReturnValue(mockQuerySuccess(mockLoans));
    render(<LoanApplications />);

    // View mode
    mockHandleView();
    expect(await screen.findByText("LoanDetails")).toBeInTheDocument();

    // Close modal — assumes modal close button exists and has accessible name
    fireEvent.click(screen.getByRole("button", { name: /Close/i }));

    // Edit mode
    mockHandleEdit();
    expect(await screen.findByText("LoanEditForm")).toBeInTheDocument();
  });
});
