import { Product } from '../src/product';

describe('Product class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const product = new Product();

      expect(typeof product !== 'undefined');
    });
  });
});
