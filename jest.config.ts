import type { Config } from '@jest/types';

const config: Config.InitialOptions = {

  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: false,
  testPathIgnorePatterns: ['/node_modules'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testMatch: ['<rootDir>/src/**/test/*.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/test/*.ts?(x)', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  },
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: {
    '@bootstrap/(.*)': ['<rootDir>/src/bootstrap/$1'],
    '@configs/(.*)': ['<rootDir>/src/configs/$1'],
    '@auth/(.*)': ['<rootDir>/src/features/auth/$1'],
    '@patient/(.*)': ['<rootDir>/src/features/patient/$1'],
    '@interfaces/(.*)': ['<rootDir>/src/interfaces/$1'],
    '@decorators/(.*)': ['<rootDir>/src/shared/globals/decorators/$1'],
    '@helpers/(.*)': ['<rootDir>/src/shared/globals/helpers/$1'],
    '@services/(.*)': ['<rootDir>/src/shared/globals/services/$1'],
    '@root/(.*)': ['<rootDir>/src/$1'],
  }
};

export default config;