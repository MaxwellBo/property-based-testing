import * as fc from 'fast-check';
import { encode, decode } from './rle';
import { MY_CONFIG } from '../test-utils';

describe("run length encoding", () => {
  it.skip('encodes', () => {
    const sut = encode
    const input = [true, true, false, false, true]

    expect(sut(input)).toEqual([{"length": 2, "value": true}, {"length": 2, "value": false}, {"length": 1, "value": true}])
  })

  it.skip('decodes', () => {
    const sut = decode
    const input = [{"length": 2, "value": true}, {"length": 2, "value": false}, {"length": 1, "value": true}]

    expect(sut(input)).toEqual([true, true, false, false, true])
  })

  it.skip('roundtrips for booleans', () => {
    const sut = (input: any) => decode(encode(input))
    const input = [true, true, false, false, true]

    expect(sut(input)).toEqual(input)
  })

  it.skip('roundtrips for numbers', () => {
    const sut = (input: any) => decode(encode(input))
    const input = [1, 2, 2, 3, 2]

    expect(sut(input)).toEqual(input)
  })
  
  it.skip('roundtrips for anything', () => {
    fc.assert(
      fc.property(fc.array(fc.anything()), input => {

        const sut = (input: any) => decode(encode(input))

        expect(sut(input)).toEqual(input)
      }),
      { ...MY_CONFIG, seed: 780765438 });
  })
});
