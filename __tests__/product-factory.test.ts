import { ProductFactory } from '../src/product-factory';
import { ProductType } from '../src/product-type';
import { Product } from '../src/product';
import { Decimal } from 'decimal.js';

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
      expect(result.productCode).toEqual(ProductType.Classic);
      expect(result.name).toEqual('Classic Ad');
      expect(result.description).toEqual('Offers the most basic level of advertisement');
      expect(result.getRetailPrice()).toEqual(new Decimal(269.99));
    });

    it('can create a Stand out Ad product', () => {
      const productCodeFixture = ProductType.StandOut;

      const productFactory = new ProductFactory();
      const result = productFactory.create(productCodeFixture);
      expect(typeof result).not.toEqual('undefined');
      expect(result instanceof Product).toBe(true);
      expect(result.productCode).toEqual(ProductType.Classic);
      expect(result.name).toEqual('Stand out Ad');
      expect(result.description).toEqual('Allows advertisers to use a company logo and use a longer presentation text');
      expect(result.getRetailPrice()).toEqual(new Decimal(322.99));
    });

    it('can create a Premium Ad product', () => {
      const productCodeFixture = ProductType.Premium;

      const productFactory = new ProductFactory();
      const result = productFactory.create(productCodeFixture);
      expect(typeof result).not.toEqual('undefined');
      expect(result instanceof Product).toBe(true);
      expect(result.productCode).toEqual(ProductType.Classic);
      expect(result.name).toEqual('Premium Ad');
      expect(result.description).toEqual('Same benefits as Standout Ad, but also puts the advertisement at '
        + 'the top of the results, allowing higher visibility');
      expect(result.getRetailPrice()).toEqual(new Decimal(394.99));
    });
  });
});
