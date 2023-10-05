type _ = never;
//   ^?

interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 never type
(() => {
  type _ = never;
  //   ^?
})(); // 🠼
// 🠺 conditional type
(() => {
  type _ = Dog extends Animal ? true : false;
  //   ^?
})(); // 🠼
