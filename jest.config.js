module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js'],
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      extends: './babel.config.js',
    },
  },
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: [
    '<rootDir>/config/setupAfterEnv.js',
  ],
};
