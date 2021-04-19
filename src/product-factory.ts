import { Product } from './product';

export class ProductFactory {
  create(productCode: string): Product {
    return new Product(productCode);
  }
};
