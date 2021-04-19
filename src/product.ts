import { Decimal } from 'decimal.js';

export class Product {
  productCode: string;
  retailPrice: Decimal;
  name: string
  description: string;

  constructor(productCode: string, retailPrice: Decimal = new Decimal(0.0), name = '', description = '') {
    this.productCode = productCode;
    this.retailPrice = retailPrice;
    this.name = name;
    this.description = description;
  }
};
