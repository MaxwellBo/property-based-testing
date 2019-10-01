import * as fc from 'fast-check';
import { runLengthEncode, runLengthDecode } from './rle';
import { MY_CONFIG } from './test-utils';

describe("run length encoding", () => {
  it('roundtrips', () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), data => {

        expect(runLengthDecode(runLengthEncode(data))).toEqual(data)
      }),
      { ...MY_CONFIG, seed: 780765438 });
  })
});
