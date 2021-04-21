import { PricingRules } from '../src/pricing-rules';
import { PriceRule } from '../src/price-rule';
import { ProductType } from '../src/product-type';

describe('PricingRules class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const pricingRules = new PricingRules();

      expect(typeof pricingRules).not.toEqual('undefined');
      expect(pricingRules instanceof PricingRules).toBe(true);
    });
  });

  describe('::add()', () => {
    let pricingRules: PricingRules;

    beforeEach(() => {
      pricingRules = new PricingRules();
    });

    it('can add a single price rule', () => {
      const customerNameFixture = 'Foo Fighters';
      const productCodeFixture = ProductType.Premium;
      const priceRuleFixture = new PriceRule(customerNameFixture, productCodeFixture);

      pricingRules.add(priceRuleFixture);

      expect(pricingRules.count()).toEqual(1);
    });

    it('can add a multiple price rules', () => {
      const customerNameFixture1 = 'Nickelback';
      const productCodeFixture1 = ProductType.Premium;
      const priceRuleFixture1 = new PriceRule(customerNameFixture1, productCodeFixture1);

      const customerNameFixture2 = 'Nirvana';
      const productCodeFixture2 = ProductType.Premium;
      const priceRuleFixture2 = new PriceRule(customerNameFixture2, productCodeFixture2);

      pricingRules.add(priceRuleFixture1);
      pricingRules.add(priceRuleFixture2);

      expect(pricingRules.count()).toEqual(2);
    });

    it('can add a duplicate price rules and it will overwrite', () => {
      const customerNameFixture1 = 'Soundgarden';
      const productCodeFixture1 = ProductType.Premium;
      const priceRuleFixture1 = new PriceRule(customerNameFixture1, productCodeFixture1);

      const customerNameFixture2 = 'Soundgarden';
      const productCodeFixture2 = ProductType.Premium;
      const priceRuleFixture2 = new PriceRule(customerNameFixture2, productCodeFixture2);

      pricingRules.add(priceRuleFixture1);
      pricingRules.add(priceRuleFixture2);

      expect(pricingRules.count()).toEqual(1);
    });
  });

  describe('::find()', () => {
    let pricingRules: PricingRules;

    beforeEach(() => {
      pricingRules = new PricingRules();
    });

    it('can add a single price rule and it can be found by searching for the same thing', () => {
      const customerNameFixture = 'Public Enemy';
      const productCodeFixture = ProductType.StandOut;
      const priceRuleFixture = new PriceRule(customerNameFixture, productCodeFixture);

      pricingRules.add(priceRuleFixture);
      const result = pricingRules.find(customerNameFixture, productCodeFixture);

      expect(pricingRules.count()).toEqual(1);
      expect(result.getCustomerName()).toEqual(priceRuleFixture.getCustomerName());
      expect(result.getProductCode()).toEqual(priceRuleFixture.getProductCode());
    });

    it('can add a single price rule and it can not be found by searching for something else', () => {
      const customerNameFixture = 'Beastie Boys';
      const productCodeFixture = ProductType.Premium;
      const priceRuleFixture = new PriceRule(customerNameFixture, productCodeFixture);

      pricingRules.add(priceRuleFixture);
      const result = pricingRules.find('Enya', productCodeFixture);

      expect(pricingRules.count()).toEqual(1);
      expect(result).toBe(null);
    });

    it('can add a two price rules and one can be found by searching', () => {
      const customerNameFixture1 = 'Powderfinger';
      const productCodeFixture1 = ProductType.Classic;
      const priceRuleFixture1 = new PriceRule(customerNameFixture1, productCodeFixture1);
      const customerNameFixture2 = 'Silverchair';
      const productCodeFixture2 = ProductType.StandOut;
      const priceRuleFixture2 = new PriceRule(customerNameFixture2, productCodeFixture2);

      pricingRules.add(priceRuleFixture1);
      pricingRules.add(priceRuleFixture2);

      const result = pricingRules.find(customerNameFixture2, productCodeFixture2);

      expect(pricingRules.count()).toEqual(2);
      expect(result.getCustomerName()).toEqual(priceRuleFixture2.getCustomerName());
      expect(result.getProductCode()).toEqual(priceRuleFixture2.getProductCode());
    });
  });
});
