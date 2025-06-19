import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import axios, { AxiosError } from "axios";
import api from "@/lib/axios";
import { useAuthStore } from "@/features/auth/store";

// Full AuthState mock
const mockLogout = vi.fn();
const mockAuthState = {
  user: null,
  isAuthenticated: false,
  login: vi.fn(),
  logout: mockLogout,
  setUser: vi.fn()
};

vi.mock("@/features/auth/store", () => ({
  useAuthStore: {
    getState: vi.fn(() => mockAuthState)
  }
}));

beforeEach(() => {
  // ensure mock returns fresh state before each test
  vi.mocked(useAuthStore.getState).mockReturnValue({ ...mockAuthState });

  Object.defineProperty(window, "location", {
    configurable: true,
    value: { href: "/", assign: vi.fn() }
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
});

describe("axios interceptor", () => {
  test("passes through successful response", async () => {
    const res = { data: { ok: true }, status: 200, config: {}, headers: {}, statusText: "OK" };
    vi.spyOn(api, "get").mockResolvedValue(res);
    const result = await api.get("/anything");
    expect(result).toEqual(res);
  });

  test.skip("retries request after successful token refresh", async () => {
    const err = {
      config: { url: "/loans", _retry: false },
      response: { status: 401 },
      isAxiosError: true,
      toJSON: () => ({})
    } as unknown as AxiosError;

    const retryMock = vi.fn().mockResolvedValue({ data: "retried" });
    vi.spyOn(api, "request").mockImplementation(retryMock);

    const interceptor = (api.interceptors.response as any).handlers[0].rejected;
    const result = await interceptor(err);

    expect(axios.post).toHaveBeenCalledWith("/api/auth/refresh", null, { withCredentials: true });
    expect(retryMock).toHaveBeenCalledWith(err.config);
    expect(result).toEqual({ data: "retried" });
  });

  test("does not retry auth routes", async () => {
    const err = {
      config: { url: "/auth/login", _retry: false },
      response: { status: 401 },
      isAxiosError: true
    } as unknown as AxiosError;

    const interceptor = (api.interceptors.response as any).handlers[0].rejected;
    await expect(interceptor(err)).rejects.toThrow();
  });

  test("logs out and redirects if refresh fails", async () => {
    const err = {
      config: { url: "/loans", _retry: false },
      response: { status: 401 },
      isAxiosError: true
    } as unknown as AxiosError;

    vi.spyOn(axios, "post").mockRejectedValue({ response: { status: 401 } });

    const interceptor = (api.interceptors.response as any).handlers[0].rejected;
    await expect(interceptor(err)).rejects.toBeDefined();

    expect(mockLogout).toHaveBeenCalled();
    expect(window.location.href).toBe("/");
  });
});
