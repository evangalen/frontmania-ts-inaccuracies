import { expectTypeOf } from "expect-type";

type FirstParameter<Type> = Type;

expectTypeOf<
  FirstParameter<(a: string, b: number) => void>
>().toEqualTypeOf<string>();
expectTypeOf<FirstParameter<(a: string) => boolean>>().toEqualTypeOf<string>();
expectTypeOf<FirstParameter<() => number>>().toBeNever();

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 incomplete implementation
(() => {
  type FirstParameter<Type> = Type;

  expectTypeOf<
    FirstParameter<(a: string, b: number) => void>
    // @ts-expect-error
  >().toEqualTypeOf<string>();
  // @ts-expect-error
  expectTypeOf<
    FirstParameter<(a: string) => boolean>
  >().toEqualTypeOf<string>();
  // @ts-expect-error
  expectTypeOf<FirstParameter<() => number>>().toBeNever();
})(); // 🠼
// 🠺 working, except for no-arg function
(() => {
  type FirstParameter<Type> = Type extends (
    firstArg: infer FirstArg,
    ...rest: any[]
  ) => any
    ? FirstArg
    : never;

  expectTypeOf<
    FirstParameter<(a: string, b: number) => void>
  >().toEqualTypeOf<string>();
  expectTypeOf<
    FirstParameter<(a: string) => boolean>
  >().toEqualTypeOf<string>();
  // @ts-expect-error
  expectTypeOf<FirstParameter<() => number>>().toBeNever();
})(); // 🠼
// 🠺 working for all functions
(() => {
  type FirstParameter<Type> = Type extends (
    firstArg: infer FirstArg,
    ...rest: any[]
  ) => any
    ? Type extends () => any
      ? never
      : FirstArg
    : never;

  expectTypeOf<
    FirstParameter<(a: string, b: number) => void>
  >().toEqualTypeOf<string>();
  expectTypeOf<
    FirstParameter<(a: string) => boolean>
  >().toEqualTypeOf<string>();
  expectTypeOf<FirstParameter<() => number>>().toBeNever();
})(); // 🠼
