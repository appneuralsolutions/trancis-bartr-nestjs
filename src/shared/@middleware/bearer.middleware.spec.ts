import { BearerMiddleware } from './bearer.middleware';

describe('BearerMiddleware', () => {
  it('should be defined', () => {
    expect(new BearerMiddleware()).toBeDefined();
  });
});
