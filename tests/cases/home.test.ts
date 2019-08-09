import { goto } from '../utils';

const pageUrl = '/';

test('首页全屏预览', async () => {
  await goto(pageUrl);
  expect(await page.screenshot({ fullPage: true })).toMatchImageSnapshot();
});

test('点击女频分类', async () => {
  await expect(page).toClick('.menu li a', { text: '女频' });
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  expect(await page.screenshot({ fullPage: true })).toMatchImageSnapshot();
});
