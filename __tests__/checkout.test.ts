import { Checkout } from '../src/checkout';

describe('Checkout class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const checkout = new Checkout();

      expect(typeof checkout).not.toEqual('undefined');
      expect(checkout instanceof Checkout).toBe(true);
    });
  });
});
