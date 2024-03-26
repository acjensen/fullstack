module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/app", "<rootDir>/cdk"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
