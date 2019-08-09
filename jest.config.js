module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js'],
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: [
    'expect-puppeteer',
    '<rootDir>/tests/setup/expect-image-snapshot.ts',
    '<rootDir>/tests/setup/enhance-puppeteer.ts',
  ],
};
