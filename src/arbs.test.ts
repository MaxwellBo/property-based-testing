import * as fc from 'fast-check';
import { Arbitrary } from 'fast-check';

function interrogate<T>(type: string, arb: Arbitrary<T>, count: number = 10) {
  it(type, () => {
    console.log(
      `${type}\n${'-'.repeat(type.length)}\n`, 

      // sample<T>(generator: Arbitrary<T>, params?: number): T[]
      fc.sample(arb, count)
    );
  })
}

describe("Primative Arbitrary<T>s", () => {

  const arbBoolean: Arbitrary<boolean> = fc.boolean();
  interrogate('boolean', arbBoolean)

  const arbNumber: Arbitrary<number> = fc.float();
  interrogate('float', arbNumber)

  const arbNat: Arbitrary<number> = fc.nat(10);
  interrogate('float', arbNat)

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

describe("Arbitrary<T> combinators", () => {
  // declare function array<T>(arb: Arbitrary<T>): Arbitrary<T[]>;
  const arbSymbol: Arbitrary<string> = fc.constantFrom("7️⃣", "🍒", "💰", "🍀", "💎")
  const arbOneArmedBandit: Arbitrary<string[]> = fc.array(arbSymbol, 3, 3)
  interrogate('array', arbOneArmedBandit);

  // https://github.com/dubzzz/fast-check/issues/391
  const arbNatOrUndefined: Arbitrary<number | undefined> = fc.option(fc.nat(10), { nil: undefined })
  interrogate('option', arbNatOrUndefined);
});

describe("Transforming Arbitrary<T>s", () => {
  const arbNegatives: Arbitrary<number> = fc.nat(10).map(
    (t: number) => -t
  )

  interrogate('map', arbNegatives);

  const arbEven = fc.nat(10).filter(x => x % 2 === 0)
  interrogate('filter', arbEven);
})

interface User {
  admin: boolean,
  name: string
  email: string
  phone?: string
}

describe.only("Custom Arbitrary<T>s", () => {
  // function tuple<T0>    (arb0: Arbitrary<T0>):                      Arbitrary<[T0]>;
  // function tuple<T0, T1>(arb0: Arbitrary<T0>, arb1: Arbitrary<T1>): Arbitrary<[T0, T1]>;
  // ...

  const arbInterval: Arbitrary<[number, number]> = 
    fc.tuple(fc.nat(100), fc.nat(100)).filter(([a, b]) => a < b);

  interrogate('tuple', arbInterval);


  const arbNumerals: Arbitrary<string> = fc.nat(9).map(t => t.toString())
  const PHONE_NUMBER_LENGTH = 10
  const arbPhoneNumber: Arbitrary<string> = fc.stringOf(arbNumerals, PHONE_NUMBER_LENGTH, PHONE_NUMBER_LENGTH)

  const arbUserPrime: Arbitrary<User> = fc.record({
    admin: fc.boolean(),
    name: fc.unicodeString(),
    email: fc.emailAddress(),
    phone: fc.option<string, undefined>(arbPhoneNumber, { nil: undefined })
  })

  interrogate('record', arbUserPrime, 2);
})

describe("Sledgehammers (for when you really need things to break)", () => {
  interrogate('anything', fc.anything(), 3);

  interrogate('object', fc.object(), 3);

  interrogate('unicodeJsonObject', fc.unicodeJsonObject(), 3);
})