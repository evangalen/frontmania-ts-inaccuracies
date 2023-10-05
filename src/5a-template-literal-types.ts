import { expectTypeOf } from "expect-type";

type Names = "John" | "Emma" | "Jane";
type Greeting = "Hello John!" | "Hello Emma!" | "Hello Jane!";
//   ^?

expectTypeOf<Greeting>().toEqualTypeOf<
  "Hello John!" | "Hello Emma!" | "Hello Jane!"
>();

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 explicit string literal types
(() => {
  type Greeting = "Hello John!" | "Hello Emma!" | "Hello Jane!";
  //   ^?

  expectTypeOf<Greeting>().toEqualTypeOf<
    "Hello John!" | "Hello Emma!" | "Hello Jane!"
  >();
})(); // 🠼
// 🠺 template literal type using Names union type
(() => {
  type Greeting = `Hello ${Names}!`;
  //   ^?

  expectTypeOf<Greeting>().toEqualTypeOf<
    "Hello John!" | "Hello Emma!" | "Hello Jane!"
  >();
})(); // 🠼
