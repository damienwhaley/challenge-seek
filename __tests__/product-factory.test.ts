import { ProductFactory } from '../src/product-factory';

describe('ProductFactory class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const productFactory = new ProductFactory();

      expect(typeof productFactory).not.toEqual('undefined');
    });
  });
});
