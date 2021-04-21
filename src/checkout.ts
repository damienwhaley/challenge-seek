import { PricingRules } from './pricing-rules';
import { Advertisment } from './advertisment';
import { Decimal } from 'decimal.js';
import { ProductFactory } from './product-factory';

export class Checkout {
  private pricingRules: PricingRules;
  private advertisments = {};
  private customerName: string;
  private productFactory: ProductFactory;

  constructor(pricingRules: PricingRules) {
    this.pricingRules = pricingRules;
    this.productFactory = new ProductFactory();
  }

  private createKey(customerName: string, productCode: string): string {
    return `${customerName}(╯°□°)╯︵ ┻━┻${productCode}`;
  }

  add(advertisment: Advertisment): boolean {
    if (this.count() === 0) {
      this.customerName = advertisment.getCustomerName();
    }

    if (this.customerName !== advertisment.getCustomerName()) {
      // You can only add products from a single customer
      return false;
    }

    const key = this.createKey(advertisment.getCustomerName(), advertisment.getProductCode());

    if (this.advertisments[key]) {
      // increment the count, we already have one of these advertisments
      this.advertisments[key].quantity = this.advertisments[key].quantity + 1;
    } else {
      this.advertisments[key] = {
        customerName: advertisment.getCustomerName(),
        productCode: advertisment.getProductCode(),
        quantity: 1
      };
    }

    return true;
  }

  count(): number {
    let quantity = 0;

    if (this.advertisments) {
      Object.keys(this.advertisments).forEach((key) => {
        quantity = quantity + this.advertisments[key].quantity;
      });
    }

    return quantity;
  }

  total(): Decimal {
    let totalAmount = new Decimal(0.0);

    if (this.count() > 0) {
      // loop though the advertisments collection and calculate the value of each groups of products
      Object.keys(this.advertisments).forEach((key) => {
        const priceRule = this.pricingRules.find(this.advertisments[key].customerName, this.advertisments[key].productCode);
        if (priceRule) {
          // this product has pricing rules, so calculate using those rules
          totalAmount = totalAmount.plus(priceRule.calculate(this.advertisments[key].quantity));
        } else {
          // the customer is paying the full retail price
          const product = this.productFactory.create(this.advertisments[key].productCode);
          totalAmount = totalAmount.plus(product.getRetailPrice().mul(this.advertisments[key].quantity));
        }
      });
    }

    return totalAmount;
  }
};
