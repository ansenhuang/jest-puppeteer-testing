/// <reference types="jest" />

declare namespace jest {
  interface Matchers<R> {
    toMatchImageSnapshot(options?: Object): R;
  }
}
