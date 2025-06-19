import { render, screen, fireEvent } from "@testing-library/react";
import Layout from "@/app/layout";
import { vi } from "vitest";

vi.mock("@/features/auth/store", () => ({
  useAuthStore: vi.fn(),
}));

vi.mock("@/features/auth/hooks/useAuth", () => ({
  useLogout: vi.fn(),
}));

import { useAuthStore } from "@/features/auth/store";
import { useLogout } from "@/features/auth/hooks/useAuth";

describe("<Layout />", () => {
  const children = <div>Child Content</div>;

  beforeEach(() => {
    // Always provide a valid mock shape for useLogout
    (useLogout as any).mockReturnValue({ mutate: vi.fn() });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders children when not authenticated", () => {
    (useAuthStore as any).mockReturnValue({ isAuthenticated: false });

    render(<Layout>{children}</Layout>);
    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /logout/i })).not.toBeInTheDocument();
  });

  it("renders children and logout button when authenticated", () => {
    (useAuthStore as any).mockReturnValue({ isAuthenticated: true });

    render(<Layout>{children}</Layout>);
    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("calls logout when logout button is clicked", () => {
    const logoutMock = vi.fn();
    (useAuthStore as any).mockReturnValue({ isAuthenticated: true });
    (useLogout as any).mockReturnValue({ mutate: logoutMock });

    render(<Layout>{children}</Layout>);
    const logoutBtn = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutBtn);

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
