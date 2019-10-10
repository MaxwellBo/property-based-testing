import * as fc from 'fast-check';
import { shortestSubarray } from './shortest';
import { MY_CONFIG } from '../test-utils';

function indexCombinations<T>(array: T[]): { low: number, high: number }[] {
  const results = []
  for (let i = 0; i <= array.length; i++) {
    for (let j = i; j < array.length; j++) {
      results.push({ low: i, high: j })
    }
  }
  return results;
}

function bruteforce(A: number[], K: number) {
  const sum = (a: number, b: number) => a + b
  
  const distances = indexCombinations(A)
    // get all the subarrays that sum to K
    .map(({ low, high }) => A.slice(low, high + 1))
    // choose only the ones that sum to our desired value
    .filter(arr => arr.reduce(sum, 0) === K)
    // get their lengths
    .map(arr => arr.length)

  return distances.length !== 0 
    ? Math.min.apply(null, distances)
    : -1
}
  
describe("shortestSubarray", () => {
  it('example 1', () => {
    const sut = shortestSubarray

    const A = [1]
    const K = 1

    expect(sut(A, K)).toEqual(1);
  })

  it('example 2', () => {
    const sut = shortestSubarray

    const A = [1, 2]
    const K = 4

    expect(sut(A, K)).toEqual(-1);
  })

  it('example 3', () => {
    const sut = shortestSubarray

    const A = [2, -1, 2]
    const K = 3

    expect(sut(A, K)).toEqual(3);
  })
});

describe("shortestSubarray - comparison to bruteforce", () => {
  it('example 1', () => {
    const sut = shortestSubarray

    const A = [1]
    const K = 1

    expect(sut(A, K)).toEqual(bruteforce(A, K));
  })

  it('example 2', () => {
    const sut = shortestSubarray

    const A = [1, 2]
    const K = 4

    expect(sut(A, K)).toEqual(bruteforce(A, K));
  })

  it('example 3', () => {
    const sut = shortestSubarray

    const A = [2, -1, 2]
    const K = 3

    expect(sut(A, K)).toEqual(bruteforce(A, K));
  })
});

describe("shortestSubarray - property based testing", () => {
  it('lots of examples', () => {
    const sut = shortestSubarray
    
    const arbA = fc.array(fc.integer(-100, 100), 20)
    const arbK = fc.integer(-100, 100)

    fc.assert(
      fc.property(fc.tuple(arbA, arbK), 
      ([A, K]) => {
        expect(sut(A, K)).toBe(bruteforce(A, K))
      }), MY_CONFIG
    )
  })
});
