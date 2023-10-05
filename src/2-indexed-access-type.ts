type Person = { name: string; age: number; alive?: boolean };

type _ = never;
//   ^?

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 never type
(() => {
  type _ = never;
  //   ^?
})(); // 🠼
// 🠺 single key
(() => {
  type _ = Person["name"];
  //   ^?
})(); // 🠼
// 🠺 union with two keys
(() => {
  type _ = Person["name" | "age"];
  //   ^?
})(); // 🠼
// 🠺 union with all keys
(() => {
  type _ = Person["name" | "age" | "alive"];
  //   ^?
})(); // 🠼
// 🠺 union with all keys with typo (TS error)
(() => {
  // @ts-expect-error TS2339: Property 'alve' does not exist on type 'Person'.
  type _ = Person["name" | "age" | "alve"];
  //   ^?
})(); // 🠼
// 🠺 keyof
(() => {
  type _ = Person[keyof Person];
  //   ^?
})(); // 🠼