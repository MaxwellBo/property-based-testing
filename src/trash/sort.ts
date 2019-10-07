
const sortInternal = <T>(xs: T[], start: number, end: number, cmp: (a: T, b: T) => boolean): T[] => {
  if (end - start < 2) return xs;

  let pivot = start;
  for (let idx = start + 1; idx < end; ++idx) {
    if (!cmp(xs[start], xs[idx])) {
      let prev = xs[++pivot];
      xs[pivot] = xs[idx];
      xs[idx] = prev;
    }
  }
  
  let prev = xs[pivot];
  xs[pivot] = xs[start];
  xs[start] = prev;

  sortInternal(xs, start, pivot, cmp);
  sortInternal(xs, pivot + 1, end, cmp);
  return xs;
};

export const sort = <T>(xs: T[]): T[] => {
  return sortInternal([...xs], 0, xs.length - 1, (a, b) => a < b);
};