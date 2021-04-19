import { Advertisment } from '../src/advertisment';

describe('Advertisment class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {
      const advertisment = new Advertisment();

      expect(typeof advertisment).not.toEqual('undefined');
      expect(advertisment instanceof Advertisment).toBe(true);
    });
  });

  describe('::getCustomerName', () => {
    it('can get a customer name', () => {
      const customerNameFixture = 'Example';
      const productCodeFixture = 'example';
      const advertisment = new Advertisment(customerNameFixture, productCodeFixture);

      const result = advertisment.getCustomerName();

      expect(result).toEqual(customerNameFixture);
    });
  });
});
