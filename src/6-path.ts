const obj = {
  nested: { child: 'child', deepNested: { deepNestedChild: true } },
  0: 'array-like-item',
} as const;

declare const sortNestedProperty: (
  obj: object,
  nestedProperty: string,
) => void;

sortNestedProperty(obj, '');

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 no type-safety nor code-completion on `objPath`
(() => {
  const obj = {
    nested: { child: 'child', deepNested: { deepNestedChild: true } },
    0: 'array-like-item',
  } as const;

  // @ts-expect-error TS1184: Modifiers cannot appear here.
  declare const sortNestedProperty: (
    obj: object,
    nestedProperty: string,
  ) => void;

  sortNestedProperty(obj, '');
})(); // 🠼
// 🠺 type parameters on function + Path IIMT producing root keys
(() => {
  const obj = {
    nested: { child: 'child', deepNested: { deepNestedChild: true } },
    0: 'array-like-item',
  } as const;

  // @ts-expect-error TS1184: Modifiers cannot appear here.
  declare const sortNestedProperty: (
    obj: object,
    nestedProperty: Path<typeof obj>,
  ) => void;

  // @ts-expect-error
  sortNestedProperty(obj, '');

  type Path<Type extends object> = {
    [Key in Exclude<keyof Type, symbol>]: `${Key}`;
  }[Exclude<keyof Type, symbol>];
})(); // 🠼
// 🠺 Path also producing dot followed by recursive Path<Type[Key]>
(() => {
  const obj = {
    nested: { child: 'child', deepNested: { deepNestedChild: true } },
    0: 'array-like-item',
  } as const;

  // @ts-expect-error TS1184: Modifiers cannot appear here.
  declare const sortNestedProperty: (
    obj: object,
    nestedProperty: Path<typeof obj>,
  ) => void;

  // @ts-expect-error
  sortNestedProperty(obj, '');

  type Path<Type extends object> = {
    [Key in Exclude<keyof Type, symbol>]:
      | `${Key}`
      | (Type[Key] extends object ? `${Key}.${Path<Type[Key]>}` : never);
  }[Exclude<keyof Type, symbol>];
})(); // 🠼
// 🠺 Basic tuple support: `tuple: ["idx0", { idx1: "idx1" }, { idx2: "idx2" }]`
(() => {
  const obj = {
    tuple: ['idx0', { idx1: 'idx1' }, { idx2: 'idx2' }],
    nested: { child: 'child', deepNested: { deepNestedChild: true } },
    0: 'array-like-item',
  } as const;

  // @ts-expect-error TS1184: Modifiers cannot appear here.
  declare const sortNestedProperty: (
    obj: object,
    nestedProperty: Path<typeof obj>,
  ) => void;

  // @ts-expect-error
  sortNestedProperty(obj, '');

  type Path<Type extends object> = {
    [Key in FilteredKeys<Type>]:
      | `${Key}`
      | (Type[Key] extends object ? `${Key}.${Path<Type[Key]>}` : never);
  }[FilteredKeys<Type>];

  type FilteredKeys<Type extends object> = Exclude<
    keyof Type,
    | symbol
    | (Type extends readonly any[] ? keyof Array<unknown> : never)
  >;
})(); // 🠼
