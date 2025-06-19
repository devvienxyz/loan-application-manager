module.exports = {
  displayName: "unit",
  testMatch: ["<rootDir>/src/**/__tests__/unit/**/*.test.ts"],
  testEnvironment: "node",
  preset: "ts-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@loan-app-mgr/shared/(.*)$": "<rootDir>/../shared/src/$1"
  },
};
