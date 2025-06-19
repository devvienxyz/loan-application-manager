import request from "supertest";
import app from "@/app.ts";
import prisma from "@/lib/prisma.ts"

jest.mock("@/lib/prisma.ts", () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
    loanApplication: {
      findMany: jest.fn(),
      count: jest.fn().mockResolvedValue(0),
    },
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue("$2a$12$hashedpassword"),
}));

const user = {
  id: "user-id-123",
  fullName: "Jane Doe",
  email: "jane@example.com",
  password: "$2a$12$hashedpassword",
  role: "user",
};

// service layer integ testing / controller-service integration
describe("Auth Integration - Mocked DB", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should sign up a user", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue(user);

    const res = await request(app).post("/auth/signup").send({
      fullName: user.fullName,
      email: user.email,
      password: "secure123",
    });

    expect(res.status).toBe(201);
    expect(res.body.user).toMatchObject({
      fullName: user.fullName,
      role: user.role
    });
  });

  it("should login user and set cookies", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

    const res = await request(app).post("/auth/login").send({
      email: user.email,
      password: "secure123",
    });

    expect(res.status).toBe(200);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should block protected route without token", async () => {
    const res = await request(app).get("/loans");
    expect(res.status).toBe(401);
  });

  it("should access protected route with valid token", async () => {
    // Mock user and JWT verification
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
    (prisma.loanApplication.findMany as jest.Mock).mockResolvedValue([
      {
        id: "loan-id-123",
        purpose: "PERSONAL",
        amount: 1000,
        status: "APPROVED",
        createdAt: new Date(),
        userId: user.id,
      },
    ]);

    const loginRes = await request(app).post("/auth/login").send({
      email: user.email,
      password: "secure123",
    });

    const cookie = loginRes.headers["set-cookie"];
    const res = await request(app).get("/loans").set("Cookie", cookie);
    console.log(res.body)

    expect(res.status).toBe(200);
  });
});
