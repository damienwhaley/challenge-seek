import { Decimal } from 'decimal.js';
import { ProductFactory } from './product-factory';
import { Product } from './product';

export class PriceRule {
  private customerName: string;
  private productCode: string;
  private fixedDiscount: Decimal;
  private product: Product;
  private bundleSize: number;
  private bonusPerBundle: number;

  constructor(customerName: string, productCode: string, fixedDiscount = new Decimal(0.0), bundleSize = 0, bonusPerBundle = 0) {
    this.customerName = customerName;
    this.productCode = productCode;
    this.fixedDiscount = fixedDiscount;
    this.bundleSize = bundleSize;
    this.bonusPerBundle = bonusPerBundle;

    const productFactory = new ProductFactory();
    this.product = productFactory.create(productCode);
  }

  calculate(quantity = 1): Decimal {
    if(quantity === 0) {
      // fast exit
      return new Decimal(0.0);
    }

    const retailPrice = this.product.getRetailPrice().mul(new Decimal(quantity));
    let fixedDiscountAmount = new Decimal(0.0);
    let bundleDiscountAmount = new Decimal(0.0);

    if (this.fixedDiscount.greaterThan(new Decimal(0.0))) {
      fixedDiscountAmount = this.fixedDiscount.mul(new Decimal(quantity));
    }

    if (this.bundleSize > 0 && this.bonusPerBundle > 0 && quantity >= this.bundleSize) {
      // find the number of products which are "bonus" and multiply that by the retail price
      // of the product which gives you the price of all the "bonus" products
      const remainder = new Decimal(quantity).mod(new Decimal(this.bundleSize));
      const quotient = new Decimal(quantity).minus(remainder).div(this.bundleSize);

      bundleDiscountAmount = quotient.mul(new Decimal(this.bonusPerBundle)).mul(this.product.getRetailPrice());
    }

    return retailPrice.minus(fixedDiscountAmount).minus(bundleDiscountAmount);
  }

  getCustomerName(): string {
    return this.customerName;
  }

  getProductCode(): string {
    return this.productCode;
  }
}
