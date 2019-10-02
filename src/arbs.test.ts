import * as fc from 'fast-check';
import { Arbitrary } from 'fast-check';

function prettySample<T>(type: string, arb: Arbitrary<T>, count: number = 10) {
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
  prettySample('boolean', arbBoolean)

  const arbNumber: Arbitrary<number> = fc.float();
  prettySample('float', arbNumber)

  const arbNat: Arbitrary<number> = fc.nat(10);
  prettySample('float', arbNat)

  const arbUnicodeString: Arbitrary<string> = fc.unicodeString();
  prettySample('unicodeString', arbUnicodeString)
});


describe("Specific Arbitrary<string>s", () => {

  const arbIpV4: Arbitrary<string> = fc.ipV4Extended();
  prettySample('ipV4', arbIpV4);

  prettySample('emailAddress', fc.emailAddress())

  prettySample('uuid', fc.uuid())

  prettySample('webUrl', fc.webUrl())

  prettySample('date', fc.date())

  prettySample('unicodeJson', fc.unicodeJson())
});

describe("T combinators", () => {
  // declare function constant<T>(value: T): Arbitrary<T>;
  const arbFive: Arbitrary<number> = fc.constant(5);
  prettySample('constant', arbFive);

  // declare function constantFrom<T>(...values: T[]): Arbitrary<T>;
  const arbOdd: Arbitrary<number> = fc.constantFrom(1, 3, 5, 7, 9);
  prettySample('constantFrom', arbOdd);
});

describe("Arbitrary<T> combinators", () => {
  // declare function array<T>(arb: Arbitrary<T>): Arbitrary<T[]>;
  const arbSymbol: Arbitrary<string> = 
    fc.constantFrom("7️⃣", "🍒", "💰", "🍀", "💎")

  const arbPokieResult: Arbitrary<string[]> = 
    fc.array(arbSymbol, 3, 3)

  prettySample('array', arbPokieResult);

  const arbNatOrUndefined: Arbitrary<number | undefined> = 
    fc.option(fc.nat(10), { nil: undefined })

  prettySample('option', arbNatOrUndefined);
});

describe("Transforming Arbitrary<T>s", () => {
  const arbNegatives: Arbitrary<number> = 
    fc.nat(10).map((t: number) => -t)

  prettySample('map', arbNegatives);

  const arbEven: Arbitrary<number> = 
    fc.nat(10).filter(x => x % 2 === 0)

  prettySample('filter', arbEven);
})

describe.only("Custom Arbitrary<T>s", () => {

  const arbTitle: Arbitrary<string> = fc.constantFrom("Mr.", "Ms.", "Dr.")

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const arbName: Arbitrary<string> =
    fc.tuple(arbTitle, fc.lorem(1).map(capitalize), fc.lorem(1).map(capitalize))
      .map(([title, first, last]) => `${title} ${first} ${last}`)

  prettySample('tupleMap', arbName);

  /////////////////////////////////////////////////////////////////////////////

  const arbInterval: Arbitrary<[number, number]> = 
    fc.tuple(fc.nat(100), fc.nat(100)).filter(([a, b]) => a < b);

  prettySample('tupleFilter', arbInterval);

  /////////////////////////////////////////////////////////////////////////////

  interface User {
    admin: boolean,
    name: string
    email: string
    phone?: string
  }


  const arbNumerals: Arbitrary<string> = fc.nat(9).map(t => t.toString())
  const PHONE_NUMBER_LENGTH = 10
  const arbPhoneNumber: Arbitrary<string> = fc.stringOf(arbNumerals, PHONE_NUMBER_LENGTH, PHONE_NUMBER_LENGTH)

  const arbUserPrime: Arbitrary<User> = fc.record({
    admin: fc.boolean(),
    name: arbName,
    email: fc.emailAddress(),
    phone: fc.option<string, undefined>(arbPhoneNumber, { nil: undefined })
  })

  prettySample('record', arbUserPrime, 2);
});


describe("Sledgehammers (for when you really need things to break)", () => {
  prettySample('anything', fc.anything(), 3);

  prettySample('object', fc.object(), 3);

  prettySample('unicodeJsonObject', fc.unicodeJsonObject(), 3);
})