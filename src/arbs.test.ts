import * as fc from 'fast-check';
import { Arbitrary } from 'fast-check';

function interrogate<T>(type: string, arb: Arbitrary<T>) {
  it(type, () => {
    console.log(
      `${type}\n${'-'.repeat(type.length)}\n`, 

      // sample<T>(generator: Arbitrary<T>, params?: number): T[]
      fc.sample(arb, 10)
    );
  })
}

describe("Primative Arbitrary<T>s", () => {

  const arbBoolean: Arbitrary<boolean> = fc.boolean();
  interrogate('boolean', arbBoolean)

  const arbNumber: Arbitrary<number> = fc.float();
  interrogate('float', arbNumber)

  const arbUnicodeString: Arbitrary<string> = fc.unicodeString();
  interrogate('unicodeString', arbUnicodeString)
});


describe("Specific Arbitrary<string>s", () => {

  const arbIpV4: Arbitrary<string> = fc.ipV4Extended();
  interrogate('ipV4', arbIpV4);

  interrogate('emailAddress', fc.emailAddress())

  interrogate('uuid', fc.uuid())

  interrogate('webUrl', fc.webUrl())

  interrogate('date', fc.date())

  interrogate('unicodeJson', fc.unicodeJson())
});

describe("T combinators", () => {
  // declare function constant<T>(value: T): Arbitrary<T>;
  const arbFive: Arbitrary<number> = fc.constant(5);
  interrogate('constant', arbFive);

  // declare function constantFrom<T>(...values: T[]): Arbitrary<T>;
  const arbOdd: Arbitrary<number> = fc.constantFrom(1, 3, 5, 7, 9);
  interrogate('constantFrom', arbOdd);
});

describe.only("Arbitrary<T> combinators", () => {
  // declare function array<T>(arb: Arbitrary<T>): Arbitrary<T[]>;
  const arbSymbol: Arbitrary<string> = fc.constantFrom("7️⃣", "🍒", "💰", "🍀", "💎")
  const arbOneArmedBandit: Arbitrary<string[]> = fc.array(arbSymbol, 3, 3)
  interrogate('array', arbOneArmedBandit);
});
