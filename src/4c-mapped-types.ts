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
// 🠺 unionize each Person property (using IIMT)
(() => {
  type Person = { readonly id: number; name: string; alive?: boolean };

  type _ = { [Key in keyof Person]: Person[Key] }[keyof Person];
  //   ^?
})(); // 🠼
// 🠺 Indexed Access Type with keyof Person
(() => {
  type Person = { readonly id: number; name: string; alive?: boolean };

  type _ = Person[keyof Person];
  //   ^?
})(); // 🠼
// 🠺 CSSLength IIMT producing { length: number; unit: .. } based on CSSUnits
(() => {
  type CSSUnits = "px" | "em" | "rem" | "vw" | "vh";

  type CSSLength = {
    //   ^?
    [Item in CSSUnits]: {
      length: number;
      unit: Item;
    };
  }[CSSUnits];
})(); // 🠼
