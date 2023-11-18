module.exports = {
  displayName: '',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).ts'],
  verbose: true,
  collectCoverage: true,
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/migrations/**',
    '!**/seeders/**',
    '!**/node_modules/**',
    '!**/babel.config.ts',
    '!**/jest.setup.ts',
    '!**/dist/**',
  ],
};
