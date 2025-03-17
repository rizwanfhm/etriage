// import type { Config } from 'jest';

// const config: Config = {
//   preset: 'ts-jest/presets/default-esm', // Use the ESM preset
//   testEnvironment: 'node',
//   moduleFileExtensions: ['ts', 'js', 'mjs'],
//   testMatch: ['**/__tests__/**/*.test.ts'],
//   transform: {
//     '^.+\\.ts$': 'ts-jest',
//     '^.+\\.mjs$': 'ts-jest', // Transform .mjs files
//   },
//   extensionsToTreatAsEsm: ['.ts'], // Treat .ts files as ES modules
//   globals: {
//     'ts-jest': {
//       useESM: true, // Enable ESM support in ts-jest
//     },
//   },
// };

// export default config;

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testMatch: [
    '**/*.spec.ts',          // All .spec.ts files
    '**/*.test.ts',          // All .test.ts files
    '**/__tests__/**/*.ts'  // Tests in __tests__ directories
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/node_modules',
    '<rootDir>/coverage'
  ],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.d.ts',           // Exclude TypeScript declaration files
    '!**/__mocks__/**',     // Exclude mock directories
    '!**/__fixtures__/**'   // Exclude test fixtures
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['lcov', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  moduleNameMapper: {
    // '@/(.*)': '<rootDir>/src/$1',
    '@/(.*)': '<rootDir>/$1',
    '^src/(.*)': '<rootDir>/src/$1'
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      diagnostics: {
        ignoreCodes: [151001] // Ignore "file is a module" warning
      }
    }
  },
  verbose: true,
  detectOpenHandles: true,  // Catch asynchronous operations that prevent cleanup
  forceExit: true           // Force Jest to exit after tests
};

export default config;