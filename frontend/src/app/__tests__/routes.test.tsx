import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import AppRoutes, { PublicRoute, ProtectedRoute } from "@/app/routes";
import { useAuthStore } from "@/features/auth/store";

vi.mock("@/features/auth/store");

describe("Route guards", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("PublicRoute redirects to /loans when authenticated", () => {
    vi.mocked(useAuthStore).mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<div>Public</div>} />
          </Route>
          <Route path="/loans" element={<div>Loans</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Loans")).toBeInTheDocument();
  });

  test("ProtectedRoute redirects to / when unauthenticated", async () => {
    vi.mocked(useAuthStore).mockImplementation(selector =>
      selector({
        isAuthenticated: false,
        user: null,
        login: vi.fn(),
        logout: vi.fn(),
        setUser: vi.fn(),
      })
    );


    render(
      <MemoryRouter initialEntries={["/loans"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/loans" element={<div>Protected</div>} />
          </Route>
          <Route path="/" element={<div>Public</div>} />
        </Routes>
      </MemoryRouter>
    );

    await expect(screen.findByText(/Public/i)).resolves.toBeInTheDocument();
  });

  test("renders NotFound on unknown route", () => {
    vi.mocked(useAuthStore).mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
