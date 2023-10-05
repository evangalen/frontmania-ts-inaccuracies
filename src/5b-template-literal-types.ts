type BaseColor = 'red' | 'green' | 'blue';
type Brightness = 'light' | 'dark';

type Color = `${Brightness}-${BaseColor}`;

const color: Color = '';

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 BaseColor combined with Brightness
(() => {
  type BaseColor = 'red' | 'green' | 'blue';
  type Brightness = 'light' | 'dark';

  type Color = `${Brightness}-${BaseColor}`;

  const color: Color = '';
})(); // 🠼
// 🠺 BaseColor with Tint number (1, 2 or 3) appended
(() => {
  type BaseColor = 'red' | 'green' | 'blue';
  type Tint = 1 | 2 | 3;

  type Color = `${BaseColor}-${Tint}`;
  //   ^?

  const color: Color = '';
})(); // 🠼
