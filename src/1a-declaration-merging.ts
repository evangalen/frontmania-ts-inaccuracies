interface Box {
  width: number;
  height: number;
}

// interface Box {
//   scale: number;
// }

const box: Box = {
  width: 5,
  height: 6,
};

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 Box type with `width` and `height` (and commented out second `Box` type)
(() => {
  interface Box {
    width: number;
    height: number;
  }

  // interface Box {
  //   scale: number;
  // }

  const box: Box = { width: 5, height: 6 };
})(); // 🠼
// 🠺 Declaration merging of another `Box` interface with `scale` property
(() => {
  interface Box {
    width: number;
    height: number;
  }

  interface Box {
    scale: number;
  }

  const box: Box = { width: 5, height: 6, scale: 2 };
})(); // 🠼
