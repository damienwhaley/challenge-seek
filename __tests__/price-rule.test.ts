import { PriceRule } from '../src/price-rule';
import { Decimal } from 'decimal.js';
import { ProductType } from '../src/product-type';
import { Product } from '../src/product';

describe('PriceRule class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const priceRule = new PriceRule();

      expect(typeof priceRule).not.toEqual('undefined');
      expect(priceRule instanceof PriceRule).toBe(true);
    });
  });

  describe('::calculate()', () => {
    it('can can calculate with a fixed discount', () => {
      const productCodeFixture = ProductType.Classic;
      const fixedDiscountFixture = new Decimal(10.0);
      const retailPriceFixture = new Decimal(99.95);
      const quantityFixture = 1;
      const customerNameFixture = 'Lego';
      const productFixture = new Product(productCodeFixture, retailPriceFixture);

      const priceRule = new PriceRule(customerNameFixture, productCodeFixture, fixedDiscountFixture);

      expect(priceRule.calculate(quantityFixture)).toEqual(retailPriceFixture - fixedDiscountFixture);
    });
  });
});
