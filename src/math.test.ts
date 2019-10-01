import * as fc from 'fast-check';
import { MY_CONFIG } from './test-utils';


describe("equality", () => {
  it('is reflexive', () => {
    fc.assert(
      fc.property(fc.anything(), (x) => {
        expect(x === x).toBe(true)
      }),
      { ...MY_CONFIG, seed: 1585932362 });
  })
});
