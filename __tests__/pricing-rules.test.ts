import { PricingRules } from '../src/pricing-rules';

describe('PricingRules class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const pricingRules = new PricingRules();

      expect(typeof pricingRules).not.toEqual('undefined');
      expect(pricingRules instanceof PricingRules).toBe(true);
    });
  });
});
