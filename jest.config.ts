// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pathsToModuleNameMapper } = require('ts-jest/utils');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { compilerOptions } = require('./tsconfig');

module.exports = {

  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  collectCoverageFrom: [
    'src/modules/**/services/**/*.ts',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json',
    'lcov',
  ],

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),

  preset: '@shelf/jest-mongodb',

  testEnvironment: 'node',

  setupFiles: [
    '<rootDir>/src/shared/tests/setupTests.ts',
  ],

  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
  ],

  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
