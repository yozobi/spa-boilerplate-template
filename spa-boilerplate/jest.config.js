module.exports = {
  testRegex: './*\\.test\\.(tsx|ts)$',
  setupFiles: ['<rootDir>/src/utils/setupTests.js'],
  setupFilesAfterEnv: ['<rootDir>/src/utils/setupTestsAfterEnv.js'],
  testEnvironment: 'jest-environment-jsdom-sixteen',
};
