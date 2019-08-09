const api: MockAPI = {
  // 打点请求
  '/track/w/': ({ location, request }) => {
    if (location.hostname === 'hubble.netease.com') {
      return {
        status: 200,
      };
    } else {
      // 若不是打点请求，则返回原来的请求结果
      request.continue();
    }
  },
  // 底部引导配置
  '/config.json': {
    status: 200,
    contentType: 'application/json',
    body: {
      successful: true,
      error: null,
      code: 0,
      data: {
        floatItems: [
          { type: 1, value: '每天都有阅点领，免费就能看好书' },
          { type: 1, value: '网易出品，看不累的阅读神器' },
          { type: 1, value: '作者亲密互动，和大神零距离！' },
        ],
      },
      html: null,
    },
  },
};

export default api;
