import { URL } from 'url';
import { Request } from 'puppeteer';
import mocks from '../mocks';

// 设置请求拦截器的数据，用于同一请求返回不同结果，生效一次后自动销毁
export const interceptors: { [api: string]: any } = {};
export const setRequestInterceptor = (api: string, value: any) => {
  interceptors[api] = value;
};

export const onRequestInterceptor = (request: Request) => {
  const resourceType = request.resourceType();
  if (resourceType === 'xhr' || resourceType === 'fetch') {
    const location = new URL(request.url());
    const mockKey = location.pathname;
    if (mockKey && mocks.hasOwnProperty(mockKey)) {
      const mock = mocks[mockKey];
      let response: any;
      if (typeof mock === 'function') {
        response = mock({ location, request, interceptor: interceptors[mockKey] });
        delete interceptors[mockKey]; // 生效一次后自动销毁
      } else {
        response = mock;
      }
      if (response) {
        if (response.body != null && typeof response.body === 'object') {
          response.body = JSON.stringify(response.body);
        }
        request.respond(response);
      }
    } else {
      request.continue();
    }
  } else {
    request.continue();
  }
};
