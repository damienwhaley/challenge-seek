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
    let productFactory: ProductFactory;

    beforeEach(() => {
      productFactory = new ProductFactory();
    });

    it('can can calculate a total price with a fixed discount for a single product', () => {
      const productCodeFixture = ProductType.Classic;
      const fixedDiscountFixture = new Decimal(10.0);
      const quantityFixture = 1;
      const customerNameFixture = 'Lego';
      const productFixture = productFactory.create(productCodeFixture);
      const expected = productFixture.getRetailPrice().minus(fixedDiscountFixture);

      const priceRule = new PriceRule(customerNameFixture, productCodeFixture, fixedDiscountFixture);

      expect(priceRule.calculate(quantityFixture)).toEqual(expected);
    });

    it('can can calculate a total price with a fixed discount for multiple products', () => {
      const productCodeFixture = ProductType.Classic;
      const fixedDiscountFixture = new Decimal(10.0);
      const quantityFixture = 5;
      const customerNameFixture = 'MEGA CONTRUX';
      const productFixture = productFactory.create(productCodeFixture);
      const expected = productFixture.getRetailPrice().minus(fixedDiscountFixture).mul(quantityFixture);

      const priceRule = new PriceRule(customerNameFixture, productCodeFixture, fixedDiscountFixture);

      expect(priceRule.calculate(quantityFixture)).toEqual(expected);
    });

    it('can can calculate a total price with a bonus bundle', () => {
      const productCodeFixture = ProductType.Premium;
      const fixedDiscountFixture = new Decimal(0.0);
      const bundleSizeFixture = 3;
      const bundleBonusForFreeFixture = 1;
      const quantityFixture = 3;
      const customerNameFixture = 'Kre-O';
      const productFixture = productFactory.create(productCodeFixture);
      const expected = productFixture.getRetailPrice().mul(quantityFixture).minus(productFixture.getRetailPrice());

      const priceRule = new PriceRule(customerNameFixture, productCodeFixture, fixedDiscountFixture, bundleSizeFixture, bundleBonusForFreeFixture);

      expect(priceRule.calculate(quantityFixture)).toEqual(expected);
    });

    it('can can calculate a total price with multiple bonus bundles', () => {
      const productCodeFixture = ProductType.Premium;
      const fixedDiscountFixture = new Decimal(0.0);
      const bundleSizeFixture = 4;
      const bundleBonusForFreeFixture = 2;
      const quantityFixture = 9;
      const customerNameFixture = 'BanBao';
      const productFixture = productFactory.create(productCodeFixture);
      const expected = productFixture.getRetailPrice().mul(quantityFixture).minus((productFixture.getRetailPrice().mul(4)));

      const priceRule = new PriceRule(customerNameFixture, productCodeFixture, fixedDiscountFixture, bundleSizeFixture, bundleBonusForFreeFixture);

      expect(priceRule.calculate(quantityFixture)).toEqual(expected);
    });

    it('can can calculate a total price no quantity', () => {
      const productCodeFixture = ProductType.Premium;
      const fixedDiscountFixture = new Decimal(0.0);
      const bundleSizeFixture = 0;
      const bundleBonusForFreeFixture = 0;
      const quantityFixture = 0;
      const customerNameFixture = 'Cobi';

      const priceRule = new PriceRule(customerNameFixture, productCodeFixture, fixedDiscountFixture, bundleSizeFixture, bundleBonusForFreeFixture);

      expect(priceRule.calculate(quantityFixture)).toEqual(new Decimal(0.0));
    });

    it('can can calculate a total price when a threshold is reached', () => {
      // en reach threshold to reduce by fixed amount
      const productCodeFixture = ProductType.Premium;
      const fixedDiscountFixture = new Decimal(0.0);
      const thresholdSizeFixture = 2;
      const thresholdDiscountFixedFixture = new Decimal(20.0);
      const quantityFixture = 2;
      const customerNameFixture = 'Banana';

      const priceRule = new PriceRule(customerNameFixture, productCodeFixture, fixedDiscountFixture, 0, 0, thresholdSizeFixture, thresholdDiscountFixedFixture);

        // premium = 374.99 * 2

      expect(priceRule.calculate(quantityFixture)).toEqual(new Decimal(374.99 * 2));
    });
  });
});
