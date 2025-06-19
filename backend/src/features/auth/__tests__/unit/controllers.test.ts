import { signup, login, refresh, logout } from "../../controller.ts";
import * as service from "../../service.ts";
import * as tokens from "../../tokens.ts";
import * as utils from "../../utils.ts";

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};

const nextMock = jest.fn();

beforeEach(jest.clearAllMocks);

describe("Auth Controller", () => {
  describe("signup", () => {
    it("should return 400 if missing fields", async () => {
      const req = { body: { email: "", password: "", fullName: "" } } as any;
      const res = mockRes();

      await signup(req, res, nextMock);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Missing fields" });
    });

    it("should create user and set cookies", async () => {
      const req = { body: { email: "test@example.com", password: "pass", fullName: "Test User" } } as any;
      const res = mockRes();
      const mockUser = { id: "1", email: "test@example.com", role: "user", fullName: "Test User" };

      jest.spyOn(service, "createUser").mockResolvedValueOnce(mockUser);
      jest.spyOn(tokens, "signAccessToken").mockReturnValue("access");
      jest.spyOn(tokens, "signRefreshToken").mockReturnValue("refresh");
      jest.spyOn(utils, "formatUserResponse").mockReturnValue({ fullName: "Test User", role: "user" });
      jest.spyOn(utils, "setAuthCookies").mockImplementation();

      await signup(req, res, nextMock);
      expect(service.createUser).toHaveBeenCalled();
      expect(utils.setAuthCookies).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("should handle user creation error", async () => {
      const req = { body: { email: "taken@example.com", password: "pass", fullName: "User" } } as any;
      const res = mockRes();

      jest.spyOn(service, "createUser").mockRejectedValueOnce(new Error("Email already in use"));

      await signup(req, res, nextMock);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Email already in use" });
    });
  });

  describe("login", () => {
    it("should return 401 if user is invalid", async () => {
      const req = { body: { email: "invalid@example.com", password: "wrong" } } as any;
      const res = mockRes();

      jest.spyOn(service, "validateUser").mockResolvedValueOnce(null);

      await login(req, res, nextMock);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it("should login and set cookies", async () => {
      const req = { body: { email: "valid@example.com", password: "correct" } } as any;
      const res = mockRes();
      const user = { id: "1", email: "valid@example.com", role: "user", fullName: "Valid User" };

      jest.spyOn(service, "validateUser").mockResolvedValueOnce(user);
      jest.spyOn(tokens, "signAccessToken").mockReturnValue("access");
      jest.spyOn(tokens, "signRefreshToken").mockReturnValue("refresh");
      jest.spyOn(utils, "setAuthCookies").mockImplementation();
      jest.spyOn(utils, "formatUserResponse").mockReturnValue({ fullName: "Valid User", role: "user" });

      await login(req, res, nextMock);
      expect(utils.setAuthCookies).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ user: { fullName: "Valid User", role: "user" } });
    });
  });

  describe("refresh", () => {
    it("should return 401 if no refresh token", () => {
      const req = { signedCookies: {} } as any;
      const res = mockRes();

      refresh(req, res, nextMock);
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it("should verify token and refresh access token", () => {
      const req = { signedCookies: { refresh_token: "valid.refresh.token" } } as any;
      const res = mockRes();

      const payload = { id: "1", email: "user@example.com", role: "user", fullName: "User" };

      jest.spyOn(tokens, "verifyRefreshToken").mockReturnValue(payload);
      jest.spyOn(tokens, "signAccessToken").mockReturnValue("new.access.token");
      jest.spyOn(utils, "setAuthCookies").mockImplementation();

      refresh(req, res, nextMock);
      expect(tokens.verifyRefreshToken).toHaveBeenCalled();
      expect(utils.setAuthCookies).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Token refreshed" });
    });

    it("should return 401 on invalid token", () => {
      const req = { signedCookies: { refresh_token: "invalid" } } as any;
      const res = mockRes();

      jest.spyOn(tokens, "verifyRefreshToken").mockImplementation(() => {
        throw new Error("Invalid token");
      });

      refresh(req, res, nextMock);
      expect(res.sendStatus).toHaveBeenCalledWith(401);
    });
  });

  describe("logout", () => {
    it("should clear cookies and return 204", () => {
      const req = {} as any;
      const res = mockRes();

      logout(req, res);
      expect(res.clearCookie).toHaveBeenCalledWith("access_token");
      expect(res.clearCookie).toHaveBeenCalledWith("refresh_token");
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
