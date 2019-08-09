import { goto, setRequestInterceptor, wait } from '../utils';

const pageUrl = '/search/form.do';

test('搜索页全屏预览', async () => {
  await goto(pageUrl);
  expect(await page.screenshot({ fullPage: true })).toMatchImageSnapshot();
});

test('填写搜索关键词', async () => {
  await expect(page).toFill('.inner input[type=search]', '爱');
  await page.waitForResponse((response) => {
    return response.url().includes('/search/hints.do');
  });
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('点击搜索按钮', async () => {
  await expect(page).toClick('.inner button', { text: '搜索' });
  await page.waitForResponse((response) => {
    return response.url().includes('/search/book/data.json');
  });
  await wait(1000); // 等待图片资源加载完成
  expect(await page.screenshot({ fullPage: true })).toMatchImageSnapshot();
});

test('填写搜索关键词（无结果）', async () => {
  await expect(page).toFill('.inner input[type=search]', '');
  setRequestInterceptor('/search/hints.do', 'none'); // 自定义请求数据
  await expect(page).toFill('.inner input[type=search]', '无');
  await page.waitForResponse((response) => {
    return response.url().includes('/search/hints.do');
  });
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('点击搜索按钮（无结果）', async () => {
  setRequestInterceptor('/search/book/data.json', 'none'); // 自定义请求数据
  await expect(page).toClick('.inner button', { text: '搜索' });
  await page.waitForResponse((response) => {
    return response.url().includes('/search/book/data.json');
  });
  expect(await page.screenshot({ fullPage: true })).toMatchImageSnapshot();
});
