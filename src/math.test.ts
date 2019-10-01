import * as fc from 'fast-check';
import { DEFAULT_CONFIGURATION } from './test-utils.test';


describe("equality", () => {
  it('is reflexive', () => {
    fc.assert(
      fc.property(fc.anything(), (x) => {
        expect(x === x).toBe(true)
      }),
      DEFAULT_CONFIGURATION);
  })
});
