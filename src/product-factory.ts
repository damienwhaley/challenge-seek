import { Product } from './product';
import { ProductType } from './product-type';
import { Decimal } from 'decimal.js';

export class ProductFactory {
  create(productType: string): Product {
    let name: string;
    let description: string;
    let retailPrice: Decimal;
    let productCode: string;

    switch(productType) {
      case ProductType.Classic:
        name = 'Classic Ad';
        description = 'Offers the most basic level of advertisement';
        retailPrice = new Decimal(269.99);
        productCode = productType;
        break;
      case ProductType.StandOut:
        name = 'Stand out Ad';
        description = 'Allows advertisers to use a company logo and use a longer presentation text';
        retailPrice = new Decimal(322.99);
        productCode = productType;
        break;
      case ProductType.Premium:
        name = 'Premium Ad';
        description = 'Same benefits as Standout Ad, but also puts the advertisement at the top of '
          + 'the results, allowing higher visibility';
        retailPrice = new Decimal(394.99);
        productCode = productType;
        break;
    }

    return new Product(productCode, retailPrice, name, description);
  }
};
