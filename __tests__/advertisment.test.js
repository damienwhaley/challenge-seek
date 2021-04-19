import { Advertisment } from '../src/advertisment';

describe('Advertisment class', () => {
  describe('::constructor()', () => {
    it('can instatiate a class', () => {

      const advertisment = new Advertisment();

      expect(typeof advertisment).not.toEqual('undefined');
      expect(advertisment instanceof Advertisment).toBe(true);
    });
  });
});
