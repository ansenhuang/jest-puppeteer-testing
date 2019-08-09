import fs from 'fs';

const mock: MockAPI = fs.readdirSync(__dirname).reduce((obj, curr) => {
  if (curr !== 'index.ts') {
    Object.assign(obj, require('./' + curr).default);
  }
  return obj;
}, {});

export default mock;
