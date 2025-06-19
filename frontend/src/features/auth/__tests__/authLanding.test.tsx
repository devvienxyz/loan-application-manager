import { render, screen, fireEvent } from "@testing-library/react";
import AuthLanding from "@/features/auth/pages/landing";
import { useLogin, useRegister } from "@/features/auth/hooks/useAuth";
import { useFormMutationHandler } from "@/app/hooks/useMutationHandler";

vi.mock("@/features/auth/hooks/useAuth");
vi.mock("@/app/hooks/useMutationHandler");

describe("AuthLanding", () => {
  const mutateMock = vi.fn();
  const getMutationOptionsMock = vi.fn().mockReturnValue({});

  beforeEach(() => {
    vi.mocked(useLogin).mockReturnValue({ mutate: mutateMock });
    vi.mocked(useRegister).mockReturnValue({ mutate: mutateMock });
    vi.mocked(useFormMutationHandler).mockReturnValue({ getMutationOptions: getMutationOptionsMock });
  });

  test("renders login form by default", () => {
    render(<AuthLanding />);
    expect(screen.getByText(/no account yet/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("switches to register form", () => {
    render(<AuthLanding />);
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  test("calls login mutation on submit", () => {
    render(<AuthLanding />);
    const fakeLoginData = { email: "a@a.com", password: "123456" };
    const fakeSetError = vi.fn();

    const loginForm = screen.getByRole("form");
    fireEvent.submit(loginForm, { target: { ...fakeLoginData } });

    expect(mutateMock).toHaveBeenCalled();
  });
});
