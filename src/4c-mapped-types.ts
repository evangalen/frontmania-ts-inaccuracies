type Person = { readonly id: number; name: string; alive?: boolean };

type _ = { [Key in keyof Person]: Person[Key] };
//   ^?

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 carbon copy mapped type of Person
(() => {
  type Person = { readonly id: number; name: string; alive?: boolean };

  type _ = { [Key in keyof Person]: Person[Key] };
  //   ^?
})(); // 🠼
// 🠺 all readonly and optional
(() => {
  type Person = { readonly id: number; name: string; alive?: boolean };

  type _ = { readonly [Key in keyof Person]?: Person[Key] };
  //   ^?
})(); // 🠼
// 🠺 all writeable and required
(() => {
  type Person = { readonly id: number; name: string; alive?: boolean };

  type _ = { -readonly [Key in keyof Person]-?: Person[Key] };
  //   ^?
})(); // 🠼
