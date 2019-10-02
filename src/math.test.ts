import * as fc from 'fast-check';
import { MY_CONFIG } from './test-utils';

const MATH_CONFIG = { ...MY_CONFIG, seed: 1585932362 }

function describeEquivalence<T>(name: string, f: (a:T, b: T) => boolean) {
  describe(`${name} is an equivalence relation`, () => {
    it('is reflexive', () => {
      fc.assert(
        fc.property(fc.anything(), 
        (a) => {
          expect(f(a, a)).toBe(true)
        }), MATH_CONFIG
      )
    })
    it('is symmetric', () => {
      fc.assert(
        fc.property(fc.tuple(fc.anything(), fc.anything()), 
        ([a, b]) => {
          expect(f(a, b)).toBe(f(b, a))
        }), MATH_CONFIG
      )
    })
    
    it('is transitive', () => {
      const implies = (a: boolean, b: boolean) => !a || b
  
      fc.assert(
        fc.property(fc.tuple(fc.anything(), fc.anything(), fc.anything()), 
        ([a, b, c]) => {
          expect(implies(f(a, b) && f(b, c), f(a, c))).toBe(true)
        }), MATH_CONFIG
      )
    })
  })
}

describeEquivalence('== (double equals)', (a: any, b: any) => a == b)
describeEquivalence('=== (triple equals)', (a: any, b: any) => a === b)
describeEquivalence('Object.is', (a: any, b: any) => Object.is(a, b))

describe("=== and Object.is", () => {
  it('are the same for everything but NaN', () => {
    const arbAnythingButNaN = fc.anything().filter(t => !isNaN(t))

    fc.assert(
      fc.property(fc.tuple(arbAnythingButNaN, arbAnythingButNaN), 
      ([a, b]) => {
        expect(a === b).toBe(Object.is(a, b))
      }), MATH_CONFIG
    )
  })
});
