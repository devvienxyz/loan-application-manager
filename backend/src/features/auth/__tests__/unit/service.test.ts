import bcrypt from "bcryptjs";
import { UserRepository } from "../../repository.ts";
import { createUser, validateUser } from "../../service.ts";

jest.mock("../../repository.ts", () => ({
  UserRepository: {
    findByEmail: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));


describe("Auth Service", () => {
  const mockUser = {
    id: "1",
    email: "test@example.com",
    password: "hashed",
    fullName: "Test User",
    role: "user",
  };

  describe("validateUser", () => {
    it("returns null if user not found", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      const result = await validateUser("no@user.com", "pass");
      expect(result).toBeNull();
    });

    it("returns null if password doesn't match", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await validateUser(mockUser.email, "wrongpass");
      expect(result).toBeNull();
    });

    it("returns user if credentials are valid", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await validateUser(mockUser.email, "correctpass");

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        fullName: mockUser.fullName,
        role: "user",
      });
    });
  });

  describe("createUser", () => {
    it("throws error if email already exists", async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);

      await expect(createUser("Name", mockUser.email, "password"))
        .rejects
        .toThrow("Email already in use");
    });

    it("creates and returns new user if email not taken", async () => {
      const hashed = "hashed_password";
      const createdUser = { ...mockUser, password: hashed };

      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashed);
      (UserRepository.create as jest.Mock).mockResolvedValue(createdUser);

      const result = await createUser(mockUser.fullName, mockUser.email, "plain");

      expect(result).toEqual({
        id: mockUser.id,
        email: mockUser.email,
        fullName: mockUser.fullName,
        role: "user",
      });

      expect(UserRepository.create).toHaveBeenCalledWith({
        fullName: mockUser.fullName,
        email: mockUser.email,
        password: hashed,
        role: "user",
      });
    });
  });
});
