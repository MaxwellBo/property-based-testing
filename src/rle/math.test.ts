import * as fc from 'fast-check';
import { MY_CONFIG } from '../test-utils';
import { myEquality } from './rle';

const MATH_CONFIG = { ...MY_CONFIG, seed: 1585932362 }

function describeEquivalence<T>(name: string, sut: (a:T, b: T) => boolean) {
  describe(`${name} is an equivalence relation`, () => {
    it('is reflexive', () => {
      fc.assert(
        fc.property(fc.anything(), 
        (a) => {
          expect(sut(a, a)).toBe(true)
        }), MATH_CONFIG
      )
    })
    it('is symmetric', () => {
      fc.assert(
        fc.property(fc.tuple(fc.anything(), fc.anything()), 
        ([a, b]) => {
          expect(sut(a, b)).toBe(sut(b, a))
        }), MATH_CONFIG
      )
    })
    
    it('is transitive', () => {
      const implies = (a: boolean, b: boolean) => !a || b
  
      fc.assert(
        fc.property(fc.tuple(fc.anything(), fc.anything(), fc.anything()), 
        ([a, b, c]) => {
          expect(implies(sut(a, b) && sut(b, c), sut(a, c))).toBe(true)
        }), MATH_CONFIG
      )
    })
  })
}

describeEquivalence('myEquality', myEquality)