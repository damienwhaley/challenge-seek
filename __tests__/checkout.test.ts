import { Checkout } from '../src/checkout';
import { PricingRules } from  '../src/pricing-rules';
import { Advertisment } from '../src/advertisment';
import { ProductType } from '../src/product-type';
import { ProductFactory } from '../src/product-factory';
import { PriceRule } from '../src/price-rule';
import { Decimal } from 'decimal.js';

function createExamplePricingRules(): PricingRules {
  const pricingRules = new PricingRules();

  const priceRuleSecondBite = new PriceRule('SecondBite', ProductType.Classic, new Decimal(0.0), 3, 1);
  pricingRules.add(priceRuleSecondBite);

  const priceRuleAxilCoffeeRoasters = new PriceRule('Axil Coffee Roasters', ProductType.StandOut, new Decimal(23.0));
  pricingRules.add(priceRuleAxilCoffeeRoasters);

  const priceRuleMYER1 = new PriceRule('MYER', ProductType.StandOut, new Decimal(0.0), 5, 1);
  pricingRules.add(priceRuleMYER1);

  const priceRuleMYER2 = new PriceRule('MYER', ProductType.Premium, new Decimal(5.0));
  pricingRules.add(priceRuleMYER2);

  return pricingRules;
}

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

  describe('::total()', () => {
    let productFactory: ProductFactory;

    beforeEach(() => {
      productFactory = new ProductFactory();
    });

    it('can calculate the total of a single product with no pricing rules', () => {
      const pricingRulesFixture = new PricingRules();
      const customerNameFixture = 'Loyal Customer';
      const productCodeFixture = ProductType.Classic;
      const advertismentFixture = new Advertisment(customerNameFixture, productCodeFixture);
      const productFixture = productFactory.create(productCodeFixture);

      const checkout = new Checkout(pricingRulesFixture);

      const result1 = checkout.add(advertismentFixture);
      const result2 = checkout.total();

      expect(result1).toEqual(true);
      expect(checkout.count()).toEqual(1);
      expect(result2).toEqual(productFixture.getRetailPrice());
    });

    it('can calculate the total of multiples of the same product with no pricing rules', () => {
      const pricingRulesFixture = new PricingRules();
      const customerNameFixture = 'Famous Customer';
      const productCodeFixture = ProductType.StandOut;
      const advertismentFixture = new Advertisment(customerNameFixture, productCodeFixture);
      const productFixture = productFactory.create(productCodeFixture);

      const checkout = new Checkout(pricingRulesFixture);

      const result1 = checkout.add(advertismentFixture);
      const result2 = checkout.add(advertismentFixture);
      const result3 = checkout.add(advertismentFixture);
      const result4 = checkout.total();

      expect(result1).toEqual(true);
      expect(result2).toEqual(true);
      expect(result3).toEqual(true);
      expect(checkout.count()).toEqual(3);
      expect(result4).toEqual(productFixture.getRetailPrice().mul(3));
    });

    it('can calculate the total two different products with no pricing rules', () => {
      const pricingRulesFixture = new PricingRules();
      const customerNameFixture = 'Smart Customer';
      const productCodeFixture1 = ProductType.StandOut;
      const advertismentFixture1 = new Advertisment(customerNameFixture, productCodeFixture1);
      const productFixture1 = productFactory.create(productCodeFixture1);
      const productCodeFixture2 = ProductType.Premium;
      const advertismentFixture2 = new Advertisment(customerNameFixture, productCodeFixture2);
      const productFixture2 = productFactory.create(productCodeFixture2);

      const checkout = new Checkout(pricingRulesFixture);

      const result1 = checkout.add(advertismentFixture1);
      const result2 = checkout.add(advertismentFixture2);
      const result3 = checkout.total();

      expect(result1).toEqual(true);
      expect(result2).toEqual(true);
      expect(checkout.count()).toEqual(2);
      expect(result3).toEqual(productFixture1.getRetailPrice().plus(productFixture2.getRetailPrice()));
    });

    it('can calculate the total for the "default" customer in the example provided', () => {
      const pricingRulesFixture = createExamplePricingRules();

      const advertismentFixture1 = new Advertisment('default', ProductType.Classic);
      const advertismentFixture2 = new Advertisment('default', ProductType.StandOut);
      const advertismentFixture3 = new Advertisment('default', ProductType.Premium);

      const checkout = new Checkout(pricingRulesFixture);

      const result1 = checkout.add(advertismentFixture1);
      const result2 = checkout.add(advertismentFixture2);
      const result3 = checkout.add(advertismentFixture3);
      const result4 = checkout.total();

      expect(result1).toEqual(true);
      expect(result2).toEqual(true);
      expect(result3).toEqual(true);
      expect(checkout.count()).toEqual(3);
      expect(result4).toEqual(new Decimal(987.97));
    });

    it('can calculate the total for the "SecondBite" customer in the example provided', () => {
      const pricingRulesFixture = createExamplePricingRules();

      const advertismentFixture1 = new Advertisment('SecondBite', ProductType.Classic);
      const advertismentFixture2 = new Advertisment('SecondBite', ProductType.Classic);
      const advertismentFixture3 = new Advertisment('SecondBite', ProductType.Classic);
      const advertismentFixture4 = new Advertisment('SecondBite', ProductType.Premium);

      const checkout = new Checkout(pricingRulesFixture);

      const result1 = checkout.add(advertismentFixture1);
      const result2 = checkout.add(advertismentFixture2);
      const result3 = checkout.add(advertismentFixture3);
      const result4 = checkout.add(advertismentFixture4);
      const result5 = checkout.total();

      expect(result1).toEqual(true);
      expect(result2).toEqual(true);
      expect(result3).toEqual(true);
      expect(result4).toEqual(true);
      expect(checkout.count()).toEqual(4);
      expect(result5).toEqual(new Decimal(934.97));
    });

    it('can calculate the total for the "Axil Coffee Roasters" customer in the example provided', () => {
      const pricingRulesFixture = createExamplePricingRules();

      const advertismentFixture1 = new Advertisment('Axil Coffee Roasters', ProductType.StandOut);
      const advertismentFixture2 = new Advertisment('Axil Coffee Roasters', ProductType.StandOut);
      const advertismentFixture3 = new Advertisment('Axil Coffee Roasters', ProductType.StandOut);
      const advertismentFixture4 = new Advertisment('Axil Coffee Roasters', ProductType.Premium);

      const checkout = new Checkout(pricingRulesFixture);

      const result1 = checkout.add(advertismentFixture1);
      const result2 = checkout.add(advertismentFixture2);
      const result3 = checkout.add(advertismentFixture3);
      const result4 = checkout.add(advertismentFixture4);
      const result5 = checkout.total();

      expect(result1).toEqual(true);
      expect(result2).toEqual(true);
      expect(result3).toEqual(true);
      expect(result4).toEqual(true);
      expect(checkout.count()).toEqual(4);
      expect(result5).toEqual(new Decimal(1294.96));
    });
  });
});
