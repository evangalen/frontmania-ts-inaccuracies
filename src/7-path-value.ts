import { ReadonlyDeep } from 'type-fest';
import { expectTypeOf } from 'expect-type';

const obj = {
  tuple: ['idx0', { idx1: 'idx1' }, { idx2: 'idx2' }],
  nested: { child: 'child', deepNested: { deepNestedChild: true } },
  0: 'array-like-item',
} as const;

declare const getNestedProperty: <
Type extends object,
NestedProperty extends Path<Type>,
>(
obj: Type,
nestedProperty: NestedProperty,
) => unknown;

const _ = getNestedProperty(obj, '');
//    ^?

// 🠺 type-level unit testing using "expect-type" lib
expectTypeOf(getNestedProperty(obj, 'tuple')).toEqualTypeOf<(typeof obj)['tuple']>();
expectTypeOf(getNestedProperty(obj, 'tuple.0')).toEqualTypeOf<'idx0'>();
expectTypeOf(getNestedProperty(obj, 'tuple.1')).toEqualTypeOf<
  Readonly<{ idx1: 'idx1' }>
>();
expectTypeOf(getNestedProperty(obj, 'tuple.1.idx1')).toEqualTypeOf<'idx1'>();
expectTypeOf(getNestedProperty(obj, 'tuple.2')).toEqualTypeOf<
  Readonly<{ idx2: 'idx2' }>
>();
expectTypeOf(getNestedProperty(obj, 'tuple.2.idx2')).toEqualTypeOf<'idx2'>();

expectTypeOf(getNestedProperty(obj, 'nested')).toEqualTypeOf<
  ReadonlyDeep<{ child: 'child'; deepNested: { deepNestedChild: true } }>
>();
expectTypeOf(getNestedProperty(obj, 'nested.child')).toEqualTypeOf<'child'>();
expectTypeOf(getNestedProperty(obj, 'nested.deepNested')).toEqualTypeOf<
  Readonly<{ deepNestedChild: true }>
>();
expectTypeOf(
  getNestedProperty(obj, 'nested.deepNested.deepNestedChild'),
).toEqualTypeOf<true>(); // 🠼

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 Path of solution from `6-path.ts` file
type Path<Type extends object> = {
  [Key in FilteredKeys<Type>]:
    | `${Key}`
    | (Type[Key] extends object ? `${Key}.${Path<Type[Key]>}` : never);
}[FilteredKeys<Type>];

type FilteredKeys<Type extends object> = Exclude<
  keyof Type,
  symbol | (Type extends readonly any[] ? keyof Array<unknown> : never) | keyof Object
>; // 🠼
// 🠺 getNestedProperty with fixed return type of `unknown`
(() => {
  const obj = {
    tuple: ['idx0', { idx1: 'idx1' }, { idx2: 'idx2' }],
    nested: { child: 'child', deepNested: { deepNestedChild: true } },
    0: 'array-like-item',
  } as const;

  // @ts-expect-error TS1184: Modifiers cannot appear here.
  declare const getNestedProperty: <
    Type extends object,
    NestedProperty extends Path<Type>,
  >(
    obj: Type,
    nestedProperty: NestedProperty,
  ) => unknown;

  // @ts-expect-error
  const _ = getNestedProperty(obj, '');
  //    ^?
})(); // 🠼
// 🠺 PathValue conditional type with only `string` root keys
(() => {
  const obj = {
    tuple: ['idx0', { idx1: 'idx1' }, { idx2: 'idx2' }],
    nested: { child: 'child', deepNested: { deepNestedChild: true } },
    0: 'array-like-item',
  } as const;

  // @ts-expect-error TS1184: Modifiers cannot appear here.
  declare const getNestedProperty: <
    Type extends object,
    NestedProperty extends Path<Type>,
  >(
    obj: Type,
    nestedProperty: NestedProperty,
  ) => PathValue<Type, NestedProperty>;

  // @ts-expect-error
  const _ = getNestedProperty(obj, '');
  //    ^?

  type PathValue<
    Type extends object,
    NestedProperty extends Path<Type>,
  > = NestedProperty extends `${string}.${string}`
    ? unknown
    : Type[NestedProperty & keyof Type];
})(); // 🠼
// 🠺 PathValue conditional type with de-stringified root keys
(() => {
  const obj = {
    tuple: ['idx0', { idx1: 'idx1' }, { idx2: 'idx2' }],
    nested: { child: 'child', deepNested: { deepNestedChild: true } },
    0: 'array-like-item',
  } as const;

  // @ts-expect-error TS1184: Modifiers cannot appear here.
  declare const getNestedProperty: <
    Type extends object,
    NestedProperty extends Path<Type>,
  >(
    obj: Type,
    nestedProperty: NestedProperty,
  ) => PathValue<Type, NestedProperty>;

  // @ts-expect-error
  const _ = getNestedProperty(obj, '');
  //    ^?

  type PathValue<
    Type extends object,
    NestedProperty extends Path<Type>,
  > = NestedProperty extends `${string}.${string}`
    ? unknown
    : Type[DestringifyKey<NestedProperty> & keyof Type];

  type DestringifyKey<Type extends string> =
    Type extends `${infer NumberKey extends number}` ? NumberKey : Type;
})(); // 🠼
// 🠺 PathValue conditional type supporting nested keys
(() => {
  const obj = {
    tuple: ['idx0', { idx1: 'idx1' }, { idx2: 'idx2' }],
    nested: { child: 'child', deepNested: { deepNestedChild: true } },
    0: 'array-like-item',
  } as const;

  // @ts-expect-error TS1184: Modifiers cannot appear here.
  declare const getNestedProperty: <
    Type extends object,
    NestedProperty extends Path<Type>,
  >(
    obj: Type,
    nestedProperty: NestedProperty,
  ) => PathValue<Type, NestedProperty>;

  // @ts-expect-error
  const _ = getNestedProperty(obj, '');
  //    ^?

  type PathValue<
    Type extends object,
    NestedProperty extends Path<Type>,
  > = NestedProperty extends `${DestringifyKey<infer Key>}.${infer RemainingKey}`
    ? Type[Key & keyof Type] extends object
      ? PathValue<Type[Key & keyof Type], RemainingKey & Path<Type[Key & keyof Type]>>
      : never
    : Type[DestringifyKey<NestedProperty> & keyof Type];

  type DestringifyKey<Type extends string> =
    Type extends `${infer NumberKey extends number}` ? NumberKey : Type;
})(); // 🠼
