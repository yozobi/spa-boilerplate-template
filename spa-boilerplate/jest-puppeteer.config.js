module.exports = {
  server: {
    command: `OPEN_BROWSER=false yarn start:app`,
    port: 3000,
    launchTimeout: 5000,
  },
  launch: process.env.PUPPETEER_HEADED
    ? {
        headless: false,
        slowMo: 150,
      }
    : undefined,
};
