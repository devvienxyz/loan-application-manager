module.exports = {
  displayName: "integration",
  testMatch: ["<rootDir>/src/**/__tests__/integration/**/*.test.ts"],
  testEnvironment: "node",
  preset: "ts-jest",
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@loan-app-mgr/shared/(.*)$": "<rootDir>/../shared/src/$1"
  },
};
