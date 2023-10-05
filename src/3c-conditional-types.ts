import { expectTypeOf } from "expect-type";

type IsString<Type> = Type extends string ? true : false;

expectTypeOf<IsString<string>>().toEqualTypeOf<true>();
expectTypeOf<IsString<"a string literal">>().toEqualTypeOf<true>();
expectTypeOf<IsString<string | number>>().toEqualTypeOf<false>();

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 buggy implementation of IsString
(() => {
  type IsString<Type> = Type extends string ? true : false;

  expectTypeOf<IsString<string>>().toEqualTypeOf<true>();
  expectTypeOf<IsString<"a string literal">>().toEqualTypeOf<true>();
  // @ts-expect-error
  expectTypeOf<IsString<string | number>>().toEqualTypeOf<false>();
})(); // 🠼
// 🠺 wrapping types in [..]
(() => {
  type IsString<Type> = [Type] extends [string] ? true : false;

  expectTypeOf<IsString<string>>().toEqualTypeOf<true>();
  expectTypeOf<IsString<"a string literal">>().toEqualTypeOf<true>();
  expectTypeOf<IsString<string | number>>().toEqualTypeOf<false>();
})(); // 🠼
