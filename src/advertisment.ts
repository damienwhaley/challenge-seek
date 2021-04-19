export class Advertisment {
  private customerName: string;
  private productCode: string;

  constructor(customerName: string, productCode: string) {
    this.customerName = customerName;
    this.productCode = productCode;
  }

  getCustomerName(): string {
    return this.customerName;
  }
};
