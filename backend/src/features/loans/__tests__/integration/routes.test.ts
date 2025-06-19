import request from "supertest";
import express from "express";
import loanRoutes from "@/features/loans/routes.ts";
import * as authMiddleware from "@/features/auth/middleware.ts";

const app = express();
app.use(express.json());

// Overrides middleware behavior
jest.mock("@/features/auth/middleware", () => ({
  authenticate: jest.fn((req, _res, next) => {
    req.user = { id: "u1", role: "user" };
    next();
  }),
  authorizeAdmin: jest.fn((req, res, next) => {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden request." });
    }
    next();
  }),
}));

app.use("/loans", loanRoutes);

describe("Loan Routes Access Control", () => {
  afterEach(() => jest.clearAllMocks());

  describe("Authenticated-only routes", () => {
    it("GET /loans - should allow authenticated users", async () => {
      const res = await request(app).get("/loans");
      expect(res.status).not.toBe(401);
    });

    it("POST /loans/apply - should allow authenticated users", async () => {
      const res = await request(app).post("/loans/apply").send({ amount: 1000, purpose: "test" });
      expect(res.status).not.toBe(401);
    });

    it("GET /loans/:loanId - should allow authenticated users", async () => {
      const res = await request(app).get("/loans/123");
      expect(res.status).not.toBe(401);
    });
  });

  describe("Admin-only routes", () => {
    it("PATCH /loans/:loanId - should block non-admins", async () => {
      const res = await request(app).patch("/loans/123").send({ status: "approved" });
      expect(res.status).toBe(403);
      expect(res.body.message).toBe("Forbidden request.");
    });

    it("DELETE /loans/:loanId - should block non-admins", async () => {
      const res = await request(app).delete("/loans/123");
      expect(res.status).toBe(403);
    });

    it("PATCH /loans/:loanId - should allow admin", async () => {
      (authMiddleware.authenticate as jest.Mock).mockImplementation((req, _res, next) => {
        req.user = { id: "admin-1", role: "admin" };
        next();
      });

      const res = await request(app).patch("/loans/123").send({ status: "approved" });
      expect(res.status).not.toBe(403);
    });

    it("DELETE /loans/:loanId - should allow admin", async () => {
      (authMiddleware.authenticate as jest.Mock).mockImplementation((req, _res, next) => {
        req.user = { id: "admin-1", role: "admin" };
        next();
      });

      const res = await request(app).delete("/loans/123");
      expect(res.status).not.toBe(403);
    });
  });
});
