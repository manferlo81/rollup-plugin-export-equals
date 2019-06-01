const CI = process.env.CI;
const threshold = 60;

module.exports = {

  testEnvironment: "node",

  cacheDirectory: ".cache/jest",

  collectCoverage: true,
  collectCoverageFrom: [
    "dist/**",
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
