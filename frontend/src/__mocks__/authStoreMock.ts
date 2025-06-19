export const mockAuthState = {
  isAuthenticated: false,
  user: null,
  login: vi.fn(),
  logout: vi.fn(),
  setUser: vi.fn()
};

vi.mock("@/features/auth/store", () => ({
  useAuthStore: vi.fn()
}));
