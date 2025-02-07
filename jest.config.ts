export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.module\\.css$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    '**/*.tsx',
    '!**/node_modules/**',
    '!**/*.test.tsx',
    '!**/*.spec.tsx',
    '!src/__tests__/setup.ts',
  ],
  coverageReporters: ['text', 'lcov'],
};
