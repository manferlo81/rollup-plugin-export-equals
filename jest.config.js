const CI = process.env.CI;
const threshold = 60;

module.exports = {

  testEnvironment: "node",
  browser: false,

  cacheDirectory: "node_modules/.cache/jest",

  preset: "ts-jest",

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    CI ? "json" : "lcov",
    "text",
    "text-summary",
  ],
  coverageThreshold: {
    global: {
      branches: threshold,
      functions: threshold,
      lines: threshold,
      statements: threshold,
    },
  },

  verbose: true,

};
