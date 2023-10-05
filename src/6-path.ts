const obj = {
  nested: { child: "child", deepNested: { deepNestedChild: true } },
  0: "array-like-item",
} as const;

const objPath = "";

const sortNestedProperty = (obj: object, nestedProperty: string) => {
  /* .. */
};

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 no type-safety nor code-completion on `objPath`
(() => {
  const obj = {
    nested: { child: "child", deepNested: { deepNestedChild: true } },
    0: "array-like-item",
  } as const;

  const objPath = "";

  const sortNestedProperty = (obj: object, nestedProperty: string) => {
    /* .. */
  };
})(); // 🠼
// 🠺 Path IIMT producing root keys
(() => {
  type Path<Type extends object> = {
    [Key in Exclude<keyof Type, symbol>]: `${Key}`;
  }[Exclude<keyof Type, symbol>];

  const obj = {
    nested: { child: "child", deepNested: { deepNestedChild: true } },
    0: "array-like-item",
  } as const;

  const objPath: Path<typeof obj> = "";

  const sortNestedProperty = (obj: object, nestedProperty: string) => {
    /* .. */
  };
})(); // 🠼
// 🠺 Path also producing dot followed by recursive Path<Type[Key]>
(() => {
  type Path<Type extends object> = {
    [Key in Exclude<keyof Type, symbol>]:
      | `${Key}`
      | (Type[Key] extends object ? `${Key}.${Path<Type[Key]>}` : never);
  }[Exclude<keyof Type, symbol>];

  const obj = {
    nested: { child: "child", deepNested: { deepNestedChild: true } },
    0: "array-like-item",
  } as const;

  // @ts-expect-error
  const objPath: Path<typeof obj> = "";

  const sortNestedProperty = (obj: object, nestedProperty: string) => {
    /* .. */
  };
})(); // 🠼
// 🠺 Basic tuple support for `tuple: ["index0", { index1: "index1" }, { index2: "index2" }]`
(() => {
  type Path<Type extends object> = {
    [Key in FilteredKeys<Type>]:
      | `${Key}`
      | (Type[Key] extends object ? `${Key}.${Path<Type[Key]>}` : never);
  }[FilteredKeys<Type>];

  type FilteredKeys<Type extends object> = Exclude<
    keyof Type,
    | symbol
    | (Type extends readonly any[] ? keyof Array<unknown> : never)
    | keyof Object
  >;

  const obj = {
    //    ^?
    tuple: ["index0", { index1: "index1" }, { index2: "index2" }],
    nested: { child: "child", deepNested: { deepNestedChild: true } },
    0: "array-like-item",
  } as const;

  // @ts-expect-error
  const objPath: Path<typeof obj> = "";

  const sortNestedProperty = (obj: object, nestedProperty: string) => {
    /* .. */
  };
})(); // 🠼
// 🠺 Generic `sortNestedProperty` function
(() => {
  type Path<Type extends object> = {
    [Key in FilteredKeys<Type>]:
      | `${Key}`
      | (Type[Key] extends object ? `${Key}.${Path<Type[Key]>}` : never);
  }[FilteredKeys<Type>];

  type FilteredKeys<Type extends object> = Exclude<
    keyof Type,
    | symbol
    | (Type extends readonly any[] ? keyof Array<unknown> : never)
    | keyof Object
  >;

  const obj = {
    tuple: ["index0", { index1: "index1" }, { index2: "index2" }],
    nested: { child: "child", deepNested: { deepNestedChild: true } },
    0: "array-like-item",
  } as const;

  // @ts-expect-error
  const objPath: Path<typeof obj> = "";

  const sortNestedProperty = <
    Type extends object,
    NestedPropery extends Path<Type>
  >(
    obj: Type,
    nestedProperty: NestedPropery
  ) => {
    /* .. */
  };

  // @ts-expect-error
  sortNestedProperty(obj, "");
})(); // 🠼
