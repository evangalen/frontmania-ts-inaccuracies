const result = JSON.parse('{}');
//    ^?

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 JSON.parse
(() => {
  const result = JSON.parse('{}');
  //    ^?
})(); // 🠼
// 🠺 Declaration merging of global `JSON` interface overloading `parse`
(() => {
  // @ts-expect-error TS1234: An ambient module declaration is only allowed at the top level in a file.
  declare global {
    interface JSON {
      parse(text: string, reviver?: (this: any, key: string, value: any) => any): unknown;
    }
  }

  const result = JSON.parse('{}');
  //    ^?
})(); // 🠼
