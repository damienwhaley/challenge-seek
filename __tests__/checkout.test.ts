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

      checkout.add(advertismentFixture);

      expect(checkout.count()).toEqual(1);
    });

    it('can add the same advertisment multiple times', () => {
      const customerNameFixture = 'Fox Mulder';
      const productCodeFixture = 'X-Files';
      const advertismentFixture = new Advertisment(customerNameFixture, productCodeFixture);

      checkout.add(advertismentFixture);
      checkout.add(advertismentFixture);
      checkout.add(advertismentFixture);

      expect(checkout.count()).toEqual(3);
    });

    it('can add different advertisments', () => {
      const customerNameFixture1 = 'Smoking Man';
      const productCodeFixture1 = 'X-Files';
      const advertismentFixture1 = new Advertisment(customerNameFixture1, productCodeFixture1);

      const customerNameFixture2 = 'Walter Skinner';
      const productCodeFixture2 = 'X-Files';
      const advertismentFixture2 = new Advertisment(customerNameFixture2, productCodeFixture2);

      checkout.add(advertismentFixture1);
      checkout.add(advertismentFixture2);

      expect(checkout.count()).toEqual(2);
    });

    it('can add different advertisments in varying quantities', () => {
      const customerNameFixture1 = 'Chris Carter';
      const productCodeFixture1 = 'X-Files';
      const advertismentFixture1 = new Advertisment(customerNameFixture1, productCodeFixture1);

      const customerNameFixture2 = 'Mark Snow';
      const productCodeFixture2 = 'X-Files';
      const advertismentFixture2 = new Advertisment(customerNameFixture2, productCodeFixture2);

      const customerNameFixture3 = 'Trust';
      const productCodeFixture3 = 'No1';
      const advertismentFixture3 = new Advertisment(customerNameFixture3, productCodeFixture3);

      checkout.add(advertismentFixture1);
      checkout.add(advertismentFixture2);
      checkout.add(advertismentFixture3);
      checkout.add(advertismentFixture1);
      checkout.add(advertismentFixture2);
      checkout.add(advertismentFixture2);
      checkout.add(advertismentFixture3);

      expect(checkout.count()).toEqual(7);
    });
  });
});
