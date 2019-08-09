const puppeteer = require('puppeteer');

module.exports = {
  launch: {
    defaultViewport: puppeteer.devices['iPhone 6'].viewport,
  },
};
