import { onRequestInterceptor } from '../utils/request';

jest.setTimeout(30000);

beforeAll(async () => {
  page.on('request', onRequestInterceptor); // 拦截请求，使用代理数据
  await page.setRequestInterception(true);
});
