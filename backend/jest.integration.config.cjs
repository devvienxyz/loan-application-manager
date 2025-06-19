module.exports = {
  displayName: "integration",
  rootDir: "./",
  testMatch: ["<rootDir>/src/**/__tests__/integration/**/*.test.ts"],
  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironment: "node",
};
