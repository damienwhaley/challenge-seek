import { Product } from '../src/product';
import { Decimal } from 'decimal.js';

describe('Product class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const productCode = 'dummy';
      const description = 'Some rather descriptive text';
      const retailPrice = new Decimal(12.34);
      const name = 'The Dummy Product';

      const product = new Product(productCode, retailPrice, name, description);

      expect(typeof product !== 'undefined');
    });
  });
});
