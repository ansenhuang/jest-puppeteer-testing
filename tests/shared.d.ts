/// <reference types="node" />
/// <reference types="puppeteer" />

import { URL } from 'url';
import { Request, RespondOptions } from 'puppeteer';

interface MockRespondOptions extends RespondOptions {
  body?: any;
}

type MockRespondFunction = (params: {
  location: URL;
  request: Request;
  interceptor: any;
}) => MockRespondOptions | void;

declare global {
  interface MockAPI {
    [api: string]: MockRespondOptions | MockRespondFunction;
  }
}
