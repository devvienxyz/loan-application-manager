import * as controller from "../../controller.ts";
import { LoanService } from "../../service.ts";
import type { Request, Response } from "express";

jest.mock("../../service.ts");

const mockRes = () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  };
  return res as Response;
};

const mockReq = (props: Partial<Request> = {}) =>
({
  user: { id: "user-1", role: "user" },
  query: {},
  params: {},
  body: {},
  ...props,
} as unknown as Request);

describe("Loan Controller", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getAllUserLoans", () => {
    it("calls LoanService with correct params and returns loans", async () => {
      const req = mockReq({
        user: { id: "u1", role: "admin", email: "sample@example.com" },
        query: { page: "2", pageSize: "5", search: "home" },
      });
      const res = mockRes();

      (LoanService.getAllLoans as jest.Mock).mockResolvedValue({ loans: [], total: 0 });

      await controller.getAllUserLoans(req, res);

      expect(LoanService.getAllLoans).toHaveBeenCalledWith({
        userId: "u1",
        isAdmin: true,
        page: 2,
        pageSize: 5,
        search: "home",
      });
      expect(res.json).toHaveBeenCalledWith({ loans: [], total: 0 });
    });
  });

  describe("applyForLoan", () => {
    it("applies for loan and returns 201", async () => {
      const req = mockReq({
        user: { id: "u1", role: "user", email: "sample@example.com" },
        body: { purpose: "car", amount: 5000 },
      });
      const res = mockRes();

      const mockLoan = { id: "l1", purpose: "car", amount: 5000 };
      (LoanService.applyForLoan as jest.Mock).mockResolvedValue(mockLoan);

      await controller.applyForLoan(req, res);

      expect(LoanService.applyForLoan).toHaveBeenCalledWith("u1", {
        purpose: "car",
        amount: 5000,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockLoan);
    });
  });

  describe("getLoanDetails", () => {
    it("returns 404 if loan not found", async () => {
      const req = mockReq({ params: { loanId: "l1" } });
      const res = mockRes();

      (LoanService.getLoanById as jest.Mock).mockResolvedValue(null);

      await controller.getLoanDetails(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Loan not found" });
    });

    it("returns loan details if found", async () => {
      const req = mockReq({ params: { loanId: "l1" } });
      const res = mockRes();

      const loan = { id: "l1", purpose: "house" };
      (LoanService.getLoanById as jest.Mock).mockResolvedValue(loan);

      await controller.getLoanDetails(req, res);

      expect(res.json).toHaveBeenCalledWith(loan);
    });
  });

  describe("updateLoan", () => {
    it("updates and returns the loan", async () => {
      const req = mockReq({
        params: { loanId: "l1" },
        body: { status: "approved" },
      });
      const res = mockRes();

      const updated = { id: "l1", status: "approved" };
      (LoanService.updateLoan as jest.Mock).mockResolvedValue(updated);

      await controller.updateLoan(req, res);

      expect(LoanService.updateLoan).toHaveBeenCalledWith("l1", { status: "approved" });
      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe("deleteLoan", () => {
    it("deletes the loan and returns 204", async () => {
      const req = mockReq({ params: { loanId: "l1" } });
      const res = mockRes();

      (LoanService.deleteLoan as jest.Mock).mockResolvedValue(undefined);

      await controller.deleteLoan(req, res);

      expect(LoanService.deleteLoan).toHaveBeenCalledWith("l1");
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
