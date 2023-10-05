type PathValue<
  Type extends object,
  NestedPropery extends Path<Type>
> = NestedPropery extends `${infer Key extends FilteredKeys<Type>}.${infer RemainingKey}`
  ? Type[Key] extends object
    ? PathValue<Type[Key], RemainingKey & Path<Type[Key]>>
    : never
  : NestedPropery extends FilteredKeys<Type>
  ? Type[NestedPropery]
  : NestedPropery extends `${infer NumberKey extends number &
      FilteredKeys<Type>}`
  ? Type[NumberKey]
  : never;

const obj = {
  tuple: ["index0", { index1: "index1" }, { index2: "index2" }],
  nested: { child: "child", deepNested: { deepNestedChild: true } },
  0: "array-like-item",
} as const;

const getNestedProperty = <
  Type extends object,
  NestedPropery extends Path<Type>
>(
  obj: Type,
  nestedProperty: NestedPropery
): PathValue<Type, NestedPropery> => {
  return undefined as any;
};

const _ = getNestedProperty(obj, "0");
//    ^?

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
