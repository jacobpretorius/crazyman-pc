// This program: Sum num 30 and num 12.

// This is the code that our CPU will run from memory

// FYI: These values are display flipped
const SAMPLE_RAM_PROGRAM = [
  // 0- NOOP INIT
  [false, false, false, false, false, false, false, false],

  // 1- LDA 14
  [false, false, false, true, true, true, true, false],

  // 2- LDB 15
  [true, false, false, true, true, true, true, true],

  // 3- ADD
  [false, false, true, false, false, false, false, false],

  // 4- OUT
  [true, true, true, false, false, false, false, false],

  // 5- HLT
  [true, true, true, true, false, false, false, false],

  // 6-13- NOOPS
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],

  // 14- Binary value 30
  [false, false, false, true, true, true, true, false],

  // 15- Binary value 12
  [false, false, false, false, true, true, false, false],
];

export default SAMPLE_RAM_PROGRAM;