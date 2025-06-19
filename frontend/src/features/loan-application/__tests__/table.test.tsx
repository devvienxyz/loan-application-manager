import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/features/auth/store", () => ({
  useAuthStore: vi.fn(),
}));

vi.mock("@/features/loan-application/store", () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock("@/features/loan-application/hooks/useLoans", () => ({
  useLoans: vi.fn(),
  useDeleteLoan: vi.fn(),
}));

vi.mock("@/app/components/display/copy-button", () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => <button>Copy {text}</button>,
}));

// Sample data
const mockLoans = [
  {
    id: "loan1",
    purpose: "home",
    status: "pending",
    amount: 10000,
    createdAt: "2023-08-01",
  },
];

const mockSetPage = vi.fn();
const mockSetSearch = vi.fn();

import LoanApplicationsTable from "../components/table/table";
import TablePagination from "../components/table/table-pagination";
import TableRow from "../components/table/table-row";
import { useAuthStore } from "@/features/auth/store";
import useLoanAppStore from "../store";
import { useDeleteLoan, useLoans } from "../hooks/useLoans";

const mockedUseAuthStore = useAuthStore as unknown as jest.Mock;
const mockedUseLoanAppStore = useLoanAppStore as unknown as jest.Mock;
const mockedUseDeleteLoan = useDeleteLoan as unknown as jest.Mock;
const mockedUseLoans = useLoans as unknown as jest.Mock;

describe("Loan Table Components", () => {
  const defaultUser = { role: "admin" };

  beforeEach(() => {
    vi.resetAllMocks();

    mockedUseAuthStore.mockReturnValue({ user: defaultUser });

    mockedUseLoanAppStore.mockReturnValue({
      page: 1,
      pageSize: 10,
      search: "",
      setPage: mockSetPage,
      setSearch: mockSetSearch,
    });

    mockedUseLoans.mockReturnValue({
      data: { total: 1, loans: mockLoans },
      isLoading: false,
    });

    mockedUseDeleteLoan.mockReturnValue({
      mutate: vi.fn(),
    });
  });

  // -- LoanApplicationsTable tests --
  it("renders loan applications table with loan data", () => {
    render(<LoanApplicationsTable handleView={() => { }} handleEdit={() => { }} />);
    expect(screen.getByText("Loan Applications")).toBeInTheDocument();
    expect(screen.getByText("loan1")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("triggers search on Enter key", async () => {
    render(<LoanApplicationsTable handleView={() => { }} handleEdit={() => { }} />);
    const input = screen.getByPlaceholderText(/search for loans/i);
    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.keyUp(input, { key: "Enter" });

    await waitFor(() => {
      expect(mockSetSearch).toHaveBeenCalledWith("query");
      expect(mockSetPage).toHaveBeenCalledWith(1);
    });
  });

  it("triggers search on search button click", async () => {
    render(<LoanApplicationsTable handleView={() => { }} handleEdit={() => { }} />);
    const input = screen.getByPlaceholderText(/search for loans/i);
    fireEvent.change(input, { target: { value: "query" } });

    const btn = screen.getByRole("button", { name: /search/i });
    fireEvent.click(btn);

    await waitFor(() => {
      expect(mockSetSearch).toHaveBeenCalledWith("query");
    });
  });

  it("shows loading state", () => {
    mockedUseLoans.mockReturnValueOnce({ data: null, isLoading: true });

    render(<LoanApplicationsTable handleView={() => { }} handleEdit={() => { }} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows empty state when no loans", () => {
    mockedUseLoans.mockReturnValueOnce({ data: { total: 0, loans: [] }, isLoading: false });

    render(<LoanApplicationsTable handleView={() => { }} handleEdit={() => { }} />);
    expect(screen.getByText("No records found")).toBeInTheDocument();
  });

  // -- TableRow tests --
  it("calls callbacks from row clicks", () => {
    const onSelect = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <table>
        <tbody>
          <TableRow rowData={mockLoans[0]} onSelect={onSelect} onEdit={onEdit} onDelete={onDelete} />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByText("loan1"));
    expect(onSelect).toHaveBeenCalledWith("loan1");

    fireEvent.click(screen.getByText("Edit"));
    expect(onEdit).toHaveBeenCalledWith("loan1");

    // Stub confirm dialog
    global.confirm = () => true;
    fireEvent.click(screen.getByText("Delete"));
    expect(onDelete).toHaveBeenCalledWith("loan1");
  });

  // -- TablePagination tests --
  it("pagination renders correctly and navigates pages", () => {
    render(
      <TablePagination page={2} pageSize={10} total={30} totalPages={3} setPage={mockSetPage} />
    );

    const el = screen.getByLabelText("pagination-range");
    console.log(el.textContent)
    expect(el).toHaveTextContent("Showing 11 to 20 of 30");

    fireEvent.click(screen.getByText("Prev"));
    expect(mockSetPage).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText("3"));
    expect(mockSetPage).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByText("Next"));
    expect(mockSetPage).toHaveBeenCalledWith(3);
  });
});
