import { PriceRule } from './price-rule';

export class PricingRules {
  // using a hash lookup for fast retrieval which is a performance optimisation but it has restrictions
  private pricingRules = {};

  private createKey(customerName: string, productCode: string): string {
    return `${customerName}\\_(ツ)_/¯${productCode}`;
  }

  add(priceRule: PriceRule) {
    this.pricingRules[this.createKey(priceRule.getCustomerName(), priceRule.getProductCode())] = priceRule;
  }

  count(): number {
    return Object.keys(this.pricingRules).length;
  }

  find(customerName: string, productCode: string): PriceRule | null {
    if (this.createKey(customerName, productCode) in this.pricingRules) {
      return this.pricingRules[this.createKey(customerName, productCode)];
    }

    // prefer this over throwing an exception - you do not need to use try/catch
    return null;
  }
};
