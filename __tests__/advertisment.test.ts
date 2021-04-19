import { Advertisment } from '../src/advertisment';

describe('Advertisment class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const customerNameFixture = 'Demo';
      const productCodeFixture = 'basic';
      const advertisment = new Advertisment(customerNameFixture, productCodeFixture);

      expect(typeof advertisment).not.toEqual('undefined');
      expect(advertisment instanceof Advertisment).toBe(true);
    });
  });

  describe('::getCustomerName', () => {
    it('can get a customer name', () => {
      const customerNameFixture = 'Example';
      const productCodeFixture = 'simple';
      const advertisment = new Advertisment(customerNameFixture, productCodeFixture);

      const result = advertisment.getCustomerName();

      expect(result).toEqual(customerNameFixture);
    });
  });

  describe('::getProductCode', () => {
    it('can get a product code', () => {
      const customerNameFixture = 'Amazing';
      const productCodeFixture = 'advanced';
      const advertisment = new Advertisment(customerNameFixture, productCodeFixture);

      const result = advertisment.getProductCode();

      expect(result).toEqual(productCodeFixture);
    });
  });
});
