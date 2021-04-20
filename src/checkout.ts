import { PricingRules } from './pricing-rules';
import { Advertisment } from './advertisment';

interface AdvertismentItem {
  customerName: string,
  productCode: string,
  quantity: number
};

export class Checkout {
  private pricingRules: PricingRules;
  private advertisments: { key: string, value: AdvertismentItem };

  private createKey(customerName: string, productCode: string): string {
    return `${customerName}(╯°□°)╯︵ ┻━┻${productCode}`;
  }

  constructor(pricingRules: PricingRules) {
    this.pricingRules = pricingRules;
  }

  add(advertisment: Advertisment) {
    const key = this.createKey(advertisment.getCustomerName(), advertisment.getProductCode());

    if (key in this.advertisments) {
      this.advertisments[key].quantity = this.advertisments[key].quantity + 1;
    } else {
      this.advertisments[key] = {
        customerName: advertisment.getCustomerName(),
        productCode: advertisment.getProductCode(),
        quantity: 1
      };
    }
  }

  count(): number {
    let quantity = 0;

    Object.keys(this.advertisments).forEach((key) => {
      quantity = quantity + this.advertisments[key].quantity;
    });

    return quantity;
  }
};
