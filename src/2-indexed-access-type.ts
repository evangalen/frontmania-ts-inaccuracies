type Person = { name: string; age: number; alive?: boolean };

type _ = never;
//   ^?

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 never type
(() => {
  type _ = never;
  //   ^?
})(); // 🠼
// 🠺 with empty key (TS error)
(() => {
  type _ = Person[''];
  //   ^?
})(); // 🠼
// 🠺 single key
(() => {
  type _ = Person['name'];
  //   ^?
})(); // 🠼
// 🠺 union with two keys
(() => {
  type _ = Person['name' | 'age'];
  //   ^?
})(); // 🠼
// 🠺 union with all keys including optional key
(() => {
  type _ = Person['name' | 'age' | 'alive'];
  //   ^?
})(); // 🠼
// 🠺 keyof
(() => {
  type _ = Person[keyof Person];
  //   ^?
})(); // 🠼
