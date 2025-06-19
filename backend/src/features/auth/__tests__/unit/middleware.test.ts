import type { Response as ExpressResponse } from "express";
import { decodeAccessToken, authenticate, authorizeAdmin } from "../../middleware.ts";
import { verifyAccessToken } from "../../tokens.ts";
import { normalizeTokenPayloadToUser } from "../../utils.ts";
import type { AuthenticatedRequest } from "../../types.ts";

jest.mock("../../tokens.ts", () => ({
  verifyAccessToken: jest.fn(),
}));

jest.mock("../../utils.ts", () => ({
  normalizeTokenPayloadToUser: jest.fn(),
}));

export const mockReq = (props: Partial<AuthenticatedRequest> = {}): AuthenticatedRequest => {
  return {
    signedCookies: {},
    ...props,
  } as AuthenticatedRequest;
};

export const mockRes = (): jest.Mocked<ExpressResponse> => {
  const res = {
    sendStatus: jest.fn(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    clearCookie: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
    get: jest.fn(),
    set: jest.fn(),
    end: jest.fn(),
  };

  return res as unknown as jest.Mocked<ExpressResponse>;
};

const mockNext = () => jest.fn();

describe("middleware", () => {
  describe("decodeAccessToken", () => {
    it("does nothing if no token", () => {
      const req = mockReq();
      const res = mockRes();
      const next = mockNext();

      decodeAccessToken(req, res, next);

      expect(verifyAccessToken).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    it("sets user if token is valid", () => {
      const payload = { id: "123" };
      (verifyAccessToken as jest.Mock).mockReturnValue(payload);

      const req = mockReq({ signedCookies: { access_token: "valid" } });
      const res = mockRes();
      const next = mockNext();

      decodeAccessToken(req, res, next);

      expect(req.user).toEqual(payload);
      expect(next).toHaveBeenCalled();
    });

    it("ignores error if token is invalid", () => {
      (verifyAccessToken as jest.Mock).mockImplementation(() => {
        throw new Error("Invalid");
      });

      const req = mockReq({ signedCookies: { access_token: "bad" } });
      const res = mockRes();
      const next = mockNext();

      decodeAccessToken(req, res, next);

      expect(req.user).toBeUndefined();
      expect(next).toHaveBeenCalled();
    });
  });

  describe("authenticate", () => {
    it("returns 401 if no token", () => {
      const req = mockReq();
      const res = mockRes();
      const next = mockNext();

      authenticate(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    it("sets user and calls next on valid token", () => {
      const payload = { id: "123", role: "user" };
      const normalized = { ...payload, fullName: "Jane" };

      (verifyAccessToken as jest.Mock).mockReturnValue(payload);
      (normalizeTokenPayloadToUser as jest.Mock).mockReturnValue(normalized);

      const req = mockReq({ signedCookies: { access_token: "token" } });
      const res = mockRes();
      const next = mockNext();

      authenticate(req, res, next);

      expect(req.user).toEqual(normalized);
      expect(next).toHaveBeenCalled();
    });

    it("returns 401 if token is invalid", () => {
      (verifyAccessToken as jest.Mock).mockImplementation(() => {
        throw new Error("fail");
      });

      const req = mockReq({ signedCookies: { access_token: "bad" } });
      const res = mockRes();
      const next = mockNext();

      authenticate(req, res, next);

      expect(res.sendStatus).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("authorizeAdmin", () => {
    it("returns 403 if role is not admin", () => {
      const req = mockReq({
        user: {
          role: "user",
          id: "",
          email: ""
        }
      });
      const res = mockRes();
      const next = mockNext();

      authorizeAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "Forbidden request." });
      expect(next).not.toHaveBeenCalled();
    });

    it("calls next if role is admin", () => {
      const req = mockReq({
        user: {
          role: "admin",
          id: "",
          email: ""
        }
      });
      const res = mockRes();
      const next = mockNext();

      authorizeAdmin(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
