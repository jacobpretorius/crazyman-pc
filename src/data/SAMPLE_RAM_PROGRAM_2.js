// This program: Add num 8 and jump in a loop

// This is the code that our CPU will run from memory for demos

// FYI: These values are display flipped
const SAMPLE_RAM_PROGRAM_2 = [
  // 0- NOOP INIT
  [false, false, false, false, false, false, false, false],

  // 1- LDB 15
  [true, false, false, true, true, true, true, true],

  // 2- ADD
  [false, false, true, false, false, false, false, false],

  // 3- OUT
  [true, true, true, false, false, false, false, false],

  // 4- JMP loc2
  [false, true, true, false, false, false, true, false],

  // 5-14 NOOP
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],

  // 15- Binary value 8
  [false, false, false, false, true, false, false, false],
];

export default SAMPLE_RAM_PROGRAM_2;