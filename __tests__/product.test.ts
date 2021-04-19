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
      expect(product.productCode).toEqual(productCodeFixture);
      expect(product.retailPrice).toEqual(retailPriceFixture);
      expect(product.name).toEqual(nameFixture);
      expect(product.description).toEqual(descriptionFixture);
    });
  });
});
