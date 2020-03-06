module.exports = {
  preset: 'jest-puppeteer',
  testRegex: './*\\.e2e\\.tsx$',
  setupFiles: ['<rootDir>/src/utils/setupTests.js'],
  setupFilesAfterEnv: ['<rootDir>/src/utils/setupTestsAfterEnv.js'],
};
