module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@loan-app-mgr/shared/(.*)$": "<rootDir>/../shared/src/$1"
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json", // Point to the backend"s tsconfig
    },
  },
  moduleDirectories: ["node_modules", "<rootDir>/node_modules", "<rootDir>/../shared/node_modules"],
  projects: [
    "<rootDir>/jest.unit.config.cjs",
    "<rootDir>/jest.integration.config.cjs"
  ],
};
