const mapIsoDate = (isoDate: string | null) => {
  if (!(typeof isoDate === "string")) {
    return null;
  }

  return new Date(isoDate);
};

const dateTypeExpected = mapIsoDate("2023-09-01");
//    ^?
const nullTypeExpected = mapIsoDate(null);
//    ^?

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 mapIsoDate with inferred return type
(() => {
  const mapIsoDate = (isoDate: string | null) => {
    if (!(typeof isoDate === "string")) {
      return null;
    }

    return new Date(isoDate);
  };

  const dateTypeExpected = mapIsoDate("2023-09-01");
  //    ^?
  const nullTypeExpected = mapIsoDate(null);
  //    ^?
})(); // 🠼
// 🠺 inline conditional type using typeof isoDate (TS error)
(() => {
  const mapIsoDate = (
    isoDate: string | null
  ): typeof isoDate extends string ? Date : null => {
    if (!(typeof isoDate === "string")) {
      return null;
    }

    // @ts-expect-error TS2322: Type 'Date' is not assignable to type 'null'.
    return new Date(isoDate);
  };

  const dateTypeExpected = mapIsoDate("2023-09-01");
  //    ^?
  const nullTypeExpected = mapIsoDate(null);
  //    ^?
})(); // 🠼
// 🠺 type parameter and inline conditional type
(() => {
  const mapIsoDate = <Type extends string | null>(
    isoDate: Type
  ): Type extends string ? Date : null => {
    if (!(typeof isoDate === "string")) {
      return null as any;
    }

    return new Date(isoDate) as any;
  };

  const dateTypeExpected = mapIsoDate("2023-09-01");
  //    ^?
  const nullTypeExpected = mapIsoDate(null);
  //    ^?
})(); // 🠼
// 🠺 utility type and less ugly type assertions
(() => {
  type MapIsoDate<Type extends string | null> = Type extends string
    ? Date
    : null;

  const mapIsoDate = <Type extends string | null>(
    isoDate: Type
  ): Type extends string ? Date : null => {
    if (!(typeof isoDate === "string")) {
      return null as MapIsoDate<Type>;
    }

    return new Date(isoDate) as MapIsoDate<Type>;
  };

  const dateTypeExpected = mapIsoDate("2023-09-01");
  //    ^?
  const nullTypeExpected = mapIsoDate(null);
  //    ^?
})(); // 🠼
