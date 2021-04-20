import { PriceRule } from './price-rule';

export class PricingRules {
  private pricingRules = {};

  add(priceRule: PriceRule) {
    this.pricingRules[`${priceRule.getCustomerName()}|${priceRule.getProductCode()}`] = priceRule;
  }

  count(): number {
    return Object.keys(this.pricingRules).length;
  }
};
