module.exports = {
  displayName: "unit",
  testMatch: ["<rootDir>/src/**/__tests__/unit/**/*.test.ts"],
  testEnvironment: "node",
  preset: "ts-jest",
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@loan-app-mgr/shared/(.*)$": "<rootDir>/../shared/src/$1"
  },
};
