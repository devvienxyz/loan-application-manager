import jwt from "jsonwebtoken";
import * as tokens from "../../tokens.ts";
import type { AuthTokenPayload } from "@loan-app-mgr/shared/types/auth";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

jest.mock("@/config.ts", () => ({
  getConfig: () => ({
    accessTokenSecret: "test-access-secret",
    refreshTokenSecret: "test-refresh-secret",
  }),
}));

const payload: AuthTokenPayload = {
  id: "user-id",
  email: "test@example.com",
  role: "user",
  fullName: "Test User",
  iat: 123,
  exp: 456,
};

describe("tokens", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("signAccessToken", () => {
    it("calls jwt.sign with correct args for access token", () => {
      (jwt.sign as jest.Mock).mockReturnValue("signed-access-token");

      const token = tokens.signAccessToken(payload);

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: payload.id,
          email: payload.email,
          role: payload.role,
          fullName: payload.fullName,
        },
        "test-access-secret",
        { expiresIn: "15m" }
      );
      expect(token).toBe("signed-access-token");
    });
  });

  describe("signRefreshToken", () => {
    it("calls jwt.sign with correct args for refresh token", () => {
      (jwt.sign as jest.Mock).mockReturnValue("signed-refresh-token");

      const token = tokens.signRefreshToken(payload);

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: payload.id,
          email: payload.email,
          role: payload.role,
          fullName: payload.fullName,
        },
        "test-refresh-secret",
        { expiresIn: "7d" }
      );
      expect(token).toBe("signed-refresh-token");
    });
  });

  describe("verifyAccessToken", () => {
    it("calls jwt.verify with correct args for access token", () => {
      (jwt.verify as jest.Mock).mockReturnValue(payload);

      const result = tokens.verifyAccessToken("access-token");

      expect(jwt.verify).toHaveBeenCalledWith("access-token", "test-access-secret");
      expect(result).toBe(payload);
    });
  });

  describe("verifyRefreshToken", () => {
    it("calls jwt.verify with correct args for refresh token", () => {
      (jwt.verify as jest.Mock).mockReturnValue(payload);

      const result = tokens.verifyRefreshToken("refresh-token");

      expect(jwt.verify).toHaveBeenCalledWith("refresh-token", "test-refresh-secret");
      expect(result).toBe(payload);
    });
  });
});
