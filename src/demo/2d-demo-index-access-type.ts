type Person = { name: string; age: number; alive?: boolean };

type _3 = Person['name' | 'age' | 'alive'];
//   ^?

type _2 = Person['name' | 'age'];
//   ^?

type _1 = Person['name'];
//   ^?