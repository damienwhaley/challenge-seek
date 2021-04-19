import { Decimal } from 'decimal.js';
import { ProductFactory } from './product-factory';
import { Product } from './product';

export class PriceRule {
  customerName: string;
  productCode: string;
  private fixedDiscount: Decimal;
  private product: Product;

  constructor(customerName: string, productCode: string, fixedDiscount = new Decimal(0.0)) {
    this.customerName = customerName;
    this.productCode = productCode;
    this.fixedDiscount = fixedDiscount;

    const productFactory = new ProductFactory();
    this.product = productFactory.create(productCode);
  }

  calculate(quantity = 1): Decimal {
    let calculatedPrice = new Decimal(0.0);
    calculatedPrice = (this.product.getRetailPrice().minus(this.fixedDiscount)).mul(new Decimal(quantity));

    return calculatedPrice;
  }
}
