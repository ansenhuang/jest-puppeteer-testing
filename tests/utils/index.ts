import { DirectNavigationOptions, Target } from 'puppeteer';
export { setRequestInterceptor } from './request';

const domain = 'https://m.yuedu.163.com';

// 等待一段时间
export const wait = (timeout: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

// 打开网页
export const goto = (url: string, options?: DirectNavigationOptions) => {
  if (url.startsWith('/')) {
    url = domain + url;
  }
  return page.goto(url, options || { waitUntil: 'networkidle0' });
};

// 固定本地时间，保持页面渲染的一致性
export const mockDate = (value: string | number) => {
  const listener = async (target: Target) => {
    browser.off('targetchanged', listener);

    const targetPage = await target.page();
    const client = await targetPage.target().createCDPSession();
    await client.send('Runtime.evaluate', {
      expression: `
        var d = new Date(${JSON.stringify(value)});
        Date = class extends Date {
          constructor(a) {
            super(a);
            if (!a) {
              return d;
            }
          }
        };
        Date.now = function() {
          return d.getTime();
        };
      `,
    });
  };
  browser.on('targetchanged', listener);
};

// 获取节点所在的位置
export const getClip = async (selector: string, index: number = 0) => {
  const result = await page.evaluate(
    (a, b) => {
      let el;
      if (b === 0) {
        el = document.querySelector(a);
      } else {
        el = document.querySelectorAll(a)[b];
      }
      if (el) {
        const offset = { x: 0, y: 0, width: el.offsetWidth, height: el.offsetHeight };
        while (el) {
          offset.y += el.offsetTop;
          offset.x += el.offsetLeft;
          el = el.offsetParent;
        }
        return JSON.stringify(offset);
      }
      return null;
    },
    selector,
    index,
  );
  if (result) {
    return JSON.parse(result);
  }
  return null;
};

// 滚动到节点所在的位置
export const scrollTo = (selector: string | number, index: number = 0) => {
  return page.evaluate(
    (a, b) => {
      if (typeof a === 'string') {
        let el;
        if (b === 0) {
          el = document.querySelector(a);
        } else {
          el = document.querySelectorAll(a)[b];
        }
        if (el) {
          document.documentElement.scrollTop += el.getBoundingClientRect().top;
        }
      } else {
        document.documentElement.scrollTop = a;
      }
    },
    selector,
    index,
  );
};
