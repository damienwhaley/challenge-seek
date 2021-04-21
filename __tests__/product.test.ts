import { Product } from '../src/product';
import { Decimal } from 'decimal.js';

describe('Product class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const productCodeFixture = 'dummy';
      const descriptionFixture = 'Some rather descriptive text';
      const retailPriceFixture = new Decimal(12.34);
      const nameFixture = 'The Dummy Product';

      const product = new Product(productCodeFixture, retailPriceFixture, nameFixture, descriptionFixture);

      expect(typeof product).not.toEqual('undefined');
      expect(product instanceof Product).toBe(true);
      expect(product.productCode).toEqual(productCodeFixture);
      expect(product.getRetailPrice()).toEqual(retailPriceFixture);
      expect(product.name).toEqual(nameFixture);
      expect(product.description).toEqual(descriptionFixture);
    });
  });

  describe('::getRetailPrice()', () => {
    it('can get the retail price', () => {
      const productCodeFixture = 'example';
      const retailPriceFixture = new Decimal(99.95);

      const product = new Product(productCodeFixture, retailPriceFixture);

      expect(product.getRetailPrice()).toEqual(retailPriceFixture);
    });
  });
});
