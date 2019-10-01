import * as fc from 'fast-check';
import { runLengthEncode, runLengthDecode } from './rle';
import { DEFAULT_CONFIGURATION } from './test-utils';


describe("run length encoding", () => {
  it('roundtrips', () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), data => {

        expect(runLengthDecode(runLengthEncode(data))).toEqual(data)
      }),
      DEFAULT_CONFIGURATION);
  })
});
