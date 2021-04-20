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
      return new Decimal(0.0);
    }

    let retailPrice = new Decimal(0.0);
    let fixedDiscountAmount = new Decimal(0.0);
    let bundleDiscountAmount = new Decimal(0.0);

    if (this.fixedDiscount.greaterThan(new Decimal(0.0))) {
      fixedDiscountAmount = this.fixedDiscount.mul(new Decimal(quantity));
    }

    if (this.bundleSize > 0 && this.bonusPerBundle > 0 && quantity >= this.bundleSize) {
      const modulus = new Decimal(quantity).mod(new Decimal(this.bundleSize));
      const quotient = new Decimal(quantity).minus(modulus).div(this.bundleSize);

      bundleDiscountAmount = quotient.mul(new Decimal(this.bonusPerBundle)).mul(this.product.getRetailPrice());
    }

    retailPrice = this.product.getRetailPrice().mul(new Decimal(quantity));

    return retailPrice.minus(fixedDiscountAmount).minus(bundleDiscountAmount);
  }

  getCustomerName(): string {
    return this.customerName;
  }

  getProductCode(): string {
    return this.productCode;
  }
}
