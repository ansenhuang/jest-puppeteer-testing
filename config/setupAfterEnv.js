require('expect-puppeteer');
const {
  toMatchImageSnapshot,
  configureToMatchImageSnapshot,
} = require('jest-image-snapshot');

configureToMatchImageSnapshot({
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
});
expect.extend({ toMatchImageSnapshot });
