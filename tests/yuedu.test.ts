import puppeteer from 'puppeteer';

const iPhone6 = puppeteer.devices['iPhone 6'];

beforeAll(async () => {
  await page.emulate(iPhone6);
  await page.goto('https://m.yuedu.163.com');
});

it('yuedu home page', async () => {
  const image = await page.screenshot();
  expect(image).toMatchImageSnapshot();
});
