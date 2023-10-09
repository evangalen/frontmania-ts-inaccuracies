import type { MatcherFunction } from 'expect';

// typically declared in `setupTests.ts` file
const toAllSatisfy: MatcherFunction<[predicate: (item: unknown) => boolean]> = function (
  this,
  actual: any,
  predicate,
) {
  return {
    pass: actual.every(predicate),
    message: () => 'Some items do not match the predicate',
  };
};

expect.extend({ toAllSatisfy });

// somewhere inside a `.spec.ts` file
expect([true, 1, 9]).toAllSatisfy((item: any) => !!item);
//                   ^?

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 TS error on `.toAllSatisfy` call on result of `expect(`..`)` call
(() => {
  // typically declared in `setupTests.ts` file
  const toAllSatisfy: MatcherFunction<[predicate: (item: unknown) => boolean]> =
    function (this, actual: any, predicate) {
      return {
        pass: actual.every(predicate),
        message: () => 'Some items do not match the predicate',
      };
    };

  expect.extend({ toAllSatisfy });

  // somewhere inside a `.spec.ts` file
  // @ts-expect-error
  expect([true, 1, 9]).toAllSatisfy((item: any) => !!item);
  //                   ^?
})(); // 🠼
// 🠺 Declaration merging Jest `Matchers` interface
(() => {
  // typically declared in `setupTests.ts` file
  const toAllSatisfy: MatcherFunction<[predicate: (item: unknown) => boolean]> =
    function (this, actual: any, predicate) {
      return {
        pass: actual.every(predicate),
        message: () => 'Some items do not match the predicate',
      };
    };

  expect.extend({ toAllSatisfy });

  // @ts-expect-error TS1234: An ambient module declaration is only allowed at the top level in a file.
  declare global {
    namespace jest {
      interface Matchers<R> {
        toAllSatisfy<T>(predicate: (item: T) => boolean): R;
      }
    }
  }

  // somewhere inside a `.spec.ts` file
  expect([true, 1, 9]).toAllSatisfy(item => !!item);
  //                   ^?
})(); // 🠼
