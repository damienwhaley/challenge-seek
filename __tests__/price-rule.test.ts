import { PriceRule } from '../src/price-rule';
import { Decimal } from 'decimal.js';
import { ProductType } from '../src/product-type';
import { ProductFactory } from '../src/product-factory';

describe('PriceRule class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const customerNameFixture = 'Meccano';
      const productCodeFixture = ProductType.Premium;
      const priceRule = new PriceRule(customerNameFixture, productCodeFixture);

      expect(typeof priceRule).not.toEqual('undefined');
      expect(priceRule instanceof PriceRule).toBe(true);
    });
  });

  describe('::calculate()', () => {
    it('can can calculate with a fixed discount', () => {
      const productCodeFixture = ProductType.Classic;
      const fixedDiscountFixture = new Decimal(10.0);
      //const retailPriceFixture = new Decimal(99.95);
      const quantityFixture = 1;
      const customerNameFixture = 'Lego';

      const productFactory = new ProductFactory();
      const productFixture = productFactory.create(productCodeFixture);

      const priceRule = new PriceRule(customerNameFixture, productCodeFixture, fixedDiscountFixture);

      expect(priceRule.calculate(quantityFixture)).toEqual(productFixture.getRetailPrice().minus(fixedDiscountFixture));
    });
  });
});
