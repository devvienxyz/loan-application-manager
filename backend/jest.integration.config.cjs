module.exports = {
  displayName: "integration",
  rootDir: "./",
  testMatch: ["<rootDir>/src/**/__tests__/integration/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node",
};
