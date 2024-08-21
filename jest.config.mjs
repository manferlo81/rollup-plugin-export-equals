const threshold = 60;

/** @type { import("jest").Config } */
const config = {
  cacheDirectory: 'node_modules/.cache/jest',
  preset: 'ts-jest',

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    process.env.CI ? 'json' : 'html',
    'text',
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

export default config;
