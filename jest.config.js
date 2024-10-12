const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@heroicons/react)/)',
  ],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
}

module.exports = createJestConfig(customJestConfig)