import { PriceRule } from '../src/price-rule';
import { Decimal } from 'decimal.js';

describe('PriceRule class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const priceRule = new PriceRule();

      expect(typeof priceRule).not.toEqual('undefined');
      expect(priceRule instanceof PriceRule).toBe(true);
    });
  });
});
