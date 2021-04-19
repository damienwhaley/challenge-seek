import { ProductFactory } from '../src/product-factory';
import { ProductType } from '../src/product-type';
import { Product } from '../src/product';

describe('ProductFactory class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const productFactory = new ProductFactory();

      expect(typeof productFactory).not.toEqual('undefined');
    });
  });

  describe('::create()', () => {
    it('can create a Classic Ad product', () => {
      const productCodeFixture = ProductType.Classic;

      const productFactory = new ProductFactory();
      const result = productFactory.create(productCodeFixture);
      expect(typeof result).not.toEqual('undefined');
      expect(result instanceof Product).toBe(true);
    });
  });
});
