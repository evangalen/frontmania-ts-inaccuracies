import { expectTypeOf } from 'expect-type';

type Flatten<Type> = Type;

expectTypeOf<Flatten<string[]>>().toEqualTypeOf<string>();
expectTypeOf<Flatten<string>>().toEqualTypeOf<string>();

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 incomplete implementation
(() => {
  type Flatten<Type> = Type;

  // @ts-expect-error
  expectTypeOf<Flatten<string[]>>().toEqualTypeOf<string>();
  expectTypeOf<Flatten<string>>().toEqualTypeOf<string>();
})(); // 🠼
// 🠺 using brackets and []
(() => {
  type Flatten<Type> = Type extends (infer Item)[] ? Item : Type;

  expectTypeOf<Flatten<string[]>>().toEqualTypeOf<string>();
  expectTypeOf<Flatten<string>>().toEqualTypeOf<string>();
})(); // 🠼
// 🠺 using Array<..>
(() => {
  type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

  expectTypeOf<Flatten<string[]>>().toEqualTypeOf<string>();
  expectTypeOf<Flatten<string>>().toEqualTypeOf<string>();
})(); // 🠼
