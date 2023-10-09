type Person = { name: string; age: number; alive?: boolean };

type _2 = Person['name' | 'age'];
//   ^?

type _1 = Person['name'];
//   ^?