import * as fc from 'fast-check';
import { sort } from './sort';

describe("sort testing regimen - naive", () => {
  it('sorts a random array', () => {
    const data = [4, 3, 5, 1, 2, 6]

    const sorted = sort(data);

    expect(sorted).toEqual([1, 2, 3, 4, 5, 6]);
  })

  it('does not break when attempting to sort an empty array', () => {
    const data: number[] = [];

    const sorted = sort(data);

    expect(sorted).toEqual([]);
  })

  it('does not break when attempting to sort a unary array', () => {
    const data: number[] = [1];

    const sorted = sort(data);

    expect(sorted).toEqual([1]);
  })
});

describe("sort testing regimen - with property based expectation", () => {

  const expectToBeSorted = (arr: number[]) => {
    for (let i = 1; i < arr.length; i++) {
      expect(arr[i - 1]).toBeLessThanOrEqual(arr[i]);
    }
  }

  it('sort a random array', () => {
    const data = [4, 3, 5, 1, 2, 6]

    const sorted = sort(data);

    expectToBeSorted(sorted);
  })

  it('does not break when attempting to sort an empty array', () => {
    const data: number[] = [];

    const sorted = sort(data);

    expectToBeSorted(sorted);
  })

  it('does not break when attempting to sort a unary array', () => {
    const data: number[] = [1];

    const sorted = sort(data);

    expectToBeSorted(sorted);
  })
});

describe("sort testing regimen - with input generation and property based expectation", () => {

  const expectToBeSorted = (arr: number[]) => {
    for (let i = 1; i < arr.length; i++) {
      expect(arr[i - 1]).toBeLessThanOrEqual(arr[i]);
    }
  }


  it('sort a random array (with input generation)', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), data => {

        const sorted = sort(data);

        expectToBeSorted(sorted);
      }),
      {verbose: true});
  })
});
