// https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/
/**
 * Return the length of the shortest, non-empty, contiguous subarray of A with sum at least K.
 * If there is no non-empty subarray with sum at least K, return -1.
 */
export function shortestSubarray(A: number[], K: number): number {
  // smallest distance between l and r such that the sum between l and r is K
  let res = Number.MAX_SAFE_INTEGER;

  let l = 0 // left pointer
  let r = 0 // right pointer
  let s = A[0]; // running sum

  while (l < A.length && r < A.length && l <= r) {
    if (s >= K) {
      // if the sum is too big, cut out the first element
      // adjust the sum down, and recalculate the distance
      res = Math.min(res, r - l + 1)
      s -= A[l]
      l += 1
    }
    else if (r < A.length - 1) {
      // otherwise the sum is not high enough, increment the right pointer
      // and update the sum
      r += 1
      s += A[r]
    }
    else {
      break
    }
  }

  return res === Number.MAX_SAFE_INTEGER ? -1 : res
}