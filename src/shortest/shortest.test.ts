import * as fc from 'fast-check';
import { shortestSubarray } from './shortest';
import { MY_CONFIG } from '../test-utils';

function solution(A: number[], K: number) {
  const N = A.length;
  let res = N + 1;

  const S = Array(N + 1).map(() => 0)
  
  for (let i = 0; i < N; i++) { 
    S[i + 1] = S[i] + A[i];
  }

  const d: number[] = [];


  for(let i = 0; i < N + 1; i++) {
      while (d.length > 0 && S[i] - S[d[0]] >= K){
        // @ts-ignore
          res = Math.min(res, i - d.shift());
      }
      while(d.length > 0 && S[i] <= S[d[d.length - 1]]){
          d.pop()
      }
      d.push(i);
  }
  return (res === N + 1) ? -1 : res;
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

  it('example 3 - compare', () => {
    const sut = shortestSubarray

    const A = [2, -1, 2]
    const K = 3

    expect(sut(A, K)).toEqual(solution(A, K));
  })
});
