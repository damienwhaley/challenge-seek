import { Checkout } from './checkout';
import { PricingRules } from './pricing-rules';
import { PriceRule } from './price-rule';
import { ProductType } from './product-type';
import { Advertisment } from './advertisment';
import { Decimal } from 'decimal.js';

function createExamplePricingRules(): PricingRules {
  const pricingRules = new PricingRules();

  const priceRuleSecondBite = new PriceRule('SecondBite', ProductType.Classic, new Decimal(0.0), 3, 1);
  pricingRules.add(priceRuleSecondBite);

  const priceRuleAxilCoffeeRoasters = new PriceRule('Axil Coffee Roasters', ProductType.StandOut, new Decimal(23.0));
  pricingRules.add(priceRuleAxilCoffeeRoasters);

  const priceRuleMYER1 = new PriceRule('MYER', ProductType.StandOut, new Decimal(0.0), 5, 1);
  pricingRules.add(priceRuleMYER1);

  const priceRuleMYER2 = new PriceRule('MYER', ProductType.Premium, new Decimal(5.0));
  pricingRules.add(priceRuleMYER2);

  return pricingRules;
}

function runDefaultExample() {
  const pricingRules = createExamplePricingRules();
  const item1 = new Advertisment('default', ProductType.Classic);
  const item2 = new Advertisment('default', ProductType.StandOut);
  const item3 = new Advertisment('default', ProductType.Premium);

  const checkout = new Checkout(pricingRules);
  checkout.add(item1);
  checkout.add(item2);
  checkout.add(item3);
  const total = checkout.total();

  console.log('Customer: default');
  console.log('Items: `classic`, `standout`, `premium`');
  console.log(`Total: ${total}`);
  console.log('Expecting: 987.97\n');
}

function runSecondBiteExample() {
  const pricingRules = createExamplePricingRules();
  const item1 = new Advertisment('SecondBite', ProductType.Classic);
  const item4 = new Advertisment('SecondBite', ProductType.Premium);

  const checkout = new Checkout(pricingRules);
  checkout.add(item1);
  checkout.add(item1);
  checkout.add(item1);
  checkout.add(item4);
  const total = checkout.total();

  console.log('Customer: SecondBite');
  console.log('Items: `classic`, `classic`, `classic`, `premium`');
  console.log(`Total: ${total}`);
  console.log('Expecting: 934.97\n');
}

function runAxilCoffeeRoastersExample() {
  const pricingRules = createExamplePricingRules();
  const item1 = new Advertisment('Axil Coffee Roasters', ProductType.StandOut);
  const item2 = new Advertisment('Axil Coffee Roasters', ProductType.Premium);

  const checkout = new Checkout(pricingRules);
  checkout.add(item1);
  checkout.add(item1);
  checkout.add(item1);
  checkout.add(item2);
  const total = checkout.total();

  console.log('Customer: Axil Coffee Roasters');
  console.log('Items: `standout`, `standout`, `standout`, `premium`');
  console.log(`Total: ${total}`);
  console.log('Expecting: 1294.96\n');
}

function runMYERExample() {
  const pricingRules = createExamplePricingRules();
  const item1 = new Advertisment('MYER', ProductType.StandOut);
  const item2 = new Advertisment('MYER', ProductType.Premium);
  const item3 = new Advertisment('MYER', ProductType.Classic);

  const checkout = new Checkout(pricingRules);
  for (let i = 0; i < 11; i++) {
    checkout.add(item1);
  }
  checkout.add(item2);
  checkout.add(item2);
  checkout.add(item3);
  const total = checkout.total();

  console.log('Customer: MYER');
  console.log('Items: `standout`, `standout`, `standout`, `standout`, `standout`, `standout`,\n'
    + '  `standout`,`standout`, `standout`, `standout`, `standout`, `premium`, `premium`,\n'
    + '  `classic`');
  console.log(`Total: ${total}`);
  console.log('Expecting: 3956.88\n');
}

function runExamples() {
  console.log('==============\nSeek Challenge\n==============\n');
  runDefaultExample();
  runSecondBiteExample();
  runAxilCoffeeRoastersExample();
  runMYERExample();
}

runExamples();
