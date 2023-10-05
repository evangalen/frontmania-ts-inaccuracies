type PanelKey = 'header' | 'body';

type Panels = { [key: string]: boolean };
//              ^^^^^^^^^^^^^ index signature

const visiblePanels: Panels = {
  header: true,
  footer: false,
};

// ✂╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴
// 🠺 using index signature in Panels type
(() => {
  type PanelKey = 'header' | 'body';

  type Panels = { [key: string]: boolean };
  //              ^^^^^^^^^^^^^ index signature

  const visiblePanels: Panels = {
    header: true,
    footer: false,
  };
})(); // 🠼
// 🠺 mapped type and fixed TS error in visiblePanels object
(() => {
  type PanelKey = 'header' | 'body';

  type Panels = { [key in PanelKey]: boolean };

  const visiblePanels: Panels = {
    header: true,
    body: false,
  };
})(); // 🠼
