import { Checkout } from '../src/checkout';
import { PricingRules } from  '../src/pricing-rules';
import { Advertisment } from '../src/advertisment';

describe('Checkout class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const pricingRulesFixture = new PricingRules();
      const checkout = new Checkout(pricingRulesFixture);

      expect(typeof checkout).not.toEqual('undefined');
      expect(checkout instanceof Checkout).toBe(true);
    });
  });

  describe('::add()', () => {
    let pricingRulesFixture: PricingRules;
    let checkout: Checkout;

    beforeEach(() => {
      pricingRulesFixture = new PricingRules();
      checkout = new Checkout(pricingRulesFixture);
    });

    it('can add an advertisment', () => {
      const customerNameFixture = 'Dana Scully';
      const productCodeFixture = 'X-Files';
      const advertismentFixture = new Advertisment(customerNameFixture, productCodeFixture);

      const result = checkout.add(advertismentFixture);

      expect(result).toEqual(true);
      expect(checkout.count()).toEqual(1);
    });

    it('can add the same advertisment multiple times', () => {
      const customerNameFixture = 'Fox Mulder';
      const productCodeFixture = 'X-Files';
      const advertismentFixture = new Advertisment(customerNameFixture, productCodeFixture);

      const result1 = checkout.add(advertismentFixture);
      const result2 = checkout.add(advertismentFixture);
      const result3 = checkout.add(advertismentFixture);

      expect(result1).toEqual(true);
      expect(result2).toEqual(true);
      expect(result3).toEqual(true);
      expect(checkout.count()).toEqual(3);
    });

    it('can add different advertisments for the same customer', () => {
      const customerNameFixture1 = 'Walter Skinner';
      const productCodeFixture1 = 'X-Files';
      const advertismentFixture1 = new Advertisment(customerNameFixture1, productCodeFixture1);

      const customerNameFixture2 = 'Walter Skinner';
      const productCodeFixture2 = 'Area 51';
      const advertismentFixture2 = new Advertisment(customerNameFixture2, productCodeFixture2);

      const result1 = checkout.add(advertismentFixture1);
      const result2 = checkout.add(advertismentFixture2);

      expect(result1).toEqual(true);
      expect(result2).toEqual(true);
      expect(checkout.count()).toEqual(2);
    });

    it('can add different advertisments in varying quantities for the same customer', () => {
      const customerNameFixture1 = 'Smoking Man';
      const productCodeFixture1 = 'X-Files';
      const advertismentFixture1 = new Advertisment(customerNameFixture1, productCodeFixture1);

      const customerNameFixture2 = 'Smoking Man';
      const productCodeFixture2 = 'Tooms';
      const advertismentFixture2 = new Advertisment(customerNameFixture2, productCodeFixture2);

      const customerNameFixture3 = 'Smoking Man';
      const productCodeFixture3 = 'Trust No1';
      const advertismentFixture3 = new Advertisment(customerNameFixture3, productCodeFixture3);

      const result1 = checkout.add(advertismentFixture1);
      const result2 = checkout.add(advertismentFixture2);
      const result3 = checkout.add(advertismentFixture3);
      const result4 = checkout.add(advertismentFixture1);
      const result5 = checkout.add(advertismentFixture2);
      const result6 = checkout.add(advertismentFixture2);
      const result7 = checkout.add(advertismentFixture3);

      expect(result1).toEqual(true);
      expect(result2).toEqual(true);
      expect(result3).toEqual(true);
      expect(result4).toEqual(true);
      expect(result5).toEqual(true);
      expect(result6).toEqual(true);
      expect(result7).toEqual(true);
      expect(checkout.count()).toEqual(7);
    });

    it('can not add advertisments for different customers', () => {
      const customerNameFixture1 = 'Smoking Man';
      const productCodeFixture1 = 'X-Files';
      const advertismentFixture1 = new Advertisment(customerNameFixture1, productCodeFixture1);

      const customerNameFixture2 = 'Walter Skinner';
      const productCodeFixture2 = 'X-Files';
      const advertismentFixture2 = new Advertisment(customerNameFixture2, productCodeFixture2);

      const result1 = checkout.add(advertismentFixture1);
      const result2 = checkout.add(advertismentFixture2);

      expect(result1).toEqual(true);
      expect(result2).toEqual(false);
      expect(checkout.count()).toEqual(1);
    });
  });
});
